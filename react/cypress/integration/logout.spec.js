describe("logout", () => {
	it("log out", () => {
		cy.login("mvocoordinator", "Test123");
		cy.get('[data-testid="LogoutIcon"]').click();
		cy.url().should("eq", "http://localhost:3000/login")
	});
});