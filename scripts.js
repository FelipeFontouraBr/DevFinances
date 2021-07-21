// == MODAL ==
const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

// == Object (vai guardar as informações)
const transations = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/07/2021'
    },
    {
        id: 2,
        description: 'Criação de website',
        amount: 500000,
        date: '23/07/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/07/2021'
    }, 
    {
        id: 4,
        description: 'App',
        amount: 20000,
        date: '23/07/2021'
    },   
    ]

// == Transaction ==
const Transaction = {
    incomes() {
        // Somar as entradas
    },
    expenses() {
        // Somar as saídas
    },
    total() {
        // Entradas - saídas
    }
}

// Pegar as transações do objeto em JavaScript e colocar no HTML
const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        // Criando variaveis
        const CSSclass = transaction.amount > 0 ? "income" : "expense" //Alteração automatica do status do valor

        // Configuração da moeda:
        const amount = Utils.formatCurrency(transaction.amount)
        //Montando a máscara do HTML:
        const html = `
        
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        
        `
        return html
    }
}

// Coisas uteis para formatação: exemplo moeda
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "" //guardando o sinal positivo ou negativo

        value = String(value).replace(/\D/g, "") //Replace Troca um outra coisa

        value = Number(value) / 100 // Atualização do numero
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })// Transformando o numero em moeda
        return signal + value
    }
}

transations.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})
