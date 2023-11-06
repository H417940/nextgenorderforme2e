import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

/// <reference types="cypress-xpath" />
Given("Login as {string}", (username: string) => {
    cy.visit("/cypress/security");
    cy.get("#form_user").type(username);
    cy.get("#form_login").click();
    cy.url().should('eq', Cypress.config().baseUrl + '/order-form/dashboard')
})

Then("Text Visible {string}", (text: string) => {
    cy.contains(text).should('be.visible');
})

Then("Text Not Visible {string}", (text: string) => {
    cy.contains(text).should('not.be.visible');
})

When("Click on {string}", (id: string) => { 
    cy.get(id).click();
})

Given("Load submitter info data", () => {
    cy.fixtureSubmitterInfoLoad();
})

Given("Load customer info data", () => {
    cy.fixtureCustomerInfoLoad();
     
})

Given("Load shipping info data", () => {
    cy.fixtureShippingInfoLoad();
})

Given("Load Order type new Non SAP Affiliate", () => {
    cy.fixtureorderTypeNewNonSapAffiliateLoad();
})

Given("Load Order type new SAP Project", () => {
    cy.fixtureorderTypeNewSapProjectLoad();
})

Given("Load Order type new SAP SVC Order", () => {
    cy.fixtureorderTypeNewSapSvcOrderLoad();
})

Then("Add product to cart New {string} qty {string}", (product: string, quantity: number) => {
    cy.addProductToCartNew(product, quantity);
})

Given("Load Order type expansions Non SAP Affiliate", () => {
    cy.fixtureorderTypeExpansionsNonSapAffiliateLoad();
})

Given("Load Order type expansions SAP Project", () => {
    cy.fixtureorderTypeExpansionsSapProjectLoad();
})

Given("Load Order type expansions SAP SVC Order", () => {
    cy.fixtureorderTypeExpansionsSapSvcOrderLoad();
})

Then("Add product to cart Expansions {string} qty {string} system number {string}", (product: string, quantity: number, systemNumber: string|null) => {
    cy.addProductToCartExpansions(product, quantity, systemNumber);
})

//downgrade
Given("Load Order type Downgrades Non SAP Affiliate", () => {
    cy.fixtureorderTypedowngradeNonSapAffiliateLoad();
})

Given("Load Order type Downgrades SAP Project", () => {
    cy.fixtureorderTypedowngradeSapProjectLoad();
})

Given("Load Order type Downgrades SAP SVC Order", () => {
    cy.fixtureorderTypedowngradeSapSvcOrderLoad();
})

Then("Add product to cart Downgrades From {string} To {string} system number {string}", (from: string, to: string, systemNumber: string|null) => {
    cy.addProductToCartDowngrades(from, to, systemNumber);
})
//SESP
Given("Load Order type SESP Upgrades Non SAP Affiliate", () => {
    cy.fixtureorderTypeSespUpgradesNonSapAffiliateLoad();
})

Given("Load Order type SESP Upgrades SAP SVC Order", () => {
    cy.fixtureorderTypeSespUpgradesSapSvcOrderLoad();
    
})

Then("Add product to cart SESP Upgrades From {string} To {string} with Media type {string} system number {string}", (from: string, to: string, mediaType: string, systemNumber: string|null) => {
    cy.addProductToCartSespUpgrade(from, to, mediaType, systemNumber);
})

//Non-SESP
Given("Load Order type non SESP Upgrades Non SAP Affiliate", () => {
    cy.fixtureorderTypeNonSespUpgradesNonSapAffiliateLoad();
})

Given("Load Order type non SESP Upgrades SAP Project", () => {
    cy.fixtureorderTypeNonSespUpgradesSapProjectLoad();
})

Given("Load Order type non SESP Upgrades SAP SVC Order", () => {
    cy.fixtureorderTypeNonSespUpgradesSapSvcOrderLoad();
})

Then("Add product to cart non SESP Upgrades From {string} To {string} with Media type {string} system number {string}", (from: string, to: string, mediaType: string, systemNumber: string|null) => {
    cy.addProductToCartNonSespUpgrade(from, to, mediaType, systemNumber);
})

//publish

Then("Order is published", () => {
    cy.orderIsPublished();
});

Then("Order is APPROVAL", () => {
    cy.orderIsApproval();
});


Then("Export dashboard order {string}", (row: number) => {
    cy.exportDashboardOrder(row);
});

Then("Import downloaded orders", () => {
    cy.importDownloadedOrders();
});

When("Save", () => {
    cy.nextStep("#save");
})

When("Publish", () => {
    cy.nextStep("#publish");
})

When("ASKAPPROVAL", () => {
    cy.nextStep("#Ask Approval");
})