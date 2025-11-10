describe('Seubarriga - Login', () => {
  const baseUrl = 'https://seubarriga.wcaquino.me'
  // Função para gerar email único e aleatório
  const generateUniqueEmail = (prefix = 'user') => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 6);
    return `${prefix}${timestamp}${random}@mail.com`;
  };

  let userEmail;

  before(() => {
    cy.visit(`${baseUrl}/login`)
    userEmail = generateUniqueEmail();
  })

  it('CT01 - criar novo usuário', () => {
    cy.get('a[href="/cadastro"]').click()
    cy.get('#nome').type('Matheus Teste')
    cy.get('#email').type(userEmail)
    cy.get('#senha').type('Senha123!')
    cy.get('.btn').click()
    cy.get('.alert').contains('Usuário inserido com sucesso')
  })

  it('CT02 - realizar login com sucesso', () => {
    cy.visit(`${baseUrl}/login`)
   cy.get('#email').type(userEmail)
    cy.get('#senha').type('Senha123!')
    cy.get('.btn').click()
    cy.get('.alert').contains('Bem vindo, Matheus Teste!')
  })

  it('CT03 - tentar logar com usuário inválido', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#email').type('inexistente@mail.com')
    cy.get('#senha').type('123')
    cy.get('.btn').click()
    cy.contains('Problemas com o login do usuário')
  })

  it('CT04 - realizar logout', () => {
    cy.visit(`${baseUrl}/login`)
   cy.get('#email').type(userEmail)
    cy.get('#senha').type('Senha123!')
    cy.get('.btn').click()
    cy.get('a[href="/logout"]').click()
    cy.url().should('eq', 'https://seubarriga.wcaquino.me/logout')
  })

})
