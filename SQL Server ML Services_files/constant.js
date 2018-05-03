define(["require", "exports", "../services/configService"], function (require, exports, configService) {
    exports.tagsList = [
        'Churn',
        'Retail',
        'Finance',
        'Insurance',
        'Travel',
        'Manufacturing',
        'Predictive Maintenance',
        'OLS Regression',
        'Logistic Regression',
        'K-Means',
        'Neural Network',
        'Deep NN',
        'Decision Tree',
        'Random Forest',
        'Decision Jungle',
        'SVM',
        'Support Vector Machine',
        'PCA',
        'Classification',
        'Regression',
        'Clustering',
        'Ensemble',
        'Anomaly Detection',
        'Forecasting',
        'Parameter Sweep',
        'Cross-validation',
        'Feature Selection',
        'Visualization',
        'Monte Carlo',
        'Recommendation',
        'Collaborative Filtering',
        'R',
        'SQL',
        'Python',
        'Time Series',
        'Hadoop',
        'Hive'
    ];
    exports.stockImages = [
        { category: "1", url: "Gallery_StockImages_AdTargeting.svg" },
        { category: "1", url: "Gallery_StockImages_Aerospace.svg" },
        { category: "1", url: "Gallery_StockImages_Agriculture.svg" },
        { category: "1", url: "Gallery_StockImages_AnomalyDetection.svg" },
        { category: "1", url: "Gallery_StockImages_BinaryClassification.svg" },
        { category: "1", url: "Gallery_StockImages_Construction.svg" },
        { category: "1", url: "Gallery_StockImages_CustomerChurnAnalysis.svg" },
        { category: "1", url: "Gallery_StockImages_DecisionForest.svg" },
        { category: "1", url: "Gallery_StockImages_DecisionTree.svg" },
        { category: "1", url: "Gallery_StockImages_Education.svg" },
        { category: "1", url: "Gallery_StockImages_EnergyUtility.svg" },
        { category: "1", url: "Gallery_StockImages_EquipmentMonitoring.svg" },
        { category: "1", url: "Gallery_StockImages_Finance.svg" },
        { category: "1", url: "Gallery_StockImages_Forecasting.svg" },
        { category: "1", url: "Gallery_StockImages_FraudDetection.svg" },
        { category: "1", url: "Gallery_StockImages_General.svg" },
        { category: "1", url: "Gallery_StockImages_GeneralStats.svg" },
        { category: "1", url: "Gallery_StockImages_GovernmentPublicService.svg" },
        { category: "1", url: "Gallery_StockImages_Healthcare.svg" },
        { category: "1", url: "Gallery_StockImages_HypothesisTesting.svg" },
        { category: "1", url: "Gallery_StockImages_ImageRecognition.svg" },
        { category: "1", url: "Gallery_StockImages_KMeanClustering.svg" },
        { category: "1", url: "Gallery_StockImages_LinearRegression.svg" },
        { category: "1", url: "Gallery_StockImages_LogisticRegression.svg" },
        { category: "1", url: "Gallery_StockImages_Manufacturer.svg" },
        { category: "1", url: "Gallery_StockImages_MarketingAdvertising.svg" },
        { category: "1", url: "Gallery_StockImages_Media.svg" },
        { category: "1", url: "Gallery_StockImages_MulticlassClassification.svg" },
        { category: "1", url: "Gallery_StockImages_NeuralNetwork.svg" },
        { category: "1", url: "Gallery_StockImages_Pharma.svg" },
        { category: "1", url: "Gallery_StockImages_Recommendations.svg" },
        { category: "1", url: "Gallery_StockImages_Retail.svg" },
        { category: "1", url: "Gallery_StockImages_SentimentAnalysis.svg" },
        { category: "1", url: "Gallery_StockImages_SpamFiltering.svg" },
        { category: "1", url: "Gallery_StockImages_Sports.svg" },
        { category: "1", url: "Gallery_StockImages_SupportVectorMachine.svg" },
        { category: "1", url: "Gallery_StockImages_Technology.svg" },
        { category: "1", url: "Gallery_StockImages_TextAnalysis.svg" },
        { category: "1", url: "Gallery_StockImages_TravelLeisure.svg" }
    ].map(function (imgInfo) {
        return {
            category: imgInfo.category,
            url: configService.stockImagesUrl + '/' + imgInfo.url
        };
    });
    exports.availableFilterEntities = [
        configService.indexFilterApi,
        configService.indexFilterExperiment,
        configService.indexFilterCollection,
        configService.indexFilterCompetition,
        configService.indexFilterNotebook,
        configService.indexFilterSolution,
        configService.indexFilterTutorial,
        configService.indexFilterClassroom,
        configService.indexFilterVideo,
        configService.indexFilterWebinar,
        configService.indexFilterModule,
        configService.indexFilterProject
    ].filter(function (value) {
        return (value === configService.indexFilterApi ||
            value === configService.indexFilterExperiment ||
            (configService.notebookIsEnabled && value === configService.indexFilterNotebook) ||
            (configService.solutionIsEnabled && value === configService.indexFilterSolution) ||
            (configService.tutorialIsEnabled && value === configService.indexFilterTutorial) ||
            (configService.collectionEnabled && value === configService.indexFilterCollection) ||
            (configService.competitionIsEnabled && value === configService.indexFilterCompetition) ||
            (configService.classroomIsEnabled && value === configService.indexFilterClassroom) ||
            (configService.videoIsEnabled && value === configService.indexFilterVideo) ||
            (configService.webinarIsEnabled && value === configService.indexFilterWebinar) ||
            (configService.moduleIsEnabled && value === configService.indexFilterModule)) ||
            (configService.projectIsEnabled && value === configService.indexFilterProject);
    });
    exports.bigDeviceItemsPerPage = 20;
    exports.mediumDeviceItemsPerPage = 18;
    exports.mediumDeviceViewPort = 1124;
    exports.smallDeviceItemsPerPage = 10;
    exports.smallDeviceViewPort = 655;
    exports.facetTypeCategory = "categories";
    exports.facetTypeIndustry = "industry";
    exports.facetTypeVertical = "vertical";
    exports.facetTypeLevel = "level";
    (function (StatusCode) {
        StatusCode[StatusCode["OK"] = 200] = "OK";
        StatusCode[StatusCode["PreconditionRequired"] = 428] = "PreconditionRequired";
        StatusCode[StatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
        StatusCode[StatusCode["UnknownError"] = 520] = "UnknownError";
    })(exports.StatusCode || (exports.StatusCode = {}));
    var StatusCode = exports.StatusCode;
    ;
    exports.publishingOwnerType = {
        Company: 'Company',
        User: 'User'
    };
    exports.industryLandingImageUrl = '/images/sublanding-header-bg-industries.png';
    exports.industryLandingCss = 'industries-intro';
    exports.industryLandingSvg = '<svg class="iconSvg svg-icon-industry" ><use xlink:href ="#industry" / >< / svg>';
});
