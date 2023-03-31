# Discover the Tutorial Target

In this tutorial, you will learn how to set up a multitenant Software as a Service (SaaS) application using CAP in your SAP Business Technology Platform (SAP BTP) environment. For this use-case, the **Kyma Runtime** runtime was chosen, which is SAP's **managed Kubernetes Cluster**. You can develop similar SaaS applications in the SAP BTP **Cloud Foundry** runtime or the SAP BTP **ABAP Cloud** environment. If you are interested in the implementation of this application on **Cloud Foundry**, you can find it [here](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas).

The sample application has a focus on the topic of Sustainability and is called **Sustainable SaaS** (SusaaS). It allows **consumers** of your SaaS application to extend their SAP solutions like SAP S/4HANA with additional features provided by you as a SaaS **Provider**. 

- [Discover the Tutorial Target](#discover-the-tutorial-target)
  - [1. Tutorial Versions](#1-tutorial-versions)
  - [2. GitHub Repository](#2-github-repository)
  - [3. Tutorial Audience](#3-tutorial-audience)
  - [4. Focus Topics](#4-focus-topics)
  - [5. Obtain Support](#5-obtain-support)
  - [6. Provide Feedback](#6-provide-feedback)
  - [7. What's New](#7-whats-new)

In this simple scenario, the application allows you to assign users to multiple projects, in which they can assess dedicated circularity metrics of products imported from an SAP backend system like SAP S/4HANA. Besides the assessment of financial product sales data, the app also allows to import or to enter recycling data or product design information. See the following screenshots to get an idea of the application features. The details will be described in later parts of the tutorial (click to enlarge).

[<img src="./images/App_Overview.png" width="250" />](./images/App_Overview.png)
[<img src="./images/App_Launchpad.png" width="300" />](./images/App_Launchpad.png)
[<img src="./images/App_Assessment_01.png" width="300" />](./images/App_Assessment_01.png)
[<img src="./images/App_Assessment_02.png" width="300" />](./images/App_Assessment_02.png)

Due to the technical and theoretical complexity of the topic, the sample application shall not be seen or used in any kind for productive scenarios. Furthermore, it shall give you a lot of ideas and approaches for your own scenario implementation. We aim to cover as many topics as possible but not in the greatest depth that might justify productive usability. Below you can find a solution architecture diagram of the sample application. As you can see, the app contains a lot of services and tools which you will use during the course of this tutorial.

[<img src="./images/App_Architecture.png" width="600" />](./images/App_Architecture.png)

For the Kubernetes experts amongst you, please feel free to check out a more detailed and Kubernetes focused architecture below. If you are new to Kubernetes, don't worry as we will get you covered along the way. 

[<img src="./images/App_ArchitectureDetails.png" width="600" />](./images/App_ArchitectureDetails.png)


## 1. Tutorial Versions

This tutorial is structured in three major versions which are the **Basic** and **Advanced Version** of the SaaS application, complemented by additional **Expert Features**. This section will give you a brief overview of the versions and the requirements from an SAP BTP perspective. 

**Basic Version**

The **Basic Version** contains a very comprehensive version of the **SusaaS (Sustainable SaaS)** application, which can be deployed to your SAP BTP account using **free (tier) service plans** only. It is the foundation of the Advanced Version. The objective of this version is a SaaS application that can be deployed and tested by each and every developer in the community. It contains all major SaaS components (including an Inbound API) which are also part of the Advanced Version but excludes additional services (not available in Trial environments) which will be part of the next version. 

**Advanced Version**

The **Advanced** version adds further enterprise features to your SusaaS application like 
- a SAP S/4HANA backend pushing data to the SaaS APIs
- SAP API Management for managing your SaaS API
- users being centrally managed in SAP Identity Authentication Service

Some Advanced Version features are not available in the SAP BTP Trial environment like SAP Identity Authentication Service. For this reason, you will either need a Free Tier or SAP BTP enterprise account to use these services. The same applies to an SAP S/4HANA system, which you either need to bring yourself or you need to set up a [CAL instance](https://cal.sap.com/) which will cost you a few dollars per month (don't forget to stop your system if not in use :).

**Expert Features**

> **Important** - The Expert Features are still Work-in-Progress. The code and documentation are subject to change. 

The **Expert Features** contain a lot of additional expert knowledge for developers implementing SaaS applications on SAP BTP. The different topics of the Expert Features mostly result from experiences of the latest learnings and challenges of a Proof-of-Concept which was conducted with SAP partners. 

The topics include but are not limited to
 - Using a custom domain for your SaaS app 
 - Handling Tenant database containers
 - Providing your SaaS application in multiple regions
 - Applying extensions for your SaaS consumers
 - Integrating a customer's Identity Provider
 - Sending e-mails using Microsoft Graph
 - ...


## 2. GitHub Repository 

You can find the code of the sample application in the following sap-samples GitHub repository. You can either clone or fork the repository to your own GitHub account. 

https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas

The repository contains one branch [**main**](https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/tree/main/) for the tutorial documentation and source code.


## 3. Tutorial Audience

While the ecosystem of partner-built software for SAP On-Premise solutions has grown very well over the last decades, the available partner offerings and the interest in building solutions on SAP BTP starts to increase. A lot of SAP partners wonder how to port their existing developments to the cloud, to satisfy the demand of their existing customers moving to SAP BTP, or reach out to a much broader market than before. 

For that reason, this tutorial and the related topic of developing multitenant SaaS applications using the **SAP BTP, Kyma Runtime** is of great interest to partners and customers. It is supposed to give all interested stakeholders an introduction to the theoretical basics of Software as a Service on SAP BTP and provides a great codebase that can be used to kickstart your own implementation. Whereas a similar tutorial already exists for the **SAP BTP, Cloud Foundry runtime** ([see here](https://github.com/SAP-samples/btp-cf-cap-multitenant-susaas)), the current scenario makes use of the **SAP BTP, Kyma runtime**. 

There is no previous knowledge required for this tutorial, so all new but also experienced developers can set up the sample application. Nevertheless, a basic understanding of SAP BTP service offerings will help you grasp the ideas and concepts. 


## 4. Focus Topics

The main topics of the tutorial include:

* Understanding Software as a Service and multitenancy
* Discover how CAP supports developing multitenant apps
* Using SaaS-features of SAP Business Technology Platform
* Developing extensions for SAP solutions like S/4HANA based on 
  - the latest SAP CAP release features
  - a UI based on SAP Fiori Elements for OData v4 
  - SAP HANA Cloud as a powerful persistence layer
  - APIs for flexible Subscriber data integration
  - and many more...
* Expert topics to consider when building SaaS apps like
  - set up a custom domain for your app
  - deploying your app to multiple regions
  - handling Tenant database containers
  - approaching local development and hybrid testing
  - and many more...


## 5. Obtain Support

Please check if you find your issue described in the **Known Issues** section ([click here](../../../README.md#known-issues)). If not, please create a GitHub issue to get support or to report a bug (https://github.com/SAP-samples/btp-kyma-cap-multitenant-susaas/issues).


## 6. Provide Feedback

Nobody is perfect so please let us know how we can improve our samples so that you can take the most out of it! Feel free to share your feedback with us by creating an issue in GitHub as described above. This will help us to improve this tutorial and further content for you and other stakeholders. 


## 7. What's New

Check the latest release and **What's New** details in the respective card of the **Discover** tutorial version ([click here](../6-whats-new/README.md)).
