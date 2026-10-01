describe('My CV E2E Test Suite', () => {
  beforeEach(() => {
    // Visita la raíz del proyecto
    cy.visit('/');
  });

  it('debe cargar la página principal y mostrar el contenedor del CV', () => {
    cy.get('.cv-page').should('exist');
  });

  it('debe renderizar el encabezado con el nombre y datos de contacto', () => {
    cy.get('.header-container').should('exist');
    cy.get('.profile-name').should('not.be.empty');
  });

  it('debe mostrar la sección de Experiencia Laboral con registros', () => {
    cy.contains('h2', 'WORK EXPERIENCE').should('be.visible');
    cy.get('.experience-item').should('have.length.at.least', 1);
  });

  it('debe mostrar la sección de Educación', () => {
    cy.contains('h2', 'EDUCATION').should('be.visible');
    cy.get('app-education').should('exist');
  });

  it('debe mostrar la sección de Habilidades (Skills)', () => {
    cy.contains('h2', 'SKILLS').should('be.visible');
    cy.get('app-skills').should('exist');
  });
});