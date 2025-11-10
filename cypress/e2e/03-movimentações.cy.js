describe('Movimentações - Seu Barriga', () => {
  const baseUrl = 'https://seubarriga.wcaquino.me' 

  beforeEach(() => {
    cy.visit(`${baseUrl}/movimentacao`);
    cy.get('#email').type('user1762643492183qdir@mail.com')
    cy.get('#senha').type('Senha123!')
    cy.get('.btn').click()
    cy.get('span > a').click()
  });

  it('CT10 - criar uma movimentação de receita com sucesso', () => {
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('#tipo').select('Receita')
    cy.get('#data_transacao').type('08/11/2025')
    cy.get('#data_pagamento').type('08/11/2025')
    cy.get('#descricao').type('Venda')
    cy.get('#interessado').type('Cliente X')
    cy.get('#valor').type('1500')
    cy.get('#conta').select('Conta para movimentacoes')
    cy.get('#status_pago').check()
    cy.get('button[type="submit"]').click()
    // Validação da mensagem de sucesso
    cy.get('.alert').should('contain', 'Movimentação adicionada com sucesso')
  });

  it('CT11 - criar uma movimentação de despesa com sucesso', () => {
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('#tipo').select('Despesa')
    cy.get('#data_transacao').type('07/11/2025')
    cy.get('#data_pagamento').type('07/11/2025')
    cy.get('#descricao').type('Pagamento fornecedor')
    cy.get('#interessado').type('Fornecedor QA')
    cy.get('#valor').type('500')
    cy.get('#conta').select('Conta com movimentacao')
    cy.get('#status_pendente').check()
    cy.get('button[type="submit"]').click()
    // Validação da mensagem de sucesso
    cy.get('.alert').should('contain', 'Movimentação adicionada com sucesso')
  });

  it('CT12 - registrar movimentações com status Pago e Pendente', () => {
    // Status Pago
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('#tipo').select('Receita')
    cy.get('#data_transacao').type('06/11/2025')
    cy.get('#data_pagamento').type('06/11/2025')
    cy.get('#descricao').type('Venda paga')
    cy.get('#interessado').type('Cliente 1')
    cy.get('#valor').type('300')
    cy.get('#conta').select('Conta para movimentacoes')
    cy.get('#status_pago').check()
    cy.get('button[type="submit"]').click()
    cy.get('.alert').should('contain', 'Movimentação adicionada com sucesso')

    // Status Pendente
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('#tipo').select('Despesa')
    cy.get('#data_transacao').type('07/11/2025')
    cy.get('#data_pagamento').type('07/11/2025')
    cy.get('#descricao').type('Compra pendente')
    cy.get('#interessado').type('Fornecedor 2')
    cy.get('#valor').type('750')
    cy.get('#conta').select('Conta com movimentacao')
    cy.get('#status_pendente').check()
    cy.get('button[type="submit"]').click()
    cy.get('.alert').should('contain', 'Movimentação adicionada com sucesso')
  });

  it('CT13 - criar movimentações em meses diferentes', () => {
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('#tipo').select('Receita')
    cy.get('#data_transacao').type('01/10/2025')
    cy.get('#data_pagamento').type('01/10/2025')
    cy.get('#descricao').type('Venda outubro')
    cy.get('#interessado').type('Cliente outubro')
    cy.get('#valor').type('400')
    cy.get('#conta').select('Conta para saldo')
    cy.get('#status_pago').check()
    cy.get('button[type="submit"]').click()
    // Valida mensagem de sucesso
    cy.get('.alert').should('contain', 'Movimentação adicionada com sucesso')

    // Próxima movimentação 
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('#tipo').select('Despesa')
    cy.get('#data_transacao').type('05/11/2025')
    cy.get('#data_pagamento').type('05/11/2025')
    cy.get('#descricao').type('Compra novembro')
    cy.get('#interessado').type('Fornecedor novembro')
    cy.get('#valor').type('600')
    cy.get('#conta').select('Conta para saldo')
    cy.get('#status_pendente').check()
    cy.get('button[type="submit"]').click()
    // Valida mensagem de sucesso
    cy.get('.alert').should('contain', 'Movimentação adicionada com sucesso')
  });

  it('CT14 - validar campos obrigatórios', () => {
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('button[type="submit"]').click()

    // Validação das mensagens de erro para campos obrigatórios
    cy.get('.alert').should(($alerts) => {
      const text = $alerts.text()
      expect(text).to.include('Descrição é obrigatório')
      expect(text).to.include('Interessado é obrigatório')
      expect(text).to.include('Valor é obrigatório')
    });
  });

  it('CT15 - validar formato do campo Valor', () => {
    cy.visit(`${baseUrl}/movimentacao`)
    cy.get('#tipo').select('Receita')
    cy.get('#data_transacao').type('09/11/2025')
    cy.get('#data_pagamento').type('09/11/2025')
    cy.get('#descricao').type('Teste valor inválido')
    cy.get('#interessado').type('Matheus')
    cy.get('#valor').type('abc')
    cy.get('#conta').select('Conta para movimentacoes')
    cy.get('#status_pago').check()
    cy.get('button[type="submit"]').click()

    // Validação da mensagem de erro para formato inválido
    cy.get('.alert').should('contain', 'Valor deve ser um número')
  });
});
