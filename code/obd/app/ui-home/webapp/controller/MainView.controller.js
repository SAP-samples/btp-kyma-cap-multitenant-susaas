sap.ui.define([
    "./BaseController",
    "sap/m/library"
],function (Controller, mobileLibrary) {
        "use strict";

        const URLHelper = mobileLibrary.URLHelper;

        return Controller.extend("sap.susaas.ui.home.controller.MainView", {
            onInit: async function () { 
                this.oView = this.getView();
            },

            onPressLoginRegister: function(){
                URLHelper.redirect(window.location.protocol + "//" + window.location.host + '/login', false);
            }
        });
    }
);