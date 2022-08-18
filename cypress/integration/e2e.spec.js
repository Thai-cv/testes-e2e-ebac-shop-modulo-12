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
        var quantidade = 1
        var produto1 = 'Autumn Pullie'
        var tamanho1 = 'S'
        var cor1 = 'Purple'
        
        var produto2 = 'Caesar Warm-Up Pant'
        var tamanho2 = '36'
        var cor2 = 'Black'
        
        var produto3 = 'Daphne Full-Zip Hoodie'
        var tamanho3 = 'L'
        var cor3 = 'Purple'

        var produto4 = 'Lucia Cross-Fit Bra'
        var tamanho4 = 'M'
        var cor4 = 'Orange'

        // Quero acessar a Loja EBAC e Realizar o Login
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('#primary-menu > .menu-item-629 > a').click()

        // Fazendo a escolha dos produtos e  Adicionando ao carrinho
   
        cy.addProdutos(2, produto1, tamanho1, cor1, quantidade)
        cy.addProdutos(2, produto2, tamanho2, cor2, quantidade)
        cy.addProdutos(3, produto3, tamanho3, cor3, quantidade)
        cy.addProdutos(6, produto4, tamanho4, cor4, quantidade)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        // Preenchendo todas opções no checkout
        DetalhesFaturamento.editarDetalhesFaturamento('Olivia', 'Maria', 'Youtube', 'Brasil', 'Av. Paulista', '2004', 'São Paulo', 'São Paulo', '00000-100', '11950933760', 'aluno_ebac@teste.com')
        cy.get('#payment_method_bacs').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        // E validando minha compra ao final 
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        cy.get(':nth-child(1) > .woocommerce-table__product-name > a').should('contain', produto1 + ' - ' + tamanho1 + ', ' + cor1)
        cy.get(':nth-child(2) > .woocommerce-table__product-name > a').should('contain', produto2 + ' - ' + tamanho2 + ', ' + cor2)
        cy.get(':nth-child(3) > .woocommerce-table__product-name > a').should('contain', produto3 + ' - ' + tamanho3 + ', ' + cor3)
        cy.get(':nth-child(4) > .woocommerce-table__product-name > a').should('contain', produto4 + ' - ' + tamanho4 + ', ' + cor4)
        cy.get('.product-quantity').should('contain', quantidade)
    });
});


