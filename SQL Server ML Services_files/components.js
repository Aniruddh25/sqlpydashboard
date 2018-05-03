define(["require", "exports", 'knockout'], function (require, exports, ko) {
    var Components = (function () {
        function Components() {
        }
        Object.defineProperty(Components, "list", {
            get: function () {
                return [
                    {
                        name: 'home-page',
                        viewModel: { require: 'src/components/home-page/home' },
                        template: { require: 'text!src/components/home-page/home.html' }
                    },
                    {
                        name: 'marketplace-progress-bar',
                        viewModel: { require: 'src/components/marketplaceProgressBar/marketplaceProgressBar' },
                        template: { require: 'text!src/components/marketplaceProgressBar/marketplaceProgressBar.html' }
                    },
                    {
                        name: 'mp-webservice-subscription-area',
                        viewModel: { require: 'src/components/mpWebServiceSubscription-area/mpWebServiceSubscriptionArea' },
                        template: { require: 'text!src/components/mpWebServiceSubscription-area/mpWebServiceSubscriptionArea.html' }
                    },
                    {
                        name: 'competition-steps-dialog',
                        viewModel: { require: 'src/components/competitionStepsDialog/competitionStepsDialog' },
                        template: { require: 'text!src/components/competitionStepsDialog/competitionStepsDialog.html' }
                    },
                    {
                        name: 'modal-dialog',
                        viewModel: { require: 'src/components/modal-dialog/modal-dialog' },
                        template: { require: 'text!src/components/modal-dialog/modal-dialog.html' }
                    },
                    {
                        name: 'browse-page',
                        viewModel: { require: 'src/components/browse-page/browse' },
                        template: { require: 'text!src/components/browse-page/browse.html' }
                    },
                    {
                        name: 'author-page',
                        viewModel: { require: 'src/components/author-page/author' },
                        template: { require: 'text!src/components/author-page/author.html' }
                    },
                    {
                        name: 'detail-page',
                        viewModel: { require: 'src/components/detail-page/detail' },
                        template: { require: 'text!src/components/detail-page/detail.html' }
                    },
                    {
                        name: 'experiment-card',
                        viewModel: { require: 'src/components/experiment-card/card' },
                        template: { require: 'text!src/components/experiment-card/card.html' }
                    },
                    {
                        name: 'rating',
                        viewModel: { require: 'src/components/rating/rating' },
                        template: { require: 'text!src/components/rating/rating.html' }
                    },
                    {
                        name: 'search-bar',
                        viewModel: { require: 'src/components/search-bar/search-bar' },
                        template: { require: 'text!src/components/search-bar/search-bar.html' }
                    },
                    {
                        name: 'entity-creator',
                        viewModel: { require: 'src/components/entity-creator/entityCreator' },
                        template: { require: 'text!src/components/entity-creator/entityCreator.html' }
                    },
                    {
                        name: 'pager',
                        viewModel: { require: 'src/components/pager/pager' },
                        template: { require: 'text!src/components/pager/pager.html' }
                    },
                    {
                        name: 'check-list',
                        viewModel: { require: 'src/components/checkList/checkList' },
                        template: { require: 'text!src/components/checkList/checkList.html' }
                    },
                    {
                        name: 'grouped-check-list',
                        viewModel: { require: 'src/components/groupedCheckList/groupedCheckList' },
                        template: { require: 'text!src/components/groupedCheckList/groupedCheckList.html' }
                    },
                    {
                        name: 'filter-list',
                        viewModel: { require: 'src/components/filterList/filterList' },
                        template: { require: 'text!src/components/filterList/filterList.html' }
                    },
                    {
                        name: 'filter-sidebar',
                        viewModel: { require: 'src/components/filterSidebar/filterSidebar' },
                        template: { require: 'text!src/components/filterSidebar/filterSidebar.html' }
                    },
                    {
                        name: 'sharing',
                        viewModel: { require: 'src/components/sharing/sharing' },
                        template: { require: 'text!src/components/sharing/sharing.html' }
                    },
                    {
                        name: 'sharing-menu',
                        viewModel: { require: 'src/components/sharing/sharing' },
                        template: { require: 'text!src/components/sharing/sharingMenu.html' }
                    },
                    {
                        name: 'mobile-filter',
                        viewModel: { require: 'src/components/mobileFilter/mobileFilter' },
                        template: { require: 'text!src/components/mobileFilter/mobileFilter.html' }
                    },
                    {
                        name: 'report-abuse',
                        viewModel: { require: 'src/components/reportAbuse/reportAbuse' },
                        template: { require: 'text!src/components/reportAbuse/reportAbuse.html' }
                    },
                    {
                        name: 'captcha',
                        viewModel: { require: 'src/components/captcha/captcha' },
                        template: { require: 'text!src/components/captcha/captcha.html' }
                    },
                    {
                        name: 'message-dialog',
                        viewModel: { require: 'src/components/messageDialog/messageDialog' },
                        template: { require: 'text!src/components/messageDialog/messageDialog.html' }
                    },
                    {
                        name: 'preview-overlay',
                        viewModel: { require: 'src/components/solutionPreview/solutionPreview' },
                        template: { require: 'text!src/components/solutionPreview/solutionPreview.html' }
                    },
                    {
                        name: 'demo-overlay',
                        viewModel: { require: 'src/components/solutionDemo/solutionDemo' },
                        template: { require: 'text!src/components/solutionDemo/solutionDemo.html' }
                    },
                    {
                        name: 'tags-editor',
                        viewModel: { require: 'src/components/tagsEditor/tagsEditor' },
                        template: { require: 'text!src/components/tagsEditor/tagsEditor.html' }
                    },
                    {
                        name: 'links-editor',
                        viewModel: { require: 'src/components/linksEditor/linksEditor' },
                        template: { require: 'text!src/components/linksEditor/linksEditor.html' }
                    },
                    {
                        name: 'learning-info',
                        viewModel: { require: 'src/components/learningInfoTable/learningInfoTable' },
                        template: { require: 'text!src/components/learningInfoTable/learningInfoTable.html' }
                    },
                    {
                        name: 'services-editor',
                        viewModel: { require: 'src/components/servicesEditor/servicesEditor' },
                        template: { require: 'text!src/components/servicesEditor/servicesEditor.html' }
                    },
                    {
                        name: 'textline-editor',
                        viewModel: { require: 'src/components/textEditor/textEditor' },
                        template: { require: 'text!src/components/textEditor/textlineEditor.html' }
                    },
                    {
                        name: 'textarea-editor',
                        viewModel: { require: 'src/components/textEditor/textEditor' },
                        template: { require: 'text!src/components/textEditor/textareaEditor.html' }
                    },
                    {
                        name: 'markdown-editor',
                        viewModel: { require: 'src/components/markdownEditor/markdownEditor' },
                        template: { require: 'text!src/components/markdownEditor/markdownEditor.html' }
                    },
                    {
                        name: 'button-editor',
                        viewModel: { require: 'src/components/buttonEditor/buttonEditor' },
                        template: { require: 'text!src/components/buttonEditor/buttonEditor.html' }
                    },
                    {
                        name: 'industry-editor',
                        viewModel: { require: 'src/components/industryEditor/industryEditor' },
                        template: { require: 'text!src/components/industryEditor/industryEditor.html' }
                    },
                    {
                        name: 'notebook-preview',
                        viewModel: { require: 'src/components/notebookPreview/notebookPreview' },
                        template: { require: 'text!src/components/notebookPreview/notebookPreview.html' }
                    },
                    {
                        name: 'markdown-div',
                        viewModel: { require: 'src/components/markdown-div/markdownDiv' },
                        template: { require: 'text!src/components/markdown-div/markdownDiv.html' }
                    },
                    {
                        name: 'competition-details',
                        viewModel: { require: 'src/components/competition-details/competitionDetails' },
                        template: { require: 'text!src/components/competition-details/competitionDetails.html' }
                    },
                    {
                        name: 'space-limited-text',
                        viewModel: { require: 'src/components/space-limited-text/spaceLimitedText' },
                        template: { require: 'text!src/components/space-limited-text/spaceLimitedText.html' }
                    },
                    {
                        name: 'accordion-header',
                        viewModel: { require: 'src/components/accordion-header/accordionHeader' },
                        template: { require: 'text!src/components/accordion-header/accordionHeader.html' }
                    },
                    {
                        name: 'image-editor',
                        viewModel: { require: 'src/components/imageEditor/imageEditor' },
                        template: { require: 'text!src/components/imageEditor/imageEditor.html' }
                    },
                    {
                        name: 'edit-buttons-group',
                        viewModel: { require: 'src/components/editButtonsGroup/editButtonsGroup' },
                        template: { require: 'text!src/components/editButtonsGroup/editButtonsGroup.html' }
                    },
                    {
                        name: 'lock-indicator',
                        viewModel: { require: 'src/components/lockIndicator/lockIndicator' },
                        template: { require: 'text!src/components/lockIndicator/lockIndicator.html' }
                    },
                    {
                        name: 'avatar-image',
                        viewModel: { require: 'src/components/avatarImage/avatarImage' },
                        template: { require: 'text!src/components/avatarImage/avatarImage.html' }
                    },
                    {
                        name: 'tabbar',
                        viewModel: { require: 'src/components/tabbar/tabbar' },
                        template: { require: 'text!src/components/tabbar/tabbar.html' }
                    },
                    {
                        name: 'wizard',
                        viewModel: { require: 'src/components/wizard/wizard' },
                        template: { require: 'text!src/components/wizard/wizard.html' }
                    },
                    {
                        name: 'entity-creator-wizard',
                        viewModel: { require: 'src/components/entity-creator-wizard/entityCreatorWizard' },
                        template: { require: 'text!src/components/entity-creator-wizard/entityCreatorWizard.html' }
                    },
                    {
                        name: 'markdownarea',
                        viewModel: { require: 'src/components/markdownArea/markdownArea' },
                        template: { require: 'text!src/components/markdownArea/markdownArea.html' }
                    },
                    {
                        name: 'createEntityDetails',
                        viewModel: { require: 'src/components/createEntitySteps/createEntitySteps' },
                        template: { require: 'text!src/components/createEntitySteps/createEntityDetails.html' }
                    },
                    {
                        name: 'createEntityImage',
                        viewModel: { require: 'src/components/createEntitySteps/createEntitySteps' },
                        template: { require: 'text!src/components/createEntitySteps/createEntityImage.html' }
                    },
                    {
                        name: 'createEntitySettings',
                        viewModel: { require: 'src/components/createEntitySteps/createEntitySteps' },
                        template: { require: 'text!src/components/createEntitySteps/createEntitySettings.html' }
                    },
                    {
                        name: 'createEntitySpecificSettings',
                        viewModel: { require: 'src/components/createEntitySteps/createEntitySteps' },
                        template: { require: 'text!src/components/createEntitySteps/createEntitySpecificSettings.html' }
                    },
                    {
                        name: 'createEntityLearningDetails',
                        viewModel: { require: 'src/components/createEntitySteps/createEntitySteps' },
                        template: { require: 'text!src/components/createEntitySteps/createEntityLearningDetails.html' }
                    },
                    {
                        name: 'createEntityLearningAddress',
                        viewModel: { require: 'src/components/createEntitySteps/createEntitySteps' },
                        template: { require: 'text!src/components/createEntitySteps/createEntityLearningAddress.html' }
                    },
                    {
                        name: 'sortable-list',
                        viewModel: { require: 'src/components/sortableList/sortableList' },
                        template: { require: 'text!src/components/sortableList/sortableList.html' }
                    },
                    {
                        name: 'collection-items-editor',
                        viewModel: { require: 'src/components/collectionItemsEditor/collectionItemsEditor' },
                        template: { require: 'text!src/components/collectionItemsEditor/collectionItemsEditor.html' }
                    },
                    {
                        name: 'list-item',
                        viewModel: { require: 'src/components/listItem/listItem' },
                        template: { require: 'text!src/components/listItem/listItem.html' }
                    },
                    {
                        name: 'edit-list-item',
                        viewModel: { require: 'src/components/editListItem/editListItem' },
                        template: { require: 'text!src/components/editListItem/editListItem.html' }
                    },
                    {
                        name: 'deleted-list-item',
                        viewModel: { require: 'src/components/deletedListItem/deletedListItem' },
                        template: { require: 'text!src/components/deletedListItem/deletedListItem.html' }
                    },
                    {
                        name: 'addcollectionitem-btn',
                        viewModel: { require: 'src/components/addCollectionItemBtn/addCollectionItemBtn' },
                        template: { require: 'text!src/components/addCollectionItemBtn/addCollectionItemBtn.html' }
                    },
                    {
                        name: 'add-item-to-collection',
                        viewModel: { require: 'src/components/addItemToCollection/addItemToCollection' },
                        template: { require: 'text!src/components/addItemToCollection/addItemToCollection.html' }
                    },
                    {
                        name: 'entities-strip',
                        viewModel: { require: 'src/components/entities-Strip/entitiesStrip' },
                        template: { require: 'text!src/components/entities-Strip/entitiesStrip.html' }
                    },
                    {
                        name: 'industry-strip',
                        viewModel: { require: 'src/components/industry-Strip/industryStrip' },
                        template: { require: 'text!src/components/industry-Strip/industryStrip.html' }
                    },
                    {
                        name: 'industrylandingpage-strip',
                        viewModel: { require: 'src/components/industryLandingPage-strip/industryLandingPageStrip' },
                        template: { require: 'text!src/components/industryLandingPage-strip/industryLandingPageStrip.html' }
                    },
                    {
                        name: 'industry-card',
                        viewModel: { require: 'src/components/industryCard/industryCard' },
                        template: { require: 'text!src/components/industryCard/industryCard.html' }
                    },
                    {
                        name: 'image-tile',
                        viewModel: { require: 'src/components/image-tile/imageTile' },
                        template: { require: 'text!src/components/image-tile/imageTile.html' }
                    },
                    {
                        name: 'landing',
                        viewModel: { require: 'src/components/landing/landing' },
                        template: { require: 'text!src/components/landing/landing.html' }
                    },
                    {
                        name: 'mainLanding-page',
                        viewModel: { require: 'src/components/mainLanding-page/mainLanding' },
                        template: { require: 'text!src/components/mainLanding-page/mainLanding.html' }
                    },
                    {
                        name: 'solutions-landing-page',
                        viewModel: { require: 'src/components/solutionsLanding-page/solutionsLanding' },
                        template: { require: 'text!src/components/solutionsLanding-page/solutionsLanding.html' }
                    },
                    {
                        name: 'experiments-landing-page',
                        viewModel: { require: 'src/components/experimentsLanding/experimentsLanding' },
                        template: { require: 'text!src/components/experimentsLanding/experimentsLanding.html' }
                    },
                    {
                        name: 'mlapis-landing-page',
                        viewModel: { require: 'src/components/mlapisLanding-page/mlapisLanding' },
                        template: { require: 'text!src/components/mlapisLanding-page/mlapisLanding.html' }
                    },
                    {
                        name: 'tutorials-landing-page',
                        viewModel: { require: 'src/components/tutorialsLanding-page/tutorialsLanding' },
                        template: { require: 'text!src/components/tutorialsLanding-page/tutorialsLanding.html' }
                    },
                    {
                        name: 'competitions-landing-page',
                        viewModel: { require: 'src/components/competitionsLanding-page/competitionsLanding' },
                        template: { require: 'text!src/components/competitionsLanding-page/competitionsLanding.html' }
                    },
                    {
                        name: 'collections-landing-page',
                        viewModel: { require: 'src/components/collectionsLanding-page/collectionsLanding' },
                        template: { require: 'text!src/components/collectionsLanding-page/collectionsLanding.html' }
                    },
                    {
                        name: 'notebooks-landing-page',
                        viewModel: { require: 'src/components/notebooksLanding-page/notebooksLanding' },
                        template: { require: 'text!src/components/notebooksLanding-page/notebooksLanding.html' }
                    },
                    {
                        name: 'industries-landing-page',
                        viewModel: { require: 'src/components/industriesLanding-page/industriesLanding' },
                        template: { require: 'text!src/components/industriesLanding-page/industriesLanding.html' }
                    },
                    {
                        name: 'industry-publicsector-landing-page',
                        viewModel: { require: 'src/components/industryPublicSectorLanding-page/industryPublicSectorLanding' },
                        template: { require: 'text!src/components/industryPublicSectorLanding-page/industryPublicSectorLanding.html' }
                    },
                    {
                        name: 'industry-retail-landing-page',
                        viewModel: { require: 'src/components/industryRetailLanding-page/industryRetailLanding' },
                        template: { require: 'text!src/components/industryRetailLanding-page/industryRetailLanding.html' }
                    },
                    {
                        name: 'industry-manufacturing-landing-page',
                        viewModel: { require: 'src/components/industryManufacturingLanding-page/industryManufacturingLanding' },
                        template: { require: 'text!src/components/industryManufacturingLanding-page/industryManufacturingLanding.html' }
                    },
                    {
                        name: 'industry-banking-landing-page',
                        viewModel: { require: 'src/components/industryBankingLanding-page/industryBankingLanding' },
                        template: { require: 'text!src/components/industryBankingLanding-page/industryBankingLanding.html' }
                    },
                    {
                        name: 'industry-healthcare-landing-page',
                        viewModel: { require: 'src/components/industryHealthcareLanding-page/industryHealthcareLanding' },
                        template: { require: 'text!src/components/industryHealthcareLanding-page/industryHealthcareLanding.html' }
                    },
                    {
                        name: 'learning-landing-page',
                        viewModel: { require: 'src/components/learningLanding-page/learningLanding' },
                        template: { require: 'text!src/components/learningLanding-page/learningLanding.html' }
                    },
                    {
                        name: 'module-landing-page',
                        viewModel: { require: 'src/components/moduleLanding-page/moduleLanding' },
                        template: { require: 'text!src/components/moduleLanding-page/moduleLanding.html' }
                    },
                    {
                        name: 'project-landing-page',
                        viewModel: { require: 'src/components/projectsLanding-page/projectsLanding' },
                        template: { require: 'text!src/components/projectsLanding-page/projectsLanding.html' }
                    },
                    {
                        name: 'test-fly',
                        viewModel: { require: 'src/components/testFly/testFly' },
                        template: { require: 'text!src/components/testFly/testFly.html' }
                    },
                    {
                        name: 'hero-block',
                        viewModel: { require: 'src/components/heroBlock/heroBlock' },
                        template: { require: 'text!src/components/heroBlock/heroBlock.html' }
                    },
                    {
                        name: 'intro-strip',
                        viewModel: { require: 'src/components/introStrip/introStrip' },
                        template: { require: 'text!src/components/introStrip/introStrip.html' }
                    },
                    {
                        name: 'related-items',
                        viewModel: { require: 'src/components/relatedItems/relatedItems' },
                        template: { require: 'text!src/components/relatedItems/relatedItems.html' }
                    },
                    {
                        name: 'parameters-container',
                        viewModel: { require: 'src/components/parametersContainer/parametersContainer' },
                        template: { require: 'text!src/components/parametersContainer/parametersContainer.html' }
                    },
                    {
                        name: 'usage-statistics',
                        viewModel: { require: 'src/components/usageStatistics/usageStatistics' },
                        template: { require: 'text!src/components/usageStatistics/usageStatistics.html' }
                    },
                    {
                        name: 'like-button',
                        viewModel: { require: 'src/components/likeButton/likeButton' },
                        template: { require: 'text!src/components/likeButton/likeButton.html' }
                    },
                    {
                        name: 'top-contributors',
                        viewModel: { require: 'src/components/topContributors/topContributors' },
                        template: { require: 'text!src/components/topContributors/topContributors.html' }
                    }
                ];
            },
            enumerable: true,
            configurable: true
        });
        Components.register = function (component) {
            if (!ko.components.isRegistered(component.name)) {
                ko.components.register(component.name, {
                    viewModel: component.viewModel,
                    template: component.template
                });
            }
        };
        return Components;
    })();
    return Components;
});
