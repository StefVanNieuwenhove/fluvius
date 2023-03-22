describe("Subsdg, data from database", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("show subsdg from sdg 'good health and well-being'", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > .MuiGrid-root').click();
    });
    it("show subsdg from sdg 'Quality eduaction'", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiGrid-container > .MuiGrid-root').click();
    });
    it("show subsdg from sdg 'No poverty'", () => {
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(1)').click();
    });
    it("show subsdg from sdg 'Zero hunger'", () => {
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
    });
});

describe("subsdg, navigatie", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("return to sdg", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > .MuiGrid-root').click();
        cy.get('.MuiToolbar-root > :nth-child(6)').click();
        cy.url().should("eq", "http://localhost:3000/sdg");
    });
    it("return to categorie", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > .MuiGrid-root').click();
        cy.get('.MuiToolbar-root > :nth-child(4)').click();
        cy.url().should("eq", "http://localhost:3000/categorie");
    });
    it("return to dashboard", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > .MuiGrid-root').click();
        cy.get('.MuiContainer-root > .MuiPaper-root > .MuiToolbar-root > :nth-child(2)').click();
        cy.url().should("eq", "http://localhost:3000/");
    });
});

