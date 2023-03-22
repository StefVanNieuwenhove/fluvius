describe("login", () => {
	it("login, correcte invoer", () => {
		//deze login command hebk geschreven in cypress/support/commands.js
		//Nu kunde die voor alle testen gebruiken
		cy.login("mvocoordinator", "Test123");
		cy.url().should("eq", "http://localhost:3000/")
		
	});
	it("login, foutieve invoer", () => {
		cy.login("manager", "test123");
		cy.get('.MuiSnackbar-root > .MuiPaper-root').should("be.visible");
		cy.url().should("eq", "http://localhost:3000/login")
	});
	it("login, geen gebruikersnaam", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("[data-cy=wachtwoord_input]").type("Test123");
		cy.get("[data-cy=login_button]").click();
		cy.url().should("eq", "http://localhost:3000/login")
	});
	it("login, geen wachtwoord", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("[data-cy=naam_input]").type("naam");
		cy.get("[data-cy=login_button]").click();
		cy.url().should("eq", "http://localhost:3000/login")
	});
});

