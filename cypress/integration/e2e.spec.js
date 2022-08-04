/// <reference types="cypress" />

import DetalhesFaturamento from '../support/page_objects/faturamento.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */


    beforeEach(() => {
        cy.visit('minha-conta')
           
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 4
        var produto = 'Autumn Pullie'
        var tamanho = 'S'
        var cor = 'Purple'

        // Quero acessar a Loja EBAC e Realizar o Login
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('#primary-menu > .menu-item-629 > a').click()

        // Fazendo a escolha dos produtos e  Adicionando ao carrinho
        cy.visit('produtos/page/4/')
        cy.addProdutos(produto, tamanho, cor, quantidade)
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “' + produto + '” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        // Preenchendo todas opções no checkout
        DetalhesFaturamento.editarDetalhesFaturamento('Olivia', 'Maria', 'Youtube', 'Brasil', 'Av. Paulista', '2004', 'São Paulo', 'São Paulo', '00000-100', '11950933760', 'aluno_ebac@teste.com')
        cy.get('#payment_method_bacs').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        // E validando minha compra ao final 
        cy.get('.page-title').should('contain', 'Pedido recebido')
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        cy.get('.woocommerce-table__product-name > a').should('contain', produto + ' - ' + tamanho + ', ' + cor)
        cy.get('.product-quantity').should('contain', quantidade)
    });
});


