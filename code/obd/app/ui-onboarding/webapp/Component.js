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

            init: function () {
                
                UIComponent.prototype.init.apply(this, arguments);
                
                this.getRouter().initialize();
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);