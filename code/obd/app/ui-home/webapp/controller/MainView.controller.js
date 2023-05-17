sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/library"
],function (Controller, JSONModel, mobileLibrary) {
        "use strict";

        const URLHelper = mobileLibrary.URLHelper;

        return Controller.extend("sap.susaas.ui.home.controller.MainView", {
            onInit: async function () { 
                this.oView = this.getView();

                this.getView().setModel(new JSONModel({
                    sCustomHost: null
                }), 'viewModel');

                const customHost = this._getCookie('x-custom-host');
                
                if(customHost){ 
                    this.getModel('viewModel').setProperty('/sCustomHost', customHost );
                };
            },

            onPressLoginRegister: function(){
                URLHelper.redirect(window.location.protocol + "//" + window.location.host + '/login', false);
            },

            onPressManageTenant: function(){
                URLHelper.redirect(window.location.protocol + "//" + window.location.host + '/sapsusaasuionboarding/', false);
            },

            onPressAccessTenant: function(){
                URLHelper.redirect(window.location.protocol + "//" + window.location.host + '/sapsusaasuipublicflp/', false);
            },

            _getCookie: (name) => (
                document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
            )
        });
    }
);