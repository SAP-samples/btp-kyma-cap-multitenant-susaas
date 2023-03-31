# Develop a multitenant Software as a Service application in SAP BTP using CAP

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/btp-kyma-cap-multitenant-susaas)](https://api.reuse.software/info/github.com/SAP-samples/btp-kyma-cap-multitenant-susaas)


## Description

The **Sustainable SaaS (SusaaS)** sample application has been built in a partner collaboration to help interested developers, partners, and customers in developing multitenant Software as a Service applications using CAP and deploying them to the SAP Business Technology Platform (SAP BTP). For this use-case, the **Kyma Runtime** was chosen. Still, you can also develop similar SaaS applications in other runtimes like **Cloud Foundry** or the SAP BTP **ABAP environment**.

The example focuses on using standard frameworks and SAP BTP services for developing, deploying, and monitoring the solution like the Cloud Application Programming Model (CAP), SAP API Management, Alert Notification, and many more. 

The sample application has a focus on the topic of sustainability and is therefore called **Sustainable SaaS** (SuSaaS) app. It allows customers (**Consumer Tenants**) of the SaaS application to extend their SAP solutions like S/4HANA with additional features developed by the SaaS vendor (**Provider**). 

Due to the technical and theoretical complexity of the topic, the sample application shall not be seen or used in any kind for productive scenarios. It is supposed to present ideas and approaches for putting your scenario into practice. Our goal is to cover as many topics as we can, but not in the greatest depth that might justify productive usability.  

Below you can find a solution architecture diagram of the sample application. As you can see, the app contains a lot of services and tools which you will use in this tutorial (click to enlarge).

[<img src="./docu/4-expert/0-introduction-expert-features/images/App_Architecture_Expert.png" width="600" />](./docu/4-expert/0-introduction-expert-features/images/App_Architecture_Expert.png)


## Content

To get started, we recommend to **Discover** some basic skills and learnings first. The following parts of the documentation will introduce you to the basics of this scenario, the concepts of multitenancy, and Software as a Service applications. 

- [Discover the tutorial target](./docu/1-discover/1-discover-tutorial-target/README.md)
- [Basics of SAP BTP, Kyma and CAP](./docu/1-discover/2-learn-basics-btp-kyma-cap/README.md)
- [Partners in SAP BTP ecosystem](./docu/1-discover/3-partners-sap-btp-ecosystem/README.md)
- [Get an idea of SaaS applications](./docu/1-discover/4-get-idea-saas-applications/README.md)
- [Understand SAP BTP multitenancy](./docu/1-discover/5-understand-btp-multitenancy/README.md)
- [What's New](./docu/1-discover/6-whats-new/README.md)


Continue your journey and deploy the **Basic Version** of the SaaS sample application to your SAP BTP Kyma environment, after preparing your Provider Subaccount by assigning the required entitlements. Learn about the different components used in the comprehensive SaaS sample app running in your environment now and subscribe a first Consumer Tenant. 

- [Introduction of the Basic Version](./docu/2-basic/0-introduction-basic-version/README.md)
- [Understand the repository structure](./docu/2-basic/1-understand-repo-structure/README.md)
- [Prepare the Provider Subaccount](./docu/2-basic/2-prepare-provider-subaccount/README.md)
- [Build your Docker images](./docu/2-basic/3-build-your-docker-images/README.md)
- [Deploy the SaaS application](./docu/2-basic/4-deploy-saas-application/README.md)
- [Subscribe a Consumer Subaccount](./docu/2-basic/5-subscribe-consumer-subaccount/README.md)
- [Push data to the SaaS API](./docu/2-basic/6-push-data-to-saas-api/README.md)  
- [Test the SaaS application](./docu/2-basic/7-test-the-application/README.md)
- [Discover Helm and Kyma Resources](./docu/2-basic/8-kyma-resources-helm/README.md)
- [Explore the application components](./docu/2-basic/9-explore-the-components/README.md)  
- [Optional - Unsubscribe Consumer Subaccounts](./docu/2-basic/10-unsubscribe-consumer-subaccount/README.md)
- [Optional - Undeploy the SaaS application](./docu/2-basic/11-undeploy-saas-application/README.md)


 Once you successfully deployed the Basic features of the SaaS sample application to your Kyma Cluster, feel free to enhance it with more features in the **Advanced Version**. This includes for example a SAP API Management integration to monitor and manage your SaaS API endpoints or SAP Identity Authentication to provide a central user management without relying on SAP ID service. Furthermore, you will learn and see a sample of how to integrate a backend system like SAP S/4HANA from a SaaS Consumer perspective. 

- [Introduction of the Advanced Version](./docu/3-advanced/0-introduction-advanced-version/README.md)
- [Understand the repository details](./docu/3-advanced/1-understand-repo-details/README.md)
- [Prepare the Provider Subaccount](./docu/3-advanced/2-prepare-provider-subaccount/README.md)
- [Central user management with SAP IAS](./docu/3-advanced/3-central-user-management-ias/README.md)
- [Push data from SAP S/4HANA system](./docu/3-advanced/4-push-data-s4hana-system/README.md)
- [Integrate with SAP API Management](./docu/3-advanced/5-integrate-sap-api-management/README.md)


After adding some or all of the advanced features, the following **Expert Features** contain a variety of different topics, which will make your application and life as a SaaS developer even more convenient. You will learn about management and backup of your Tenant database containers, multi-region deployments of SaaS applications and how to tackle topics like Custom Domain usage. 

> **Important** - The Expert Features are Work-in-Progress. The code and documentation are subject to change. 

- [Introduction of the Expert Features](./docu/4-expert/0-introduction-expert-features/README.md)
- [SaaS Feature Toggles](./docu/4-expert/feature-toggles/README.md)
- [SaaS Consumer Extensibility](./docu/4-expert/consumer-extensibility/README.md)
- [HDI container administration](./docu/4-expert/hdi-container-administration/README.md)
- [How to do local/hybrid development](./docu/4-expert/local-hybrid-development/README.md)
- [Manage Tenant database containers](./docu/4-expert/manage-tenant-containers/README.md)
- [Backup database containers](./docu/4-expert/backup-database-containers/README.md)
- [Update Tenant database containers](./docu/4-expert/update-tenant-containers/README.md)
- [Setup custom domain usage](./docu/4-expert/custom-domain-usage/README.md)
- [Custom domain for SAP IAS](./docu/4-expert/custom-domain-for-ias/README.md)
- [Integrate a consumer's IdP](./docu/4-expert/integrate-consumers-idp/README.md)
- [Deploy to multiple regions](./docu/4-expert/deploy-multiple-regions/README.md)
- [Send email using Microsoft Graph API](./docu/4-expert/send-emails-graph-api/README.md)
- [Multiple SAP HANA Cloud instances](./docu/4-expert/multiple-hana-cloud/README.md)


## Requirements

If not yet done, for this sample application we recommend to set up a **Pay-As-You-Go (PAYG)** or **CPEA** account and use the mentioned **Free (Tier) service plans**. A tutorial how to setup a PAYG account (allowing you to use all Free Tier service plans) can be found in the [Tutorial Navigator](https://developers.sap.com/tutorials/btp-free-tier-account.html). 


### Basic Version

The **Basic Version** of the sample application requires the following set of SAP BTP entitlements in the Provider Subaccount and can be done using **Free (Tier) service plans** of **PAYG** and **CPEA** accounts.

> **Hint** - The Basic Version of the SaaS application can also be deployed to Kyma environments in **Trial** accounts, although we recommend to use one of the account types mentioned above. Please make sure to choose the **us10** region to use SAP HANA Cloud in this case. 

| Service                           | Free (Tier)  Plans  |
|-----------------------------------|---------------------|
| [SAP Alert Notification service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/alert-notification?region=all) | Free / *(Trial: Lite)* |
| [SAP Application Logging Service](https://discovery-center.cloud.sap/serviceCatalog/application-logging-service/?region=all) | Lite |
| [SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)| Broker <br> Application |
| [SAP BTP, Kyma Runtime](https://discovery-center.cloud.sap/serviceCatalog/kyma-runtime?region=all&tab=feature) | Free / *(Trial: Trial)* |
| [SAP BTP, Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) <br> (Required in **Trial** only!) | (Trial: Standard) |
| [SAP Cloud Management Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/cloud-management-service/?region=all) | Central |
| [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=cloud) | Lite |
| [SAP HTML5 Application Repository Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) | App-host <br>App-runtime |
| [SAP Software-as-a-Service Provisioning service](https://discovery-center.cloud.sap/serviceCatalog/saas-provisioning-service?service_plan=application&region=all&commercialModel=cloud) | Application |
| [SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all) | hana-free *(Trial: HANA)*<br>tools *(Trial: not available!)*  |
| [SAP HANA Schemas & HDI Containers](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/e28abca91a004683845805efc2bf967c.html?version=2.0.04&locale=en-US) | hdi-shared |
| [SAP Service Manager](https://discovery-center.cloud.sap/serviceCatalog/service-manager/?region=all) | Container <br> Subaccount-Admin |
| | |


### Advanced Features

The **Advanced Features** require some additional services and software components which are listed below. Please note that the **SAP Identity Authentication Service** is only available in **Pay-As-You-Go (PAYG)** and **CPEA** accounts.

> **Hint** - The SAP Identity Authentication service Integration cannot be conducted to Trial accounts!

| Service                           | Free (Tier)  Plans  | 
|-----------------------------------|------------|
| [SAP Integration Suite](https://discovery-center.cloud.sap/serviceCatalog/integration-suite?region=all)<br> or SAP API Management | Free (*) <br> &nbsp; |
| [Cloud Identity Services](https://discovery-center.cloud.sap/serviceCatalog/integration-suite?region=all) | Application  |
| [SAP Identity Authentication](https://discovery-center.cloud.sap/serviceCatalog/identity-authentication?region=all&tab=feature) | (**) |
| SAP S/4HANA 2021 (or newer) | (***) |
| |

> **\*** **SAP Integration Suite** - The **free service plan** is usable for 90 days only. Your tenant will be decommissioned after 90 days and you need to set up a new tenant if you wish to do further validations. 

> **\*\*** **SAP Identity Authentication** 
> > When signing up for a PAYG or CPEA account, you're entitled for a free test and productive SAP Identity Authentication Service tenant. Any further tenant can be licensed as **Additional Tenant** and will be charged according to your account type. Please also check the official SAP Help documentation ([click here](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/93160ebd2dcb40e98aadcbb9a970f2b9.html?locale=en-US#loio93160ebd2dcb40e98aadcbb9a970f2b9__licensing_section)) and the following blog post ([click here](https://blogs.sap.com/2021/10/26/is-sap-cloud-identity-services-for-free/)) for further information. 
> 
> > Using the **Default (Application)** plan of the **Cloud Identity Services** offering, you can create a new SAP Identity Authentication Service if required. Please check for potentially existing tenants first, to make sure you are sticking to the free service offering limits.


> **\*\*\*** **SAP S/4HANA** - An SAP S/4HANA system is required if you want to test the automated data push feature from an existing SAP On-Premise solution. While we recommend to use at least the SAP S/4HANA 2021 release, with a bit of coding effort you should be able to also integrate older releases. This guide assumes you have access to an 2021 release. Feel free to check out the SAP Cloud Appliance Library (https://cal.sap.com/) to get yourself a free test license. 


## Deployment

The deployment to your SAP BTP Kyma environment is described in the **Basic Version** of the documentation ([click here](./docu/2-basic/3-build-deploy-saas-application/README.md)). 


## Known Issues
**Open**
  - Consumer extension API issue (Workaround available - 2022/12/19)
    - **Problem**: Applying a Consumer extension currently results in the Push API not being usable by the extended Tenant anymore. 
    - **Issue**: The current implementation has issues to read and process the CSN file of the extended SaaS CAP service. This service serves as a base for the API CAP service.
    - **Workaround**: Extensibility has been temporarily disabled for the CAP API Service.
    - **Solution**: Issues has been addressed with the CAP product management and potential solutions will be worked on. 


## How to obtain support
[Create an issue](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).


## Contributing
If you wish to contribute code or offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request for this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).


## License
Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
