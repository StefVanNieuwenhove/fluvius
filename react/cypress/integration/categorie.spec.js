describe("categorie test, data from database", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("show dashboard", () => {
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
        .should("contain", "Environment");
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
        .should("contain", "Economic");
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
        .should("contain", "Social");
    });
    it("show cat environment", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-body1')
        .should("contain", "Good health and well-being");
    });
    it("show cat economic", () => {
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-body1')
        .should("contain", "No poverty");
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-body1')
        .should("contain", "Zero Hunger");
    });
    it("show cat social", () => {
        cy.get('.MuiGrid-container > :nth-child(3)').click();
        // als er sdg zijn contrtoleren op dat een sdg de juiste naam bevat
    });
});

describe("Categorie navigatie", () => {
    beforeEach(() => {
        cy.login("mvocoordinator", "Test123");
    });
    it("show dasboard after checking cat environment", () => {
        cy.get('.MuiGrid-container > :nth-child(1)').click();
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').should("be.visible");
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').click();
        cy.url().should("eq", "http://localhost:3000/")
    });
    it("show dasboard after checking cat economic", () => {
        cy.get('.MuiGrid-container > :nth-child(2)').click();
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').should("be.visible");
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').click();
        cy.url().should("eq", "http://localhost:3000/")
    });
    it("show dasboard after checking cat social", () => {
        cy.get('.MuiGrid-container > :nth-child(3)').click();
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').should("be.visible");
        cy.get('.MuiPaper-elevation4 > .MuiToolbar-root > :nth-child(2)').click();
        cy.url().should("eq", "http://localhost:3000/")
    });
});

// test button aanpassen
describe("categorie template", () => {
    it("", () => {
        cy.login("mvocoordinator", "Test123");
        cy.get('.css-1cndkqf-MuiToolbar-root > .MuiButton-root').click();
    })
})