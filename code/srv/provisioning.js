const cds = require('@sap/cds');
const xsenv = require('@sap/xsenv');
const Automator = require("./utils/automator");
const AlertNotification = require('./utils/alertNotification');
const ApiRule = require('./utils/apiRule');

module.exports = (service) => {

    service.on('UPDATE', 'tenant', async (req, next) => {
        console.log('Subscription Data: ', JSON.stringify(req.data));
        const { subscribedSubdomain: subdomain, subscribedTenantId : tenant }  = req.data;

        let tenantURL = "https:\/\/" + `${subdomain}-${process.env["ROUTER_NAME"]}-${process.env["KYMA_NAMESPACE"]}.${process.env["CLUSTER_DOMAIN"]}`;

        const custSubdomain = req.data?.subscriptionParams?.custSubdomain;
        if(custSubdomain && custSubdomain !== '') { 
            console.log(`Custom subdomain - ${custSubdomain} - used for tenant Url!`)
            tenantURL = "https:\/\/" + `${custSubdomain}.${process.env["CLUSTER_DOMAIN"]}`
        };

        // Set VCAP_SERVICES to fix cross-container access requirements
        process.env.VCAP_SERVICES ??= JSON.stringify({ "hana":[ xsenv.filterServices({tag:'hana'})[0] ] });

        await next();

        // Trigger tenant broker deployment on background
        cds.spawn({ tenant: tenant, subdomain: subdomain }, async (tx) => {
            try {
                // Create artifacts in subscriber subaccount
                const automator = new Automator();
                await automator.deployTenantArtifacts(tenant, subdomain);
                
                // Create APIRule for subscriber subaccount
                const apiRule = new ApiRule(subdomain, custSubdomain);
                await apiRule.createApiRule(apiRule.getApiRuleTmpl());

                console.log("Success: Onboarding completed!");

            } catch (error) {
                const alertNotification = new AlertNotification();
                
                // Send generic alert using Alert Notification if service binding exists
                alertNotification.bindingExists ?
                    alertNotification.sendEvent({
                        type : 'GENERIC',
                        data : {
                            subject : 'Error: Automation skipped because of error during subscription!',
                            body : JSON.stringify(error.message),
                            eventType : 'alert.app.generic',
                            severity : 'FATAL',
                            category : 'ALERT'
                        }
                    }) : '';

                // Log error
                console.error("Error: Automation skipped because of error during subscription");
                console.error(`Error: ${error.message}`);
            }
        })

        return tenantURL;
    });

    service.on('DELETE', 'tenant', async (req, next) => {
        console.log('Unsubscribe Data: ', JSON.stringify(req.data));
        const { subscribedSubdomain: subdomain, subscribedTenantId : tenant }  = req.data;
        
        await next();

        try {
            const automator = new Automator();
            const apiRule = new ApiRule(subdomain);

            await automator.undeployTenantArtifacts(tenant, subdomain);
            await apiRule.deleteApiRule(apiRule.getApiRuleTmpl());
            
            console.log("Success: Unsubscription completed!");

        } catch (error) {
            const alertNotification = new AlertNotification();
                
            // Send generic alert using Alert Notification if service binding exists
            alertNotification.bindingExists ?
                alertNotification.sendEvent({
                    type : 'GENERIC',
                    data : {
                        subject : 'Error: Automation skipped because of error during unsubscription!',
                        body : JSON.stringify(error.message),
                        eventType : 'alert.app.generic',
                        severity : 'FATAL',
                        category : 'ALERT'
                    }
                }) : '';

            console.error("Error: Automation skipped because of error during unsubscription");
            console.error(`Error: ${error.message}`);
        }

        return tenant;
    });


    service.on('upgradeTenant', async (req, next) => {
        await next();
        const { instanceData, deploymentOptions } = cds.context.req.body;
        console.log('UpgradeTenant: ', req.data.subscribedTenantId, req.data.subscribedSubdomain, instanceData, deploymentOptions);
    });


    service.on('dependencies', async (req, next) => {
        let dependencies = await next();
        const services = xsenv.getServices({
            html5Runtime: { tag: 'html5-apps-repo-rt' },
            destination: { tag: 'destination' }
        });

        dependencies.push({ xsappname: services.html5Runtime.uaa.xsappname });
        dependencies.push({ xsappname: services.destination.xsappname });
        
        console.log("SaaS Dependencies:", JSON.stringify(dependencies));
        return dependencies;
    });

}