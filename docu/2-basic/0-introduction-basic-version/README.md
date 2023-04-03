# Introduction to the Basic Version

The **Basic Version** of the sample application will provide you with the core elements required for a Software as a Service (SaaS) application on SAP Business Technology Platform (SAP BTP). 

- [Introduction to the Basic Version](#introduction-to-the-basic-version)
  - [1. Step-by-Step](#1-step-by-step)
  - [2. Version Features](#2-version-features)
  - [3. Results](#3-results)

You can set up the **Basic Version** in any **SAP BTP Kyma** environment using **Free (Tier) service plans** of your own **Pay-as-you-Go** (PAYG) or **CPEA** account. 

> **Hint** - The Basic Version can also be deployed to **Trial** accounts, although we recommend to use one of the account types mentioned above. 

Check the following architecture to get an idea of the Basic Version components:

[<img src="./images/App_Architecture_Basic.png" width="500" />](./images/App_Architecture_Basic.png)

Again, for our **Kubernetes** friends, a more detailed depiction including some of the used Kyma and native Kubernetes components:

[<img src="./images/App_Architecture_BasicDetails.png" width="450" />](./images/App_Architecture_BasicDetails.png)


## 1. Step-by-Step

To deploy the **Basic Version** of our SaaS application and to learn more about Kyma, Helm and Kubernetes please follow the steps below. 

1. Start by **Understanding the repository structure**. ➜ ([click here](../1-understand-repo-structure/README.md))
2. **Prepare your Provider Subaccount** for deployment. ➜ ([click here](../2-prepare-provider-subaccount/README.md))
3. Run a **cds build**, then **build and push** the Docker images. ➜ ([click here](../3-build-your-docker-images/README.md))
4. Next, **deploy** your SaaS application using Helm. ➜ ([click here](../4-build-deploy-saas-application/README.md))
5. After deployment **subscribe a Consumer Subaccount**. ➜ ([click here](../5-subscribe-consumer-subaccount/README.md))
6. Provide sample content by **pushing data to the SaaS API**. ➜ ([click here](../6-push-data-to-saas-api/README.md))
7. Play around with the app and **test features end-to-end**. ➜ ([click here](../7-test-the-application/README.md))
8. Learn about utilized **Kyma resources** and **Helm charts**. ➜ ([click here](../8-kyma-resources/README.md))
9. Explore the **application components** in greater detail. ➜ ([click here](../9-explore-the-components/README.md))
10. Learn how to **unsubscribe a Consumer tenant** (if required). ➜ ([click here](../10-unsubscribe-consumer-subaccount/README.md))
11. **Undeploy the SaaS application** (if required). ➜ ([click here](../11-undeploy-saas-application/README.md))


## 2. Version Features

The **Basic Version** provides the sample implementation of a CAP-based multitenant SaaS application containing features like a

- **SAP HANA Cloud** database model to store the application or API data of all Tenants and a data model shared among all tenants.
- **CAP OData service** providing an OData v4 service for the application layer including annotations (Service Engine).
- **Fiori Elements** application based on various annotations and samples for extension options (UI Component).
- **CAP API service** providing all Tenants an interface to provide data from solutions like SAP S/4HANA (SaaS API).
- **Service Broker** allowing Tenants to create a service broker instance to access the application's API (API Broker).

Furthermore, the **Basic Version** of the application provides sample integrations and usage scenarios of SAP BTP services including 

- basic enterprise application features like
    - **Alert Notification Service** informing you about issues with your application like a crash or errors during Tenant onboarding.
    - **Horizontal Pod Autoscaling** which is scaling your SaaS application components in case of increased workload by your SaaS tenants.
    - **HTML5 Application Repository** storing and serving your static application content making your app more resilient.
- important components for SaaS usage like
    - **SAP HANA Cloud** allowing you to use the powerful container concept for Tenant separation on the same database.
    - **Service Manager** which is responsible for handling a secure communication with the Tenant database containers. 
    - **Application Router** which is one of the key players in handling the multitenancy features of your SaaS application.
- Authorization & Trust Management service instances of
    - **application** plan which handles the XSUAA-based application authentication and authorization of all tenants.
    - **broker** plan which takes care of the XSUAA-based API access security requirements for all tenants.

As the setup includes a lot of different services and components, only the elements which are not self-explanatory will be covered in detail by this tutorial. We highly recommend checking SAP Help or related documentation of the components (e.g., npm packages) in case you want to learn more. Please also check the [**Explore the Components**](../9-explore-the-components/README.md) part of this tutorial to find more details about the most important application components!


## 3. Results

The results of this tutorial will be a sample SaaS application running in your own **Kyma Cluster**  which 

- offers your Tenants a user interface to
    - **manage** the tenant-specific SaaS application **users**.
    - create **projects** and assign users as **members** to different projects.
    - setup **assessments** for analyzing product circularity metrics.
- provides an SAP HANA Cloud HDI (*) container based **data separation** for all tenants.
- can be subscribed from subaccounts (**consumers**) in the same Global Account.
- creates a dedicated **service broker instance** for **API access** during the subscription.
- allows your Tenants to read and **update data** using a multitenant **API** endpoint.
- let Tenants **prefill** their assessments with data uploaded through the API.

(*) HDI - HANA Deployment Infrastructure

See the following screenshots will give you an idea of the basic application version (click to enlarge).

| [<img src="./images/App_Sample01.png" width="300" alt="Main Menu"/>](./images/App_Sample01.png) | [<img src="./images/App_Sample02.png" width="300" alt="Project List"/>](./images/App_Sample02.png)
|:----------: | :------------: |
| *Main Menu* | *Project List* |

| [<img src="./images/App_Sample03.png" width="300" alt="Project Details"/>](./images/App_Sample03.png) | [<img src="./images/App_Sample04.png" width="300" alt="Project Assessments"/>](./images/App_Sample04.png)
|:----------------: | :-------------------: |
| *Project Details* | *Project Assessments* |

| [<img src="./images/App_Sample05.png" width="300" alt="Project Members"/>](./images/App_Sample05.png) | [<img src="./images/App_Sample06.png" width="300" alt="Add Project Member"/>](./images/App_Sample06.png)
|:----------------: | :------------------: |
| *Project Members* | *Add Project Member* |

| [<img src="./images/App_Sample07.png" width="300" alt="User List"/>](./images/App_Sample07.png) | [<img src="./images/App_Sample08.png" width="300" alt="User Details"/>](./images/App_Sample08.png)
|:----------: | :------------: |
| *User List* | *User Details* |

| [<img src="./images/App_Sample09.png" width="300" alt="Assessment List"/>](./images/App_Sample09.png) | [<img src="./images/App_Sample10.png" width="300" alt="Assessment Details"/>](./images/App_Sample10.png)
|:----------------: | :------------------: |
| *Assessment List* | *Assessment Details* |

| [<img src="./images/App_Sample11.png" width="300" alt="Circularity Metrics"/>](./images/App_Sample11.png) | [<img src="./images/App_Sample12.png" width="300" alt="Circularity Charts"/>](./images/App_Sample12.png)
|:--------------------: | :------------------: |
| *Circularity Metrics* | *Circularity Charts* |

| [<img src="./images/App_Sample13.png" width="300" alt="Sales Splits"/>](./images/App_Sample13.png) | [<img src="./images/App_Sample14.png" width="300" alt="Prefill Sales Splits"/>](./images/App_Sample14.png)
|:-------------: | :--------------------: |
| *Sales Splits* | *Prefill Sales Splits* |

| [<img src="./images/App_Sample15.png" width="300" alt="Material Splits"/>](./images/App_Sample15.png) | [<img src="./images/App_Sample16.png" width="300" alt="Modify Material Splits"/>](./images/App_Sample16.png)
|:----------------: | :----------------------: |
| *Material Splits* | *Modify Material Splits* |

| [<img src="./images/App_Sample17.png" width="300" alt="Material Splits"/>](./images/App_Sample17.png) 
|:----------------: |
| *Material Splits* |