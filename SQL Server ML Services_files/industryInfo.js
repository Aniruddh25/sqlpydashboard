define(["require", "exports", "../services/configService"], function (require, exports, configService) {
    var IndustryInfo = (function () {
        function IndustryInfo() {
        }
        IndustryInfo.constructIndustryByType = function (type) {
            var info = new IndustryInfo();
            switch (type) {
                case configService.indexIndustryFilterBanking:
                    info.title = "Banking";
                    info.description = "Find banking solutions such as predicting credit risk and monitoring for online fraud.";
                    info.detailDescription = "The Gallery contains many examples specific to the banking industry that can serve as models for the machine learning solutions you’re developing. These examples include predicting credit risk, monitoring for online fraud, and anticipating economic factors that can affect your customers and your business.";
                    info.landingPageUrl = configService.industryBankingLandingPageUrl;
                    info.imageUrl = "/images/Industry-banking-small.png";
                    info.tallImageUrl = "/images/Industry-banking-tall.png";
                    break;
                case configService.indexIndustryFilterManufacturing:
                    info.title = "Manufacturing";
                    info.description = "Find manufacturing solutions such as anticipating equipment maintenance and forecasting energy prices.";
                    info.detailDescription = "In your manufacturing business, you can use machine learning to keep systems running efficiently and economically. To help you get started, the Gallery contains examples of solutions such as predicting equipment maintenance needs and forecasting energy prices.";
                    info.landingPageUrl = configService.industryManufacturingLandingPageUrl;
                    info.imageUrl = "/images/Industry-manufacturing-small.png";
                    info.tallImageUrl = "/images/Industry-manufacturing-tall.png";
                    break;
                case configService.indexIndustryFilterRetail:
                    info.title = "Retail";
                    info.description = "Find retail solutions such as sales forecasting, predicting customer churn, and developing pricing models.";
                    info.detailDescription = "As you develop predictive solutions for your retail business, you can find many examples in the Gallery for areas such as sales forecasting, predicting customer churn, developing pricing models, classifying customers, and more.";
                    info.landingPageUrl = configService.industryRetailLandingPageUrl;
                    info.imageUrl = "/images/Industry-retail-small.png";
                    info.tallImageUrl = "/images/Industry-retail-tall.png";
                    break;
                case configService.indexIndustryFilterHealthcare:
                    info.title = "Healthcare";
                    info.description = "Find healthcare solutions such as detecting disease, and predicting hospital readmissions.";
                    info.detailDescription = "In the healthcare industry, maximizing patient care while minimizing costs is a complex task. Examples in the Gallery can help you develop machine learning solutions that can detect and predict disease, monitor patient activity to more efficiently deliver care, and predict hospital readmissions.";
                    info.landingPageUrl = configService.industryHealthcareLandingPageUrl;
                    info.imageUrl = "/images/Industry-healthcare-small.png";
                    info.tallImageUrl = "/images/Industry-healthcare-tall.png";
                    break;
                case configService.indexIndustryFilterPublicSector:
                    info.title = "Public Sector";
                    info.description = "Find public sector solutions such as detecting disease, and predicting hospital readmissions.";
                    info.detailDescription = "In the public sector, managing health care is a major cost factor. Examples in the Gallery can help you develop machine learning solutions that can detect and predict disease, monitor patient activity to more efficiently deliver care, and predict hospital readmissions.";
                    info.landingPageUrl = configService.industryPublicSectorLandingPageUrl;
                    info.imageUrl = "/images/Industry-publicsector-small.png";
                    info.tallImageUrl = "/images/Industry-publicsector-tall.png";
                    break;
                default:
                    return null;
            }
            return info;
        };
        IndustryInfo.getAllIndustries = function () {
            var industries = new Array();
            industries.push(IndustryInfo.constructIndustryByType(configService.indexIndustryFilterRetail));
            industries.push(IndustryInfo.constructIndustryByType(configService.indexIndustryFilterManufacturing));
            industries.push(IndustryInfo.constructIndustryByType(configService.indexIndustryFilterBanking));
            industries.push(IndustryInfo.constructIndustryByType(configService.indexIndustryFilterHealthcare));
            return industries;
        };
        return IndustryInfo;
    })();
    exports.IndustryInfo = IndustryInfo;
});
