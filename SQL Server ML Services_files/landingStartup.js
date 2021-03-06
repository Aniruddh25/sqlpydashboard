define(["require", "exports", "knockout", "src/services/stateService", "src/app/startup"], function (require, exports, ko, stateService, startup) {
    startup;
    stateService.addRoute('browse(.*)', 'browse-page', { pageKind: "browse" });
    stateService.addRoute('/', 'mainLanding-page');
    stateService.addRoute('testfly', 'test-fly');
    stateService.addRoute(/^\/solutions/i, 'solutions-landing-page', { pageKind: "solutionsLanding" });
    stateService.addRoute(/^\/experiments/i, 'experiments-landing-page', { pageKind: "experimentsLanding" });
    stateService.addRoute(/^\/machineLearningAPIs/i, 'mlapis-landing-page', { pageKind: "mlapisLanding" });
    stateService.addRoute(/^\/tutorials/i, 'tutorials-landing-page', { pageKind: "tutorialsLanding" });
    stateService.addRoute(/^\/competitions/i, 'competitions-landing-page', { pageKind: "competitionsLanding" });
    stateService.addRoute(/^\/collections/i, 'collections-landing-page', { pageKind: "collectionsLanding" });
    stateService.addRoute(/^\/notebooks/i, 'notebooks-landing-page', { pageKind: "notebooksLanding" });
    stateService.addRoute(/^\/industries\/publicsector/i, 'industry-publicsector-landing-page', { pageKind: "industryPublicSectorLanding" });
    stateService.addRoute(/^\/industries\/retail/i, 'industry-retail-landing-page', { pageKind: "industryRetailLanding" });
    stateService.addRoute(/^\/industries\/manufacturing/i, 'industry-manufacturing-landing-page', { pageKind: "industryManufacturingLanding" });
    stateService.addRoute(/^\/industries\/banking/i, 'industry-banking-landing-page', { pageKind: "industryBankingLanding" });
    stateService.addRoute(/^\/industries\/healthcare/i, 'industry-healthcare-landing-page', { pageKind: "industryHealthcareLanding" });
    stateService.addRoute(/^\/industries/i, 'industries-landing-page', { pageKind: "industriesLanding" });
    stateService.addRoute(/^\/learnings/i, 'learning-landing-page', { pageKind: "learningLanding" });
    stateService.addRoute(/^\/customModules/i, 'module-landing-page', { pageKind: "moduleLanding" });
    stateService.addRoute(/^\/projects/i, 'project-landing-page', { pageKind: "projectLanding" });
    stateService.run();
    ko.applyBindings({ route: stateService.currentRoute });
});
