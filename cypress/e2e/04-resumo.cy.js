describe('Resumo Mensal / Extrato', () => {
  const baseUrl = 'https://seubarriga.wcaquino.me';

  beforeEach(() => {
    cy.visit(`${baseUrl}/extrato`);
    cy.get('#email').type('user1762643492183qdir@mail.com')
    cy.get('#senha').type('Senha123!')
    cy.get('.btn').click()
  });

  it('CT16 - aplicar filtro de mês e ano e listar resultados', () => {
    cy.visit(`${baseUrl}/extrato`)
    cy.get('#mes').select('11')
    cy.get('#ano').select('2025')
    cy.get('input[type="submit"]').click()

    // Validação de que os resultados correspondem ao filtro aplicado
    cy.get('#tabelaExtrato tbody tr').should('have.length.greaterThan', 0)
    cy.get('#tabelaExtrato').within(() => {
      cy.contains('Movimentacao de conta').should('exist');
      cy.contains('11/2025').should('exist');
    });
  });

  it('CT17 - excluir uma movimentação com sucesso', () => {
    cy.visit(`${baseUrl}/extrato`);
    cy.contains('tr', 'Movimentacao para extrato')
      .find('a[href*="removerMovimentacao"]')
      .click();
    // Validação da mensagem de sucesso
    cy.get('.alert').should('contain', 'Movimentação removida com sucesso');
  });
});
