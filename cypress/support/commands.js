// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import submitterInfo from '../fixtures/submitter_info.json'
import customerIndo from '../fixtures/customer_info.json'
import shippingInfo from '../fixtures/shipping_info.json'
import orderTypeNewNonSapAffiliate from '../fixtures/order_type_new_non_sap_affiliate.json'
import orderTypeNewSapProject from '../fixtures/order_type_new_sap_project.json'
import orderTypeNewSapSvcOrder from '../fixtures/order_type_new_sap_svc_order.json'
import orderTypeExpansionsNonSapAffiliate from '../fixtures/order_type_expansions_non_sap_affiliate.json'
import orderTypeExpansionsSapProject from '../fixtures/order_type_expansions_sap_project.json'
import orderTypeExpansionsSapSvcOrder from '../fixtures/order_type_expansions_sap_svc_order.json'
import orderTypeSespUpgradesNonSapAffiliate from '../fixtures/order_type_sesp_upgrades_non_sap_affiliate.json'
import orderTypeSespUpgradesSapSvcOrder from '../fixtures/order_type_sesp_upgrades_sap_svc_order.json'
import orderTypeNonSespUpgradesNonSapAffiliate from '../fixtures/order_type_non_sesp_upgrades_non_sap_affiliate.json'
import orderTypeNonSespUpgradesSapProject from '../fixtures/order_type_non_sesp_upgrades_sap_project.json'
import orderTypeNonSespUpgradesSapSvcOrder from '../fixtures/order_type_non_sesp_upgrades_sap_svc_order.json'
import orderTypedowngradeNonSapAffiliate from '../fixtures/order_type_downgrades_non_sap_affiliate.json'
import orderTypedowngradeSapProject from '../fixtures/order_type_downgrades_sap_project.json'
import orderTypedowngradeSapSvcOrder from '../fixtures/order_type_downgrades_sap_svc_order.json'



Cypress.Commands.add('fixtureSubmitterInfoLoad', () => {
    cy.submitterInfoLoadCustom(
        submitterInfo.phone,
        submitterInfo.sap_customer_number,
        submitterInfo.lob
        );
})

Cypress.Commands.add('submitterInfoLoadCustom', (phone, sap_customer_number, lob) => {
    cy.get("#phone").type(phone);
    cy.get("#customerNumber > input").type(sap_customer_number).type("{Enter}");
    cy.get("#lob > input").type(lob).type("{Enter}");
})

Cypress.Commands.add('fixtureCustomerInfoLoad', () => {
    cy.customerInfoLoadCustom(
        customerIndo.country,
        customerIndo.siebel_sfdc_account_number );
})

Cypress.Commands.add('customerInfoLoadCustom', (country,siebel_sfdc_account_number) => {
    //cy.get("#accountName").type(end_user_company);
    //cy.get("#siteName").type(siebel_sfdc_site);
    //cy.get("#streetAddress > textarea").type(company_street_address);
       cy.get("#accountNumber").type(siebel_sfdc_account_number);
    cy.get("#country.ui.fluid.search.selection.dropdown").type(country).type("{Enter}");
    cy.get("#siebel-account-search.ui.small.button.primary").click()
    //cy.get("#city").type(city);
    //cy.get("#state").type(state);
       //cy.get("#postalCode").type(postal_code);
})

Cypress.Commands.add('fixtureShippingInfoLoad', () => {
    cy.shippingInfoLoadCustom(
        shippingInfo.ship_to_company_name,
        shippingInfo.name,
        shippingInfo.phone,
        shippingInfo.email_address_for_license_delivery
    );
})

Cypress.Commands.add('shippingInfoLoadCustom', (ship_to_company_name, name, phone, email_address_for_license_delivery) => {
    cy.get("#shipTo > input").type(ship_to_company_name).type("{Enter}");
    cy.get("#contactName").type(name);
    cy.get("#phone").type(phone);
    cy.get("#email").type(email_address_for_license_delivery);
})

Cypress.Commands.add('fixtureorderTypeNewNonSapAffiliateLoad', () => {
    cy.orderTypeCustom(
        orderTypeNewNonSapAffiliate.order_type,
        orderTypeNewNonSapAffiliate.payment_method,
        orderTypeNewNonSapAffiliate.master_level_asset,
        orderTypeNewNonSapAffiliate.purchase_order_number,
        null,
        null,
        null,
        null
    );
})

Cypress.Commands.add('fixtureorderTypeNewSapProjectLoad', () => {
    cy.orderTypeCustom(
        orderTypeNewSapProject.order_type,
        orderTypeNewSapProject.payment_method,
        orderTypeNewSapProject.master_level_asset,
        null,
        orderTypeNewSapProject.sap_project_number,
        null,
        null,
        null
    );
})

Cypress.Commands.add('fixtureorderTypeNewSapSvcOrderLoad', () => {
    cy.orderTypeCustom(
        orderTypeNewSapSvcOrder.order_type,
        orderTypeNewSapSvcOrder.payment_method,
        orderTypeNewSapSvcOrder.master_level_asset,
        null,
        null,
        orderTypeNewSapSvcOrder.sap_svc_order_number,
        null,
        null
    );
})

Cypress.Commands.add('orderTypeCustom', (order_type, payment_method, master_level_asset, purchase_order_number, sap_project_number, sap_svc_order_number,reason_for_downgrade) => {
    cy.get("#orderType > input").type(order_type).type("{Enter}");
    cy.contains("Order Form Type : " + order_type).should('be.visible');
    cy.get("#paymentMethod > input").type(payment_method).type("{Enter}");
    cy.get("#masterLevelAsset").type(master_level_asset);
    if (purchase_order_number !== null) {
        cy.get("#purchaseNumber").type(purchase_order_number);
    }
    if (sap_project_number !== null) {
        cy.get("#sapProjectNumber").type(sap_project_number);
    }
    if (sap_svc_order_number !== null) {
        cy.get("#sapSvcNumber").type(sap_svc_order_number);
    }
    if (reason_for_downgrade !== null){
        cy.get("#comment > textarea").type(reason_for_downgrade)
    }
})

Cypress.Commands.add('addProductToCartNew', (product, quantity) => {

    cy.intercept("POST", "/api/v1/**").as("nextGenApi");

    const product_class = ".product-name-" + product.replace(/\W/g, "-").toLowerCase();
    cy.get(product_class).should('exist').click();
    cy.get(".quantity_cart > div > input").clear();
    cy.get(".quantity_cart > div > input").type(quantity);
    cy.get("#add_cart").click();
    cy.wait("@nextGenApi").its('response.statusCode').should('equal', 201);
    cy.wait(1000);
})

Cypress.Commands.add('fixtureorderTypeExpansionsNonSapAffiliateLoad', () => {
    cy.orderTypeCustom(
        orderTypeExpansionsNonSapAffiliate.order_type,
        orderTypeExpansionsNonSapAffiliate.payment_method,
        orderTypeExpansionsNonSapAffiliate.master_level_asset,
        orderTypeExpansionsNonSapAffiliate.purchase_order_number,
        null,
        null,
        null,
        null
    );
})

Cypress.Commands.add('fixtureorderTypeExpansionsSapProjectLoad', () => {
    cy.orderTypeCustom(
        orderTypeExpansionsSapProject.order_type,
        orderTypeExpansionsSapProject.payment_method,
        orderTypeExpansionsSapProject.master_level_asset,
        null,
        orderTypeExpansionsSapProject.sap_project_number,
        null,
        null,
        null
    );
})

Cypress.Commands.add('fixtureorderTypeExpansionsSapSvcOrderLoad', () => {
    cy.orderTypeCustom(
        orderTypeExpansionsSapSvcOrder.order_type,
        orderTypeExpansionsSapSvcOrder.payment_method,
        orderTypeExpansionsSapSvcOrder.master_level_asset,
        null,
        null,
        orderTypeExpansionsSapSvcOrder.sap_svc_order_number,
        null,
        null
    );
})

Cypress.Commands.add('fixtureorderTypeSespUpgradesNonSapAffiliateLoad', () => {
    cy.orderTypeCustom(
        orderTypeSespUpgradesNonSapAffiliate.order_type,
        orderTypeSespUpgradesNonSapAffiliate.payment_method,
        orderTypeSespUpgradesNonSapAffiliate.master_level_asset,
        orderTypeSespUpgradesNonSapAffiliate.purchase_order_number,
        null,
        null,
        null
    );
})


Cypress.Commands.add('fixtureorderTypeSespUpgradesSapSvcOrderLoad', () => {
    cy.orderTypeCustom(
        orderTypeSespUpgradesSapSvcOrder.order_type,
        orderTypeSespUpgradesSapSvcOrder.payment_method,
        orderTypeSespUpgradesSapSvcOrder.master_level_asset,
        null,
        null,
        orderTypeSespUpgradesSapSvcOrder.sap_svc_order_number,
        null
    );
})

Cypress.Commands.add('addProductToCartExpansions', (product, quantity, systemNumber) => {

    cy.intercept("POST", "/api/v1/**").as("nextGenApi");

    const product_class = ".product-name-" + product.replace(/\W/g, "-").toLowerCase();
    cy.get(product_class).should('exist').click();
    if (systemNumber) {
        cy.get("#systemNumber").type(systemNumber);
    }
    cy.get(".quantity_cart > div > input").clear();
    cy.get(".quantity_cart > div > input").type(quantity);
    cy.get("#add_cart").click();
    cy.wait("@nextGenApi").its('response.statusCode').should('equal', 201);
    cy.wait(1000);
})

Cypress.Commands.add('orderIsPublished', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/order-form/dashboard')
    cy.get("table > .p-datatable-tbody > .p-datatable-row:nth-child(1) > td > div > a").should('have.class', 'status-PUBLISHED');
    cy.wait(3000);
});
Cypress.Commands.add('orderIsApproval', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/order-form/dashboard')
    cy.get("table > .p-datatable-tbody > .p-datatable-row:nth-child(1) > td > div > a").should('have.class', 'status-APPROVAL');
    cy.wait(3000);
});

Cypress.Commands.add('exportDashboardOrder', (row) => {
    cy.url().should('eq', Cypress.config().baseUrl + '/order-form/dashboard');

    cy.window().document().then((doc) => {
        cy.intercept("GET", "/order-form/export/*").as("downloadOrder");

        doc.addEventListener('click', () => {
            setTimeout(function () { doc.location.reload() }, 5000)
        });
        cy.get("table > .p-datatable-tbody > .p-datatable-row:nth-child(" + row + ") > td:nth-child(8) > div > a").click();
        cy.wait("@downloadOrder")
            .its('response.statusCode')
            .should('equal', 200);
    });
});

Cypress.Commands.add('importDownloadedOrders', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/order-form/dashboard');
    cy.intercept("POST", "/order-form/import").as("uploadOrder");
    const pattern = new RegExp(".json$")

    cy.task("scandir", Cypress.config().downloadsFolder)
        .then((files) => {
            files.forEach(file => {
                if (pattern.test(file)) {
                    cy.get("#import_order").click();
                    cy.get('input[type=file]').selectFile(Cypress.config().downloadsFolder + "/" + file, { force: true });
                    cy.get("#import").click();
                    cy.wait("@uploadOrder")
                        .its('response.statusCode')
                        .should('equal', 201);
                    cy.task("removeFile", Cypress.config().downloadsFolder + "/" + file);
                }
            });
        });
});

Cypress.Commands.add('fixtureorderTypeNonSespUpgradesNonSapAffiliateLoad', () => {
    cy.orderTypeCustom(
        orderTypeNonSespUpgradesNonSapAffiliate.order_type,
        orderTypeNonSespUpgradesNonSapAffiliate.payment_method,
        orderTypeNonSespUpgradesNonSapAffiliate.master_level_asset,
        orderTypeNonSespUpgradesNonSapAffiliate.purchase_order_number,
        null,
        null,
        null,
        null
    );
})


Cypress.Commands.add('fixtureorderTypeNonSespUpgradesSapProjectLoad', () => {
    cy.orderTypeCustom(
        orderTypeNonSespUpgradesSapProject.order_type,
        orderTypeNonSespUpgradesSapProject.payment_method,
        orderTypeNonSespUpgradesSapProject.master_level_asset,
        null,
        orderTypeNonSespUpgradesSapProject.sap_project_number,
        null,
        null,
        null
    );
})

Cypress.Commands.add('fixtureorderTypeNonSespUpgradesSapSvcOrderLoad', () => {
    cy.orderTypeCustom(
        orderTypeNonSespUpgradesSapSvcOrder.order_type,
        orderTypeNonSespUpgradesSapSvcOrder.payment_method,
        orderTypeNonSespUpgradesSapSvcOrder.master_level_asset,
        null,
        null,
        orderTypeNonSespUpgradesSapSvcOrder.sap_svc_order_number,
        null,
        null
    );
})

Cypress.Commands.add('fixtureorderTypedowngradeNonSapAffiliateLoad', () => {
    cy.orderTypeCustom(
        orderTypedowngradeNonSapAffiliate.order_type,
        orderTypedowngradeNonSapAffiliate.payment_method,
        orderTypedowngradeNonSapAffiliate.master_level_asset,
        orderTypedowngradeNonSapAffiliate.purchase_order_number,
        null,
        null,
        orderTypedowngradeNonSapAffiliate.reason_for_downgrade,
        null
    );
})

Cypress.Commands.add('fixtureorderTypedowngradeSapProjectLoad', () => {
    cy.orderTypeCustom(
        orderTypedowngradeSapProject.order_type,
        orderTypedowngradeSapProject.payment_method,
        orderTypedowngradeSapProject.master_level_asset,
        null,
        orderTypedowngradeSapProject.sap_project_number,
        null,
        orderTypedowngradeSapProject.reason_for_downgrade,
        null
    );
})



Cypress.Commands.add('fixtureorderTypedowngradeSapSvcOrderLoad', () => {
    cy.orderTypeCustom(
        orderTypedowngradeSapSvcOrder.order_type,
        orderTypedowngradeSapSvcOrder.payment_method,
        orderTypedowngradeSapSvcOrder.master_level_asset,
        null,
        null,
        orderTypedowngradeSapSvcOrder.sap_svc_order_number,
        orderTypedowngradeSapSvcOrder.reason_for_downgrade,
        null
    );
})


Cypress.Commands.add('addProductToCartDowngrades', (from, to, systemNumber) => {

    cy.intercept("POST", "/api/v1/**").as("nextGenApi");
    const product = from + " " + to;
        const product_class = ".move-name-" + product.replace(/\W/g, "-").toLowerCase();
    cy.get(product_class).click();

    if (systemNumber) {
        cy.get("#systemNumber").type(systemNumber);
    }
    cy.get("#add_cart").click();
    cy.wait("@nextGenApi").its('response.statusCode').should('equal', 201);
    cy.wait(1000);
})

Cypress.Commands.add('addProductToCartSespUpgrade', (from, to, mediaType, systemNumber) => {

    cy.intercept("POST", "/api/v1/**").as("nextGenApi");

    const product = from + " " + to + " " + mediaType;

    const product_class = ".move-name-" + product.replace(/\W/g, "-").toLowerCase();
    cy.get(product_class).click();

    if (systemNumber) {
        cy.get("#systemNumber").type(systemNumber);
    }
    cy.get("#add_cart").click();
    cy.wait("@nextGenApi").its('response.statusCode').should('equal', 201);
    cy.wait(1000);
})

Cypress.Commands.add('addProductToCartNonSespUpgrade', (from, to, mediaType, systemNumber) => {

    cy.intercept("POST", "/api/v1/**").as("nextGenApi");

    const product = from + " " + to + " " + mediaType;

    const product_class = ".move-name-" + product.replace(/\W/g, "-").toLowerCase();
    cy.get(product_class).click();

    if (systemNumber) {
        cy.get("#systemNumber").type(systemNumber);
    }
    cy.get("#add_cart").click();
    cy.wait("@nextGenApi").its('response.statusCode').should('equal', 201);
    cy.wait(1000);
})

Cypress.Commands.add('nextStep', (target) => {
    cy.wait(2000);
    cy.intercept("PUT", "/api/v1/**").as("submit");
    cy.get(target).click();
    cy.wait("@submit", {timeout: 10000}).its('response.statusCode').should('equal', 200);
})