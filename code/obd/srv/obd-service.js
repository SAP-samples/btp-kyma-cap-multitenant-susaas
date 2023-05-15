const cds = require('@sap/cds');
const crypto = require('crypto');

const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sBatchV1Api = kc.makeApiClient(k8s.BatchV1Api);
const k8sCustObjApi = kc.makeApiClient(k8s.CustomObjectsApi);

const kymaNamespace = process.env["KYMA_NAMESPACE"];
const clusterShootname = process.env["CLUSTER_SHOOTNAME"];

// Release name of SaaS app to be onboarded
const saasHelmRelease = process.env["SAAS_HELM_RELEASE"];

module.exports = cds.service.impl(async function () {

    this.on("tenant", async (req)=> {
        try {
            if (!req.user) { return req.error(404, 'Error: Missing User Details') };
            if (!req.user.attr?.scim_id) { return req.error(404, 'Error: Missing User Details') };

            const scimId = req.user.attr.scim_id;
            const tenantId = crypto.createHash('shake256', { outputLength: 10 }).update(`${saasHelmRelease}-${kymaNamespace}-${clusterShootname}-${scimId}`).digest('hex');
            const result = await k8sCustObjApi.listNamespacedCustomObject('gateway.kyma-project.io','v1beta1',kymaNamespace,'apirules','',false,'','','app.sap.com/subdomain=' + encodeURI(tenantId));

            if (!result.body.items || result.body.items?.length == 0){ return req.reply() }

            console.log(`Tenants: ${JSON.stringify(result.body)}`);
            return req.reply({ tenantSubdomain : result.body.items[0]?.spec?.host });

        } catch(error) {
            console.error(`Error: Error reading tenants: ${JSON.stringify(error)}`);
            return req.error(500, `Error reading tenants: ${error.message}`);
        };
    });


    this.on("status", async (req)=> {
        try{
            if (!req.user) { return req.error(404, 'Error: Missing User Details') };
            if (!req.user.attr?.scim_id) { return req.error(404, 'Error: Missing User Details')};

            const scimId = req.user.attr?.scim_id;
            const tenantId = crypto.createHash('shake256', { outputLength: 10 }).update(`${saasHelmRelease}-${kymaNamespace}-${clusterShootname}-${scimId}`).digest('hex');
            
            let onboardingStatus = null;
            let offboardingStatus = null;
            
            try{ onboardingStatus = await k8sBatchV1Api.readNamespacedJobStatus(tenantId + '-onboard', kymaNamespace) }catch(error){ console.log(`No onboarding process running`) }
            try{ offboardingStatus = await k8sBatchV1Api.readNamespacedJobStatus(tenantId + '-offboard', kymaNamespace) }catch(error){ console.log(`No offboarding process running`) }

            if( !onboardingStatus && !offboardingStatus ){
                console.log(`No onboarding or offboarding job running!`);
                return req.reply({ process: null });
            }else{
                const jobStatus = onboardingStatus ?? offboardingStatus;
                console.log(`Status: ${JSON.stringify(jobStatus)}`);
                return req.reply({ process: onboardingStatus ? 'onboarding' : 'offboarding' });
            }
        } catch (error) {
            console.error(`Error: Status of Job could not be retrieved: ${JSON.stringify(error)}`)
            return req.error(500, `Status of Job could not be retrieved: ${error.message}`);
        }
    });


    this.on("offboardTenant", async (req)=> {
        try{
            if (!req.user) { return req.error(404, 'Error: Missing User Details') };
            if (!req.user.attr?.scim_id) { return req.error(404, 'Error: Missing User Details') };

            const scimId = req.user.attr?.scim_id;
            const tenantId = crypto.createHash('shake256', { outputLength: 10 }).update(`${saasHelmRelease}-${kymaNamespace}-${clusterShootname}-${scimId}`).digest('hex');
            
            console.log("Info: Tenant Id - " + tenantId);
            console.log("Info: Tenant Subdomain - " + encodeURI(tenantId));

            // Check whether tenant already exists
            console.log("Info: Check if tenant for user exists")
            const tenantResult = await k8sCustObjApi.listNamespacedCustomObject('gateway.kyma-project.io','v1beta1',kymaNamespace,'apirules','',false,'','','app.sap.com/subdomain=' + encodeURI(tenantId));
            
            if (tenantResult.body.items && tenantResult.body.items?.length === 0){ 
                console.error(`Error: Error during tenant offboarding: Tenant for user does not exists!`)
                return req.error(404, `Error occurred during tenant offboarding: Tenant for user does not exist!`)
            }

            console.log("Info: Start tenant offboarding")

            const jobResult = await k8sBatchV1Api.createNamespacedJob(kymaNamespace, {
                apiVersion: 'batch/v1',
                kind: 'Job',
                metadata: { name: tenantId + '-offboard' },
                spec: {
                    ttlSecondsAfterFinished: 10,
                    template: {
                        metadata: { name: tenantId + '-offboard', annotations: { "sidecar.istio.io/inject": "false" } },
                        spec: {
                            restartPolicy: 'Never',
                            containers: [{
                                image: 'ghcr.io/sap-samples/btp-setup-automator:btpsa-v1.8.1',
                                name: 'btpsa',
                                env: [
                                    { name: 'MYEMAIL', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'email'} } },
                                    { name: 'MYPASSWORD', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'password' } } },
                                    { name: 'GLOBALACCOUNT', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'globalaccount' } } },
                                    { name: 'IASHOST', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'iashost' } } },
                                ],
                                command: [
                                    "/bin/sh", 
                                    "-ec",
                                    `echo '{ "$schema": "https://raw.githubusercontent.com/SAP-samples/btp-setup-automator/main/libs/btpsa-usecase.json" }' > 'ofbdusecase.json' \
                                    && echo '{ 
                                            "region": "us20", 
                                            "subaccountname": "`+ tenantId + `", 
                                            "subdomain": "`+ encodeURI(tenantId) + `", 
                                            "loginmethod": "basicAuthentication", 
                                            "skipcfspacecreation": true, 
                                            "prunesubaccount": true
                                        }' > 'ofbdparameters.json' \
                                    && ./btpsa \
                                        -usecasefile 'ofbdusecase.json' \
                                        -parameterfile 'ofbdparameters.json' \
                                        -globalaccount '$(GLOBALACCOUNT)' \
                                        -mypassword '$(MYPASSWORD)' \
                                        -myemail '$(MYEMAIL)' \
                                        -iashost '$(IASHOST)' \
                                        -defaultIdp 'sap.custom'`
                                ]
                            }]
                        }
                    }
                }
            });

            console.log(`Offboarding: ${JSON.stringify(jobResult.body)}`);
            return req.reply('Offboarding Started');

        } catch (error) {
            console.error(`Error: Error during tenant offboarding: ${JSON.stringify(error)}`)
            return req.error(404, `Error occured during tenant offboarding: ${error.message}`)
        }
    });


    this.on("onboardTenant", async (req)=> {
        try{
            if (!req.user) { return req.error(404, 'Error: Missing User Details') };
            if (!req.user.attr?.scim_id) { return req.error(404, 'Error: Missing User Details') };

            const scimId = req.user.attr?.scim_id;
            const tenantId = crypto.createHash('shake256', { outputLength: 10 }).update(`${saasHelmRelease}-${kymaNamespace}-${clusterShootname}-${scimId}`).digest('hex');

            console.log("Info: Tenant Id - " + tenantId);
            console.log("Info: Tenant Subdomain - " + encodeURI(tenantId));

            // Check whether tenant already exists
            console.log("Info: Check if tenant for user already exists")
            const tenantResult = await k8sCustObjApi.listNamespacedCustomObject('gateway.kyma-project.io','v1beta1',kymaNamespace,'apirules','',false,'','','app.sap.com/subdomain=' + encodeURI(tenantId));
            
            if (tenantResult.body.items && tenantResult.body.items?.length > 0){ 
                console.error(`Error: Error during tenant onboarding: Tenant for user already exists!`)
                return req.error(404, `Error occurred during tenant onboarding:  Tenant for user already exists!`)
            }

            console.log("Info: Start tenant onboarding")
            const jobResult = await k8sBatchV1Api.createNamespacedJob(kymaNamespace, {
                apiVersion: 'batch/v1',
                kind: 'Job',
                metadata: { name: tenantId + '-onboard' },
                spec: {
                    ttlSecondsAfterFinished: 10,
                    template: {
                        metadata: { name: tenantId + '-onboard', annotations: { "sidecar.istio.io/inject": "false" } },
                        spec: {
                            restartPolicy: 'Never',
                            containers: [{
                                image: 'ghcr.io/sap-samples/btp-setup-automator:btpsa-v1.8.1',
                                name: 'btpsa',
                                env: [
                                    { name: 'MYEMAIL', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'email'} } },
                                    { name: 'MYPASSWORD', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'password' } } },
                                    { name: 'GLOBALACCOUNT', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'globalaccount' } } },
                                    { name: 'PROVSUBACCOUNT', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'provsubaccount' } } },
                                    { name: 'IASHOST', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'iashost' } } },
                                    { name: 'ADMINS', valueFrom: { secretKeyRef: { name: 'btp-credentials', key: 'admins' } } }
                                ],
                                command: [
                                    "/bin/sh", 
                                    "-ec",
                                    `echo '{ 
                                            "services": [ { 
                                                "name": "` + saasHelmRelease + '-' + kymaNamespace + '-' + clusterShootname + `", 
                                                "category": "APPLICATION", 
                                                "plan": "premium", 
                                                "targetenvironment": "sapbtp", 
                                                "customerDeveloped": true, 
                                                "requiredrolecollections": [ { "name": "Susaas Administrator (` + saasHelmRelease + '-' + kymaNamespace + `)", "assignedUserGroupsFromParameterFile": [ "SusaaS_Admins" ], "idp": "sap.custom" } ] 
                                            }], 
                                            "assignrolecollections": [ 
                                                { "name": "Subaccount Administrator", "type": "account", "level": "sub account", "assignedUserGroupsFromParameterFile": [ "admins" ], "idp": "sap.default" }, 
                                                { "name": "Subaccount Service Administrator", "type": "account", "level": "sub account", "assignedUserGroupsFromParameterFile": [ "admins" ], "idp": "sap.default" } 
                                            ], 
                                            "executeAfterAccountSetup": [  
                                                {  "description": "Setup SAP IAS trust", "command": "btp create security/trust --idp $(IASHOST) --subaccount $(jq -r '.subaccountid' ./log/metadata_log.json) --name sap-ias "  }, 
                                                {  "description": "Disable Shadow User Creation",  "command": "btp update security/trust sap.custom --subaccount $(jq -r '.subaccountid' ./log/metadata_log.json) --auto-create-shadow-users false "  }, 
                                                {  "description": "Disable SAP IdP Login",  "command": "btp update security/trust sap.default --subaccount $(jq -r '.subaccountid' ./log/metadata_log.json) --available-for-user-logon false "  } 
                                            ]  
                                        }' > 'obdusecase.json' \
                                    && echo '{ 
                                            "region": "us20", 
                                            "subaccountname": "`+ tenantId + `", 
                                            "subdomain": "`+ encodeURI(tenantId) + `", 
                                            "defaultIdp": "sap.custom", 
                                            "subaccountlabels": { "scimId": ["`+ scimId + `"], "createdOn": ["`+ new Date().toJSON().slice(0, 10) + `"] }, 
                                            "loginmethod": "basicAuthentication", 
                                            "skipcfspacecreation": true, 
                                            "customAppProviderSubaccountId": "$(PROVSUBACCOUNT)", 
                                            "myusergroups": [ { "name": "SusaaS_Admins", "members": [ "` + req.user.id + `" ] }, { "name": "admins", "members": [ $(ADMINS) ] } ] 
                                        }' > 'obdparameters.json' \
                                    && ./btpsa \
                                        -usecasefile 'obdusecase.json' \
                                        -parameterfile 'obdparameters.json' \
                                        -globalaccount '$(GLOBALACCOUNT)' \
                                        -mypassword '$(MYPASSWORD)' \
                                        -myemail '$(MYEMAIL)' \
                                        -iashost '$(IASHOST)' \
                                        -defaultIdp 'sap.custom'`
                                ]
                            }]
                        }
                    }
                }
            });

            console.log(`Onboarding: ${JSON.stringify(jobResult.body)}`);
            return req.reply('Onboarding Started');
        } catch (error) {
            console.error(`Error: Error during tenant onboarding: ${JSON.stringify(error)}`)
            return req.error(404, `Error occurred during tenant onboarding: ${error.message}`)
        }
    });
});