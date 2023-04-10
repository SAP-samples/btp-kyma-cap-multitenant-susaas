# Deep Dive into Helper Classes

In this part of the tutorial, you will learn about the different helper classes implemented in the business application service. These classes mainly support the automation of the Tenant subscription process. Furthermore, they contain the logic of the in-app user management.  

- [Deep Dive into Helper Classes](#deep-dive-into-helper-classes)
  - [1. Overview](#1-overview)
  - [2. Automator](#2-automator)
  - [3. Cloud Management Helper](#3-cloud-management-helper)
  - [4. Service Manager Helper](#4-service-manager-helper)
  - [5. Token Helper](#5-token-helper)
  - [6. Destination Helper](#6-destination-helper)
  - [7. API Rule Helper](#7-api-rule-helper)
  - [8. User Management Helper](#8-user-management-helper)
  - [9. Alert Notification Helper](#9-alert-notification-helper)


## 1. Overview

The table below shows all helper classes used by the Sustainable SaaS business application service:

| Util          | Source Code                | Description                                                           | 
| ------------- | -------------------------- | --------------------------------------------------------------------- |
| [Automator](#2-Automator)     | [automator.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/automator.js)| Helper class for automatic creation and deletion of artifacts on Tenant (un-)subscription | 
| [Cloud-Management-Helper](#3-Cloud-Management-Helper) | [cis-central.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/cis-central.js) | Helper class interacting with Cloud Management Service (central plan) |
| [Service-Manager-Helper](#4-Service-Manager-Helper) | [service-manager.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/service-manager.js) | Helper class interacting with Service Manager Subaccount (admin plan) |
| [Token-Helper](#5-Token-Helper)  | [token-utils.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/token-utils.js) | Helper class retrieving tokens from relevant OAuth2 servers |
| [Destination-Helper](#6-Destination-Helper)  | [destination.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/destination.js) | Helper module interacting with the SAP Destination Service |
| [API-Rule-Helper](#7-API-Rule-Helper)  | [apiRule.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/destination.js) | Helper module interacting with SAP Kyma Runtime API Rule CRD's |
| [User-Management-Helper](#8-User-Management-Helper)  | [user-management.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/user-management-utils.js) | Helper class for User and Role management interacting with SAP Identity Authentication and XSUAA |
| [Alert-Notification-Helper](#9-Alert-Notification-Helper)  | [alertNotification.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/alertNotification.js) | Helper class for interacting with SAP Alert Notification service |


## 2. Automator

For effortless Tenant on-offboarding in the SaaS context, it is essential to automate the process of onboarding as much as it can be automated. Therefore, the sample application automates as many steps as possible during the subscription of the SaaS Tenant instance. The [Automator](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/automator.js) module helps to provide a fully automated, self-service (un-) subscription experience.

The Automator is responsible for the following topics:
- Creation of destinations in a Consumer Subaccount on subscription with the help of [destination.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/destination.js).
- Deletion of destinations from Consumer Subaccount on unsubscription with the help of [destination.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/destination.js).
- Creation of a Cloud Management service instance & binding within the Provider Subaccount [cis-central.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/cis-central.js)
- Deletion of a Cloud Management service instance & binding from the Provider Subaccount [cis-central.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/cis-central.js)
- Creation of a service manager service instance & binding within a Consumer Subaccount with the help of [cis-central.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/cis-central.js).
- Deletion of a service manager service instance & binding from a Consumer Subaccount with the help of [cis-central.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/cis-central.js).
- Registering of a service broker in a Consumer Subaccount on subscription with the help of [service-manager.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/service-manager.js).
- Unregistering of a service broker from a Consumer Subaccount on unsubscription with the help of [service-manager.js](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/service-manager.js).

When a Tenant subscribes to the Sustainable SaaS app,
1. A new Cloud Management Service instance (central plan) will be created in the Provider Subaccount. 
2. A new Service Manager instance will be created in the Consumer Subaccount using the Cloud Management Service instance.
3. The API Broker will be registered by the Service Manager instance created in step 2.
4. A sample destination called **\*_S4HANA_CLOUD** will be created.
5. The Service Manager instance created in step 2 will be deleted again.
6. The Cloud Management Service instance created in step 1 will be deleted again.

When a Tenant unsubscribes from the Sustainable SaaS app,
1. A new Cloud Management Service instance (central plan) will be created in the Provider Subaccount. 
2. A new Service Manager instance will be created in the Consumer Subaccount using the Cloud Management Service instance.
3. The API Broker will be unregistered by the Service Manager instance created in Step 2.
4. The **\*_S4HANA_CLOUD** destination will be deleted.
5. The Service Manager instance created in Step 2 will be deleted.
6. The Cloud Management Service instance created in step 1 will be deleted again.


## 3. Cloud Management Helper
[SAP BTP Cloud Management Service](#https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/17b6a171552544a6804f12ea83112a3f.html?locale=en-US&q=Cloud%20Management%20Central) enables SAP BTP administrators to handle administrative tasks via APIs.

In this Sustainable SaaS application context, we are using **SAP BTP Cloud Management Service** to create and delete Service Manager instances in Consumer Subaccounts. To be able to do this, the Cloud Management helper class also contains functions to create and to delete a new Cloud Management Service instance (central plan) on runtime within the Provider Subaccount.

Only a Cloud Management Service instance of plan "central" and grant type **clientCredentials** can be used to create service instances in other subaccounts (like in this case a service manager instance). This special type of Cloud Management Service cannot be created during deployment, but has to be created and deleted during runtime, using a dedicated service manager instance of plan "subaccount-admin". The default service manager instance used by Kyma (plan service-operator-access) cannot be used to create such an instance. 


## 4. Service Manager Helper

Service Manager is a central registry for service brokers and platforms. It tracks service instances creation and allows sharing of services and service instances between different platform instances. The Service Manager allows an application to use services and service instances of multiple platforms.

The [Service Manager helper](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/service-manager.js) module is used for (un-)registering the API Broker in the Sustainable SaaS App context by interacting with the [Service Manager service instance](https://api.sap.com/api/APIServiceManagment/overview).


## 5. Token Helper
The [Token helper](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/token-utils.js) module is used for retrieving tokens from OAuth2 servers using the client credentials type.


## 6. Destination Helper
[Destination Helper Module](./user-management.js) is used for retrieving, creating, and deleting destinations in any given subaccount.


## 7. API Rule Helper
[API Rule Helper Module](./apiRule.js) is used during subscription, to create new API Rules in the Kyma cluster. These API rules expose a dedicated host for each Subscriber like **customer.saasapp.com**. If user creating the subscription does not provide a custom domain, the default host pattern incl. the subaccount subdomain will be used like **customer-379a13f-susaas-router-susaas.saasapp.com**.


## 8. User Management Helper
The [User Management Helper](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/user-management-utils.js) module is used for handling users and role assignments on both SAP IAS and XSUAA. For this use-case, it is required to allow in-app user management for consumers.

**Requirements**
1. A Tenant administrator should be able to create users without accessing the SAP BTP Consumer Subaccount.
2. A Tenant administrator should be able to assign role collections to users without accessing the SAP BTP Consumer Subaccount.
3. A Tenant administrator should be able to delete users without accessing the SAP BTP Consumer Subaccount.

**How does the creation of a user work?**
1. A User is created in [SAP IAS](https://help.sap.com/docs/IDENTITY_AUTHENTICATION/6d6d63354d1242d185ab4830fc04feb1/d17a116432d24470930ebea41977a888.html?version=Cloud&locale=en-US) (**Only if IAS usage is enabled!**).
2. An XSUAA shadow user is created in the SAP BTP Consumer Subaccount.
3. The chosen role is assigned to the Shadow User for authorization purposes.

**How does the deletion of a user work?**
1. The user is deleted from the Tenant Subaccount.
2. The User is deleted from SAP IAS (**Only if IAS usage is enabled!**).

To be able to provide this functionality, the User-Management-Helper interacts with SAP IAS APIs as well as XSUAA APIs.


## 9. Alert Notification Helper

The [Alert Notification Helper](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/blob/main/code/srv/utils/alertNotification.js) helper is used to interact with SAP BTP Alert Notification Service. In this sample, the provided functions allow you to send a generic notification to recipients of the event. 
