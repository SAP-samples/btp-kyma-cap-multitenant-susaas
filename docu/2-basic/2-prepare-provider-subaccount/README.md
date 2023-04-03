# Prepare the Provider Subaccount

In this chapter, you will learn how to prepare your SAP BTP Provider Subaccount for the deployment of the sample SaaS solution by assigning the required entitlements and setting up the foundational components. This includes a SAP HANA Cloud instance which you need to share with your Kyma Cluster or Kyma Namespace before deployment. 

- [Prepare the Provider Subaccount](#prepare-the-provider-subaccount)
  - [1. Prerequisites for Provider Subaccount](#1-prerequisites-for-provider-subaccount)
  - [2. Entitlements for Provider Subaccount](#2-entitlements-for-provider-subaccount)
  - [3. SAP HANA Cloud prerequisite](#3-sap-hana-cloud-prerequisite)
  - [4. Limitations of free services plans](#4-limitations-of-free-services-plans)
  - [5. Further information](#5-further-information)


## 1. Prerequisites for Provider Subaccount

As already mentioned, you can set up the **Basic Version** of the sample application in any SAP BTP environment using **Free (Tier) service plans** of your own **Pay-as-you-Go** (PAYG) or **CPEA** account. A tutorial how to setup a PAYG account (allowing you to use all Free Tier service plans) can be found in the [Tutorial Navigator](https://developers.sap.com/tutorials/btp-free-tier-account.html). 

> **Hint** - A setup in a Trial subaccount is also possible, but comes with additional complexity due to missing service plans. So, we strongly recommend the usage of free tier services in a PAYG or CPEA account. If you decide to set up things in Trial, please make sure to choose the **us10** region to use SAP HANA Cloud.

Please make sure to cater the following prerequisites:

* Setup a the SAP BTP Kyma Runtime using the **free** service plan (assign service plan in entitlements if not visible). 
  > **Hint** - Follow the official documentation in SAP Tutorial navigator ([click here](https://developers.sap.com/tutorials/cp-kyma-getting-started.html)) if required.<br>
  > **Important** - Make sure to create your SAP BTP Kyma Runtime using the **free** plan and not the **Standard** plan. 
* Set up a SAP HANA Cloud instance (**hana-free** service plan) using the **SAP HANA Cloud Tools**.
  > **Hint** - Check the following blog post  to learn more ([click here](https://blogs.sap.com/2022/09/21/sap-hana-cloud-goes-multi-environment-part-2-getting-started/)).<br>
  > **Important** - In SAP BTP **Trial** landscapes, the **SAP HANA Cloud Tools** are not available. Please create a respective SAP HANA Cloud Instance in a **Cloud Foundry** Space. Check our Cloud Foundry-based SaaS application to learn more ([click here](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas)).

Please check the limitations mentioned below when it comes to the usage of some SAP BTP service plans like e.g., hana-free. Furthermore, please note that the hana-free service plan is not available in all SAP BTP regions. You can check the availability in SAP Discovery Center ([click here](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?region=all&tab=service_plan&service_plan=free&commercialModel=cloud)).


## 2. Entitlements for Provider Subaccount

The application requires the following set of SAP BTP entitlements in the Provider Subaccount:

| Service                           | Free Tier / (Trial) Plans  |
|-----------------------------------|---------------------|
| [SAP Alert Notification service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/alert-notification?region=all) | Free / *(Trial: Lite)* |
| [SAP Application Logging Service](https://discovery-center.cloud.sap/serviceCatalog/application-logging-service/?region=all) | Lite |
| [SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all&tab=feature)| Broker <br> Application |
| [SAP BTP, Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) <br> (Required in **Trial** only!) | (Trial: Standard) |
| [SAP BTP, Kyma Runtime](https://discovery-center.cloud.sap/serviceCatalog/kyma-runtime?region=all&tab=feature) | Free / *(Trial: Trial)* |
| [SAP Cloud Management Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/cloud-management-service/?region=all) | Central |
| [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=cloud) | Lite |
| [SAP HTML5 Application Repository Service for SAP BTP](https://discovery-center.cloud.sap/serviceCatalog/html5-application-repository-service?region=all) | App-host <br>App-runtime | 
| [SAP Software-as-a-Service Provisioning service](https://discovery-center.cloud.sap/serviceCatalog/saas-provisioning-service?service_plan=application&region=all&commercialModel=cloud) | Application |
| [SAP HANA Cloud](https://discovery-center.cloud.sap/serviceCatalog/sap-hana-cloud?tab=customerreference&region=all) | hana-free *(Trial: HANA)*<br>tools *(Trial: not available!)*  | 
| [SAP HANA Schemas & HDI Containers](https://help.sap.com/docs/SAP_HANA_PLATFORM/3823b0f33420468ba5f1cf7f59bd6bd9/e28abca91a004683845805efc2bf967c.html?version=2.0.04&locale=en-US) | hdi-shared | 
| [SAP Service Manager](https://discovery-center.cloud.sap/serviceCatalog/service-manager/?region=all) | Container <br> Subaccount-Admin | 
| | |

If you need help assigning entitlements to your Provider Subaccount, you might find information [here](https://help.sap.com/docs/SERVICE_TICKET_INTELLIGENCE/fb95f4cf368448be94f0eaed1583f491/cda19c940bf5404c8e81770b0f879e82.html?locale=en-US).


## 3. SAP HANA Cloud prerequisite

If not available yet, please create a SAP HANA Cloud instance in your Provider subaccount or share an existing SAP HANA Cloud from any other subaccount within the same SAP BTP region (e.g., eu10). 

Any SAP HANA Cloud instance in the same region as your Kyma Cluster, can be enabled for usage within the Kyma Cluster of your Provider subaccount. Once you created the SAP HANA Cloud instance, please map it with your Kyma Cluster using the **Instance Mapping** feature. You can either map the SAP HANA Cloud instance with all namespaces in the Kyma Cluster or provide a dedicated namespace name. More information on how to share your SAP HANA Cloud instance with your Kyma Cluster can be found in the following blog post [(click here)](https://blogs.sap.com/2022/12/15/consuming-sap-hana-cloud-from-the-kyma-environment/). 

> **Important** - Please make sure to use the new **SAP HANA Cloud Tools** service (service plan **tools**) for this purpose! The instance mapping feature for Kyma is not available in the SAP HANA Cloud Central UI. The **SAP HANA Cloud Tools** are not yet available in the Trial environment! 

[<img src="./images/HanaCloudKyma.png" width="600"/>](./images/HanaCloudKyma.png)

> **Important** - In **SAP BTP Trial** landscapes, you cannot share a SAP HANA Cloud Instance with your Kyma Cluster. The required SAP HANA Cloud Tools are not available yet. In this case (which won't be covered in detail), please follow the official CAP documentation (https://cap.cloud.sap/docs/guides/deployment/deploy-to-kyma#hana-cloud-instance). It will explain in detail, how to create the required Service Key in the Cloud Foundry context and how to map to to a corresponding Secret in your Kyma Cluster. 


## 4. Limitations of free services plans

When using **free** SAP BTP services plans like **trial** for Kyma or **hana-free** for SAP HANA Cloud, please be aware of the following limitations:

- SAP BTP Kyma **trial** service plans are usable for 14 days only ([click here](https://blogs.sap.com/2022/09/13/sap-btp-kyma-runtime-trial-clusters-lifespan-limited-to-14-days/)). After this period, you need to setup a new SAP BTP Kyma Cluster. This limitation does not exist in Free Tier accounts using the **free** plan. 
- Free **SAP HANA Cloud** instances will be stopped on a daily base to reduce resource consumption. Check (and if necessary restart) your SAP HANA Cloud instance before using your SaaS subscription. Furthermore, you have **30 days** to **restart** your instances or they will be **deleted**.
- As mentioned, the **SAP HANA Cloud Tools** are not available in **Trial** accounts yet. Therefore, in Trial scenarios you have to create your own SAP HANA Cloud instance and HDI Container within a **Cloud Foundry Space**. Afterwards, you have to create a respective Kyma Secret containing the Service Key details of your HDI Container instance ([see here](https://cap.cloud.sap/docs/guides/deployment/deploy-to-kyma#hana-cloud-instance)). 
- **Free Kyma Cluster** have a restrictive resource limitation. Make sure you have enough resources left on your Cluster before deploying the sample application. If required, remove other workloads first. Check out the details provided in [Discovery Center](https://discovery-center.cloud.sap/serviceCatalog/kyma-runtime?region=all&tab=service_plan&service_plan=free&commercialModel=cloud) to learn more!


## 5. Further information

Please use the following links to find further information on the topics above:

* [SAP Help - Trial Accounts and Free Tier](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/046f127f2a614438b616ccfc575fdb16.html?locale=en-US)
* [SAP Help - Enterprise Accounts](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/171511cc425c4e079d0684936486eee6.html)
* [SAP Help - Account Administration in the Cockpit](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/8061ecc529d74465b2b9566a634943ec.html)
* [SAP Help - Create a Subaccount](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/05280a123d3044ae97457a25b3013918.html?locale=en-US)
* [SAP Help - Configure Entitlements and Quotas for Subaccounts](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/5ba357b4fa1e4de4b9fcc4ae771609da.html?locale=en-US)
* [SAP Discovery Center](https://discovery-center.cloud.sap)