describe("sdg, data from database", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("show sdg of 'Good healt and well-being'", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-body1')
        .should("contain.text", "Good health and well-being");
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.css-1cndkqf-MuiToolbar-root > .MuiTypography-root').should("contain.text","SDG: Good health and well-being");
    });
    it("show sdg of 'Quality eduaction'", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-body1')
        .should("contain.text", "Quality education")
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.css-1cndkqf-MuiToolbar-root > .MuiTypography-root').should("contain.text", "SDG: Quality education");
    });
    it("show sdg of 'No poverty'", () => {
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-body1')
        .should("contain.text", "No poverty")
        cy.get('.MuiGrid-container > :nth-child(1)').click();
    });
    it.only("show sdg of 'Zero hunger'", () => {
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-body1')
        .should("contain.text", "Zero Hunger")
        cy.get('.MuiGrid-container > :nth-child(2)').click();
    });
});



describe("sdg navigatie", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("return back to categorie", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiToolbar-root > :nth-child(4)').click();
        cy.url().should("eq", "http://localhost:3000/categorie");
    });
});