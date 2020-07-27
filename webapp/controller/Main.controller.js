sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/BindingMode",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/suite/ui/commons/ChartContainer",
    "sap/suite/ui/commons/ChartContainerContent"
], function (Controller, BindingMode, JSONModel, ChartFormatter, Format, Filter, FilterOperator, ChartContainer, ChartContainerContent) {
	"use strict";

	return Controller.extend("corp.basf.ProjectCovid.controller.Main", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf br.sample.view.Main
		 */
		onInit: function () {
			
			this.adjustChartBox(this.getView(), "idVizFrame1", "Cell2");
			this.adjustChartBox(this.getView(), "idVizFrame2", "Cell3");
			this.adjustChartBox(this.getView(), "idVizFrame3", "Cell4");
			
			this.setPopOver();
			
			var sUrl = "https://coronavirus-19-api.herokuapp.com/countries";
			var oModel = new sap.ui.model.json.JSONModel(sUrl);
			this.getView().setModel(oModel, "allCountries");
			
			var aUrl = "https://coronavirus-19-api.herokuapp.com/countries/World";
			var aModel = new sap.ui.model.json.JSONModel(aUrl);
			this.getView().setModel(aModel, "allTests");
			
		},
		
		setPopOver: function(){
			
			var oVizFrame1 = this.oVizFrame1 = this.getView().byId("idVizFrame1");
			var oPopOverSick = this.getView().byId("idPopOverSick");
			oPopOverSick.connect(oVizFrame1.getVizUid());
			
			var oVizFrame2 = this.oVizFrame2 = this.getView().byId("idVizFrame2");
			var oPopOverRecovered = this.getView().byId("idPopOverRecovered");
			oPopOverRecovered.connect(oVizFrame2.getVizUid());
			
			var oVizFrame3 = this.oVizFrame3 = this.getView().byId("idVizFrame3");
			var oPopOverDeaths = this.getView().byId("idPopOverDeaths");
			oPopOverDeaths.connect(oVizFrame3.getVizUid());
			
		},
		
		onSearch: function (oEvent) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("country", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oTable = this.byId("idCountriesTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilters, "Application");

		},
		
		adjustChartBox: function(oView, sChartId, sBlockId){
			
			var oVizFrame = oView.byId(sChartId);
			var oChartContainerContent = new ChartContainerContent({
				content: [oVizFrame]
			});
			var oChartContainer = new ChartContainer({
				content: [oChartContainerContent]
			});
			
			oChartContainer.setShowFullScreen(true);
			oChartContainer.setAutoAdjustHeight(true);
			
			oView.byId(sBlockId).addContent(oChartContainer);
		},
		
		onNavToDetails: function(oEvent){
			var abc = "Teste";

			this.getRouter().navTo("CountryDetails", { objectId : abc });
		},
		
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf br.sample.view.Main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf br.sample.view.Main
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf br.sample.view.Main
		 */
		//	onExit: function() {
		//
		//	}

	});

});