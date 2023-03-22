describe("Rollen aanpassen", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("rol manager template aanpassen, cate env en econ", () => {
        cy.get('.MuiButton-textInherit').should("be.visible");
        cy.get('.MuiButton-textInherit').click();
        cy.url().should("eq", "http://localhost:3000/roltemplate");
        cy.get('#rolselect-select').click();
        cy.get('.Mui-selected').click();
        cy.get('#rolselect-select').should("contain.text", "Manager");
        cy.get('.MuiGrid-container > :nth-child(3)').click();
        cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').click();
        cy.url().should("eq", "http://localhost:3000/");
    });
    it("rol Gebruiker template aanpassen, cate env en econ", () => {
        cy.get('.MuiButton-textInherit').should("be.visible");
        cy.get('.MuiButton-textInherit').click();
        cy.url().should("eq", "http://localhost:3000/roltemplate");
        cy.get('#rolselect-select').click();
        cy.get('[data-value="Gebruiker"]').click();
        cy.get('#rolselect-select').should("contain.text", "Gebruiker");
        cy.get('.MuiGrid-container > :nth-child(3)').click();
        cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').click();
        cy.url().should("eq", "http://localhost:3000/");
    });
    it("rol Directie template aanpassen, cat envr en econ", () => {
        cy.get('.MuiButton-textInherit').should("be.visible");
        cy.get('.MuiButton-textInherit').click();
        cy.url().should("eq", "http://localhost:3000/roltemplate");
        cy.get('#rolselect-select').click();
        cy.get('[data-value="Directie"]').click();
        cy.get('#rolselect-select').should("contain.text", "Directie");
        cy.get('.MuiGrid-container > :nth-child(3)').click();
        cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').click();
        cy.url().should("eq", "http://localhost:3000/");
    });
})