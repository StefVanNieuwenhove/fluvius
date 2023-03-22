describe("mvo test, data from databse", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("show chart of'Quality education'", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiCardMedia-root').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiCardHeader-root').should("contain.text", "Sub Doelstelling 2");
        cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiCardHeader-root').should("contain.text", "Sub Doelstelling 3");
        cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiCardHeader-root').should("contain.text", "Sub Doelstelling 4");
        cy.get(':nth-child(4) > .MuiButtonBase-root > .MuiCardHeader-root').should("contain.text", "Sub Doelstelling 6");
    });
    it("show chart of Categorie 'Economic'", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiCardMedia-root').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
    });
});

describe("mvo navigate", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("navigate back to dashboard", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiCardMedia-root').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').should("be.visible");
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').click();
        cy.url().should("eq", "http://localhost:3000/")
    });
    it("navigate back to Categorie", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiCardMedia-root').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiToolbar-root > :nth-child(4)').should("be.visible");
        cy.get('.MuiToolbar-root > :nth-child(4)').click();
        cy.url().should("eq", "http://localhost:3000/categorie");
    });
});

describe("Rapporteren datasource", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it.only("create new rapport" , () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiGrid-container > .MuiGrid-root').click();
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiCardMedia-root').click();
        cy.get('[data-cy="bericht_input"]').type("test");
        cy.get('[data-cy="rapporteer_button"]').click();
    })
})