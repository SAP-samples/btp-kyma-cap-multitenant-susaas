# Optional - Undeploy the SaaS Application

> **Important** - If you are planning to setup the **Advanced Version** next, please consider this part of the tutorial optional!

If you want to undeploy/uninstall the SaaS application and all related services and resources from your Kmya Cluster please follow the steps below. 

- [Optional - Undeploy the SaaS Application](#optional---undeploy-the-saas-application)
  - [1. Undeploy the SaaS application](#1-undeploy-the-saas-application)
  - [2. Check successful Undeployment](#2-check-successful-undeployment)
  - [3. Further Information](#3-further-information)

> **Important** - For the undeployment of a SaaS solutions from your Kyma Cluster, it is **essential** that all existing subscriptions are deleted beforehand! Otherwise, existing service clones (e.g., created by XSUAA during the subscription dependency callbacks) will not be properly removed and corresponding Services Instances cannot be deleted without further ado!


## 1. Undeploy the SaaS application

1.1. Make sure you unsubscribed from the SaaS application in all **Consumer Subaccounts** before starting the undeployment. 

> **Hint** - You can check and also remove existing subscriptions using the Subscription Management Dashboard ([click here](https://help.sap.com/docs/btp/sap-business-technology-platform/using-subscription-management-dashboard) for details). 

1.2. Delete all API Service Broker instances from the **Consumer Subaccounts** before undeploying.

1.3. Ensure that your API Service Broker is unregistered ([click here](../10-unsubscribe-consumer-subaccount/README.md#2-check-successful-unsubscription)) from all **Consumer Subaccounts**. 

1.4. Uninstall the Helm Release of your SaaS application from the Kyma Cluster of your **Provider Subaccount** by running the following command. 

```sh
helm uninstall susaas -n <Namespace>
```

1.5. Optional - Undeploy the SAP Alert Notification Service Instance from the Kyma Cluster of your **Provider Subaccount** by running the following command. 

```sh
helm uninstall alert-notification -n <Namespace>
```


## 2. Check successful Undeployment

Check within your Kyma Cluster or in your SAP BTP Cockpit, whether if all Service Bindings, Service Instances, Secrets and Deployments. 

If there are any artifacts remaining in the Kyma Cluster of your Provider Subaccount, please delete them in the following sequence:

- Application workloads (Jobs, Deployments, ReplicaSets, Pods)
- SAP BTP Service Bindings
- SAP BTP Service Instances

Also double-check if all Istio-related objects as well as Network Policies and Config Maps have been successfully removed. 


## 3. Further Information

Please use the following links to find further information on the topics above:

* Currently no further information is available!