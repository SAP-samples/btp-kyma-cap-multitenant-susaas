const ServiceManager = require("./service-manager");
const CisCentral = require('./cis-central')
const destination = require('./destination')

class TenantAutomator {
    constructor() {
        this.credentials = new Map();
        this.destination = destination;
    }

    async deployTenantArtifacts(subscribingTenant, subscribingSubdomain) {
        try {
            await this.initialize(subscribingTenant, subscribingSubdomain);
            await this.createSampleDestination(subscribingSubdomain, `${process.env["HELM_RELEASE"].toUpperCase()}_${process.env["KYMA_NAMESPACE"].toUpperCase()}_S4HANA_CLOUD`)
            await this.registerBTPServiceBroker(subscribingSubdomain);
            await this.cleanUpCreatedServices(subscribingTenant);
            console.log("Automation: Deployment has been completed successfully!")
        } catch (error) {
            console.error("Error: Tenant artifacts cannot be deployed!") 
            throw error;
        }
    }

    async undeployTenantArtifacts(unsubscribingTenant, unsubscribingSubdomain) {
        try {
            await this.initialize(unsubscribingTenant);
            await this.deleteSampleDestination(unsubscribingSubdomain, `${process.env["HELM_RELEASE"].toUpperCase()}_${process.env["KYMA_NAMESPACE"].toUpperCase()}_S4HANA_CLOUD`)
            await this.unregisterBTPServiceBroker(unsubscribingTenant);
            await this.cleanUpCreatedServices(unsubscribingTenant);
            console.log("Automation: Undeployment has been completed successfully!")
        } catch (error) {
            console.error("Error: Tenant artifacts cannot be undeployed!")
            throw error;
        }
    }

    async initialize(subscribingTenant) {
        try {
            this.cisCentral = await this.createCisCentralInstance();
            this.serviceManager = await this.createServiceManager(subscribingTenant);
            console.log("Automator successfully initialized!")
        } catch (error) {
            console.error("Error: Automation can not be initialized!");
            throw error;
        }
    }

    async createCisCentralInstance() {
        try {
            this.cisCentral = new CisCentral();
            let cisParameters = { grantType: "clientCredentials" };

            // Create new CIS Central instance in SAP BTP
            await this.cisCentral.createServiceInstance(`${process.env["HELM_RELEASE"]}-${process.env["KYMA_NAMESPACE"]}-cis-central`, "cis", "central", cisParameters);
            // Create service binding for CIS Central instance
            await this.cisCentral.createServiceBinding();

            console.log("CIS Central Instance has been created successfully!")
            return this.cisCentral;
        } catch (error) {
            console.error("Error: CIS Central Instance can not be created!")
            throw error;
        }
    }

    async createServiceManager(subscribingTenant) {
        try {
            // Create service manager using CIS Central instance
            let serviceManagerCredentials = await this.cisCentral.createServiceManager(subscribingTenant);

            console.log("Service manager has been created successfully!")
            return new ServiceManager(serviceManagerCredentials);
        } catch (error) {
            console.error("Error: Service Manager can not be created!")
            throw error;
        }
    }
    
    async cleanUpCreatedServices(tenant) {
        try {
            // Delete Service Manager from tenant subaccount
            await this.cisCentral.deleteServiceManager(tenant);
            // Delete CIS Central instance service binding from SAP BTP
            await this.cisCentral.deleteServiceBinding();
            // Delete CIS Central instance from SAP BTP
            await this.cisCentral.deleteServiceInstance();

            console.log("Clean up successfully completed!");
        } catch (error) {
            console.error("Error: Clean up can not be completed!");
            throw error;
        }
    }
    
    async registerBTPServiceBroker() {
        try {
            let sbUrl = await this.getServiceBrokerUrl();
            let sbName = `${process.env["BROKER_NAME"]}-${process.env["KYMA_NAMESPACE"]}`;
            await this.serviceManager.createServiceBroker(
                sbName,
                sbUrl,
                "Sustainable SaaS API Broker",
                process.env["BROKER_USER"],
                process.env["BROKER_PASSWORD"]
            );
            console.log("Susaas Inbound API Broker registered successfully!")
        } catch (error) {
            console.error("Error: Service broker cannot be registered!")
            console.error(`Error: ${error.message}`);
        }
    }

    async unregisterBTPServiceBroker(tenant) {
        try {
            let sbName = `${process.env["BROKER_NAME"]}-${process.env["KYMA_NAMESPACE"]}`;
            let sb = await this.serviceManager.getServiceBroker(`${sbName}-${tenant}`)
            await this.serviceManager.deleteServiceBroker(sb.id)
            console.log(`Service Broker ${sbName} deleted`);
        } catch (error) {
            console.error(`Error: Service Broker can not be deleted`);
            console.error(`Error: ${error.message}`);
        }
    }

    async createSampleDestination(subscribedSubdomain, name) {
        try {
            var destConfig = [{
                "Name": name,
                "Type": "HTTP",
                "URL": "https://sandbox.api.sap.com",
                "Authentication": "NoAuthentication",
                "Description": "SusaaS S/4HANA Cloud",
                "ProxyType": "Internet",
                "HTML5.DynamicDestination": "true"
            }];
            await this.destination.subscriberCreate(subscribedSubdomain, destConfig)
            console.log(`Sample destination ${name} is created in tenant subaccount`);
        } catch (error) {
            console.error("Error: Sample destination can not be created in tenant subaccount")
            console.error(`Error: ${error.message}`);
        }
    }
    
    async deleteSampleDestination(unsubscribingSubdomain, name) {
        try {
            await this.destination.subscriberDelete(unsubscribingSubdomain, name)
            console.log(`Sample destination ${name} is deleted from tenant subaccount`);
        } catch (error) {
            console.error(`Error: Sample destination ${name} can not be deleted from tenant subaccount`);
            console.error(`Error: ${error.message}`);
        }
    }

    async getServiceBrokerUrl() {
        try {
           console.log("Broker endpoint to be registered:", process.env["BROKER_URL"]);
           return process.env["BROKER_URL"];
        } catch (error) {
            console.error(`Error: Service broker Url could not be retrieved`);
            throw error;
        }
    }
}

module.exports = TenantAutomator;