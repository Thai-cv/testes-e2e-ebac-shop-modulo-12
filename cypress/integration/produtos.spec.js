/// <reference types="cypress" />


describe('Fazendo a escolha dos produtos', () => {

    beforeEach(() => {
        cy.visit('produtos/page/3/')
    });
    
    it('Deve selecionar um produto da lista', () => {

        cy.get('[class="product-block grid"]')
            .contains('Autumn Pullie')
            .click()
    });

        it('Deve adicionar produtos ao carrinho - Usando Comando Customizado', () => {
            var quantidade = 4

            cy.addProdutos('Autumn Pullie', 'S', 'Purple',  '4')
           
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
            cy.get('.woocommerce-message').should('contain', quantidade + ' × “Autumn Pullie” foram adicionados no seu carrinho.')
        });

        
});

