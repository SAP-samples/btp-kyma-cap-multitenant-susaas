/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/susaas/ui/onboarding/model/models",
        "sap/m/library",
        "sap/m/Dialog",
        "sap/m/Button",
        "sap/m/Text"
    ],
    function (UIComponent, models, mobileLibrary, Dialog, Button, Text) {
        "use strict";

        const URLHelper = mobileLibrary.URLHelper;

        return UIComponent.extend("sap.susaas.ui.onboarding.Component", {
            metadata: {
                manifest: "json"
            },

            init: async function () {
                
                const startupParams = jQuery.sap.getUriParameters().mParams;
                UIComponent.prototype.init.apply(this, arguments);

                await this.getModel().callFunction("/tenant", {
                    method: "GET",
                    success: function(oData) { 
                        console.log(oData);
                        const bHidePopup = startupParams.hidePopup ? startupParams.hidePopup[0] === "true" : false;

                        if((Object.keys(oData).length === 0) || bHidePopup ){
                            this.getRouter().initialize();
                            this.setModel(models.createDeviceModel(), "device");
                        }else{
                            if (!this.oInitialDialog) {
                                this.oInitialDialog = new Dialog({
                                    title: "Tenant",
                                    content: new sap.m.List({
                                        items: [
                                            new sap.m.StandardListItem({
                                                title: oData.tenant.tenantSubdomain
                                            }) 
                                        ]
                                    }),
                                    buttons: [
                                        new Button({
                                            text: "Open Tenant",
                                            press: function () {
                                                URLHelper.redirect('https://' + oData.tenant.tenantSubdomain, false);
                                            }.bind(this)
                                        }),
                                        new Button({
                                            text: "Manage Tenant",
                                            press: function () {
                                                this.getRouter().initialize();
                                                this.setModel(models.createDeviceModel(), "device");
                                                this.oInitialDialog.close();
                                            }.bind(this)
                                        }),
                                    ]
                                });
                            }
                            this.oInitialDialog.open();
                        }
                    }.bind(this),

                    error: function(oError){ 
                        console.log(oError);
                    }
                });
            }
        });
    }
);