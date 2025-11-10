describe('Seubarriga - ', () => {
  const baseUrl = 'https://seubarriga.wcaquino.me'
  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#email').type('user1762643492183qdir@mail.com')
    cy.get('#senha').type('Senha123!')
    cy.get('.btn').click()
    
})

it('CT05 - adicionar contas', () => {
  // Adicionar primeira conta
    cy.get('.dropdown').contains('Contas').click()
    cy.get('.dropdown-menu').contains('Adicionar').click()
    cy.get('#nome').type('Aluguel')
    cy.get('.btn').click()
    cy.get('.alert').contains('Conta adicionada com sucesso!')
  // Adicionar segunda conta
    cy.get('.dropdown').contains('Contas').click()
    cy.get('.dropdown-menu').contains('Adicionar').click()
    cy.get('#nome').type('Energia')
    cy.get('.btn').click()
    cy.get('.alert').contains('Conta adicionada com sucesso!')
})

it('CT06 - listar contas', () => {
    cy.get('.dropdown').contains('Contas').click()
    cy.get('.dropdown-menu').contains('Listar').click()
    cy.get('.body-index').contains('Energia')
    
})

it('CT07 - alterar nome das contas', () => {
    cy.get('.dropdown').contains('Contas').click()
    cy.get('.dropdown-menu').contains('Listar').click()
     cy.contains('tr', 'Conta para alterar')
      .find('a[href*="/editarConta"]')
      .click(); // Clica no botão de editar

    cy.url().should('include', '/editarConta');

    cy.get('input[name="nome"]')
      .clear()
      .type('Conta para alterar editada');
    cy.get('.btn').click();

    // Valida mensagem de sucesso
    cy.get('.alert').should('contain', 'Conta alterada com sucesso');

    //Próxima alteração
    cy.get('.dropdown').contains('Contas').click()
    cy.get('.dropdown-menu').contains('Listar').click()
     cy.contains('tr', 'Conta para saldo')
      .find('a[href*="/editarConta"]')
      .click(); // Clica no botão de editar

    cy.url().should('include', '/editarConta');

    cy.get('input[name="nome"]')
      .clear()
      .type('Conta para saldo editada');
    cy.get('.btn').click();

    // Valida mensagem de sucesso
    cy.get('.alert').should('contain', 'Conta alterada com sucesso');
  
  });


it('CT08 - adicionar conta com nome duplicado', () => {
    cy.get('.dropdown').contains('Contas').click()
    cy.get('.dropdown-menu').contains('Adicionar').click()
    cy.get('#nome').type('Conta para movimentacoes')
    cy.get('.btn').click()

    // Valida mensagem de sucesso
    cy.get('.alert').contains('Já existe uma conta com esse nome!')

})

it('CT09 - tentar excluir conta vinculada a movimentação', () => {
    cy.get('.dropdown').contains('Contas').click()
    cy.get('.dropdown-menu').contains('Listar').click()
    cy.contains('tr', 'Conta com movimentacao')
      .find('a[href*="/removerConta"]')
      .click();

    // Valida mensagem de erro
    cy.get('.alert').should('contain', 'Conta em uso na movimentações');
  })

})