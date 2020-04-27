//context() = describe()
//specify() = it()
//assertions: describe the desired state of your elements, your objects, and your applications. use your assertions, ("gaurds"), to describe what your application should look like, and cypress will automatically block, wait, and retry until it reaches the state.

//***Each API Command documents its behavior with assertions - such as how it retries or waits for assertions to pass.  */
describe("Test Form", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3001/");
  });
  it("add test to inputs and submit form", function () {
    cy.get('input[name="name"]').type("ranim").should("have.value", "ranim");
    cy.get('input[name="email"]').type("email@email.com").should('have.value', "email@email.com");
    cy.get('input[name="password"]').type("password").should('have.value', "password");
    cy.get('[type="checkbox"]').check().should('be.checked');
    cy.get("button").click();
  });
});
