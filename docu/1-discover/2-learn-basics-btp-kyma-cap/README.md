# The Basics of SAP BTP, Kyma and CAP

The **SAP Business Technology Platform (SAP BTP)** is an integrated offering comprised of four technology portfolios: database and data management, application development and integration, analytics, and intelligent technologies. The platform offers users the ability to turn data into business value, compose end-to-end business processes, and build and extend SAP applications quickly.


## Basic Platform Concepts

> **Hint** - Check the official documentation to learn more ([click here](https://help.sap.com/docs/btp/sap-business-technology-platform/sap-business-technology-platform)).

SAP BTP offers users the ability to turn data into business value, compose end-to-end business processes, and build and extend SAP applications quickly. The services and solutions of SAP BTP are available on multiple cloud infrastructure providers. The multi-cloud foundation supports different environments, such as **Kyma**, Cloud Foundry, ABAP Cloud, as well as multiple different regions, and a broad choice of programming languages.

The central point of entry to the platform is the SAP BTP Cockpit (see below), where you can access your accounts and applications and manage all activities associated with them. As this tutorial is not about an extensive SAP BTP introduction, we would like to refer you to the official [SAP Help](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/73beb06e127f4e47b849aa95344aabe1.html?locale=en-US) documentation for further information.

<img src="./images/platform-overview.png" width="650"/>

**Enterprise vs. Trial Accounts**

> **Hint** - Check the official documentation to learn more ([click here](https://help.sap.com/docs/btp/sap-business-technology-platform/trial-accounts-and-free-tier)).

Just a few comments on the SAP BTP Account requirements for this use case. You can set up our sample application in any SAP BTP environment using **Free (Tier) service plans** ([click here](https://help.sap.com/docs/btp/sap-business-technology-platform/using-free-service-plans) to learn more) of your own **Pay-as-you-Go** (PAYG) or **CPEA** account ([click here](https://help.sap.com/docs/btp/sap-business-technology-platform/what-is-consumption-based-commercial-model?locale=en-US) to learn more). We highly suggest to create an **Enterprise Account** for the purpose of this and any future use case. While you can set up parts of our sample application also in **Trial** environments, only an **Enterprise Account** allows you to move from **Free Tier** to **Paid** service plans if required.  

> **Hint** - A tutorial how to set up a free PAYG account (allowing you to use all Free Tier service plans) can be found in the [Tutorial Navigator](https://developers.sap.com/tutorials/btp-free-tier-account.html). 

**Further links**

Feel free to check out and bookmark the following links for your convenience: 

SAP BTP Cockpit (change region if required) <br> 
https://cockpit.eu10.hana.ondemand.com/cockpit

SAP BTP Best Practices <br>
https://help.sap.com/docs/btp/best-practices/best-practices-for-sap-btp

SAP BTP Tools and APIs <br>
https://help.sap.com/docs/btp/best-practices/tools<br>
https://help.sap.com/docs/btp/best-practices/apis

SAP BTP Trial Cockpit <br> 
https://cockpit.hanatrial.ondemand.com/trial


## SAP BTP, Kyma Environment

As the focus of this tutorial, is the deployment of a CAP-based SaaS application to the **SAP BTP, Kyma Runtime**, let us spend a few words and provide you with useful links and further details about this topic.  

The SAP BTP, Kyma runtime is essentially “a fully managed Kubernetes runtime based on the open-source project “Kyma”. This cloud-native solution allows the developers to extend SAP solutions with serverless Functions and combine them with containerized microservices. The offered functionality ensures smooth consumption of SAP and non-SAP applications, running workloads in a highly scalable environment, and building event- and API-based extensions“, as described in the SAP Discovery Center ([click here](https://discovery-center.cloud.sap/serviceCatalog/kyma-runtime?region=all)).

To successfully follow along this tutorial, please take a short break and read the latest Blog Post of Maximilian Streifeneder. He has written a great summary containing all relevant basics required when planning to deploy CAP-based workloads to SAP BTP, Kyma Environment. We will link this blog post a few more times throughout the tutorial, so take your time and take a first glimpse right now!

[Surviving and Thriving with the SAP Cloud Application Programming Model: Deployment to SAP BTP, Kyma runtime](https://blogs.sap.com/2023/03/07/surviving-and-thriving-with-the-sap-cloud-application-programming-model-deployment-to-sap-btp-kyma-runtime/)

Additionally, check out the following resources, to learn more about Kyma - which are also linked in Max's blog post.

- [Kyma Project - Documentation](https://kyma-project.io/)
- [GitHub - Kyma Runtime Extension Samples](https://github.com/SAP-samples/kyma-runtime-extension-samples)
- [Youtube - Understand the value proposition of SAP BTP, Kyma runtime by example](https://www.youtube.com/watch?v=RhSF9ZBcHsg)
- [Youtube- 2 Minutes of Cloud Native](https://www.youtube.com/playlist?list=PL6RpkC85SLQCwaJ54TAAHMvSl5wpVPrai)

If you are completely new to Kubernetes, we also highly recommend to acquaint yourself with a respective introduction:

- [https://kubernetes.io/training/](https://kubernetes.io/training/)


## Cloud Application Programming Model (CAP)

As our SaaS sample application is based on the so-called **Cloud Application Programming Model** also known as **CAP**, please familiarize yourself with the basics of this brilliant framework! As we cannot summarize the essence of CAP any better than the official **Capire** documentation (https://cap.cloud.sap/docs/about/), let us briefly check how the experts describe it. 

*"The SAP Cloud Application Programming Model (CAP) is a framework of languages, libraries, and tools for building enterprise-grade services and applications. It guides developers along a ‘golden path’ of proven [best practices](https://cap.cloud.sap/docs/about/#enterprise-best-practices) and a great wealth of [out-of-the-box solutions](https://cap.cloud.sap/docs/about/#generic-providers) to recurring tasks.*

*CAP-based projects benefit from a [primary focus on domain](https://cap.cloud.sap/docs/about/#domain-modeling). Instead of delving into overly technical disciplines, we focus on [accelerated development](https://cap.cloud.sap/docs/about/#grow-as-you-go) and [safeguarding investments](https://cap.cloud.sap/docs/about/#agnostic-approach) in a world of rapidly changing cloud technologies."*

Besides using CAP for the definition of our SaaS **tenant data model**, as well as the data model shared amongst all subscribers, we are using much more features as part of this SaaS sample application. Based on these **data models**, CAP provides the required **OData Services** including **Annotations** used by our Fiori Elements UIs out-of-the-box, CAP is backing our multitenant **SaaS Inbound API**, and handles security checks across our application. Last but not least, we are making use of the latest **@sap/mtxs** package ([click here](https://cap.cloud.sap/docs/guides/multitenancy/mtxs)), utilized to simplify multitenant related requirements like **tenant provisioning** ([click here](https://cap.cloud.sap/docs/guides/multitenancy/mtxs#saasprovisioningservice)), **extensibility** ([click here](https://cap.cloud.sap/docs/guides/multitenancy/mtxs#extensibilityservice)) or even **feature toggle** support ([click here](https://cap.cloud.sap/docs/guides/extensibility/feature-toggles)). 

If you're to CAP, please acquaint yourself with the basics of CAP right now, before you start getting your head around our SaaS sample application deployment. Start by reading what CAP is all about (https://cap.cloud.sap/docs/about/), set foot on the Getting Started guide (https://cap.cloud.sap/docs/get-started/), run the Hello World application (https://cap.cloud.sap/docs/get-started/hello-world) and get the core features of CAP in a nutshell (https://cap.cloud.sap/docs/get-started/in-a-nutshell).

Feel free to explore the following resources to learn more about CAP and check out the latest community discussions ([click here](https://blogs.sap.com/tags/9f13aee1-834c-4105-8e43-ee442775e5ce/)):

- CAP Documentation - https://cap.cloud.sap/docs/
- CAP Tutorials - [https://developers.sap.com/](https://developers.sap.com/tutorial-navigator.html?tag=software-product-function%3Asap-cloud-application-programming-model&tag=tutorial%3Atype%2Fmission)
  - Build an Application End-to-End Using CAP, Node.js and VS Code - [click here](https://developers.sap.com/group.btp-app-cap-create.html)
  - Create an SAP Cloud Application Programming Model Project for SAP HANA Cloud - [click here](https://developers.sap.com/tutorials/hana-cloud-cap-create-project.html)
  - ...
- Node.js CAP Samples - https://github.com/sap-samples/cloud-cap-samples
- Java CAP Samples - https://github.com/SAP-samples/cloud-cap-samples-java
- CAP and Fiori Elements - https://github.com/SAP-samples/cap-sflight
- Cloud Foundry CAP Multitenant - https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas