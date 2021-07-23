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
const transactions = [
    {
        description: 'Luz',
        amount: -50000,
        date: '23/07/2021'
    },
    {
        description: 'Criação de website',
        amount: 500000,
        date: '23/07/2021'
    },
    {
        description: 'Internet',
        amount: -20000,
        date: '23/07/2021'
    }, 
    {
        description: 'App',
        amount: 200000,
        date: '23/07/2021'
    },   
    ]

// == Transaction ==
const Transaction = {

    // Adicionando
    all: transactions, //atalho pegando todos dados das transações
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload() //reinicia a aplicação
    },
    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    // Somar as entradas
    incomes() {
        let income = 0;
        // Pegar todas as transações
        // Para cada transação,
        Transaction.all.forEach((transaction) => {
            if(transaction.amount > 0) { // se ela for maior que zero 
               income = income + transaction.amount // somar a uma variavel e retornar a variavel
            } 
        })   
        return income;
    },

    // Somar as saídas
    expenses() {
        let expense = 0;
        // Pegar todas as transações
        // Para cada transação,
        Transaction.all.forEach((transaction) => {
            if(transaction.amount < 0) { // se ela for menor que zero 
               expense += transaction.amount // somar a uma variavel e retornar a variavel
            } 
        })
        return expense;
    },

    // Entradas - saídas
    total() {
        return Transaction.incomes() + Transaction.expenses()
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
    },

    // == Atualizações na tela de entrada e saída
    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes()) //Pegando a soma das entradas
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses()) //Pegando a soma das entradas
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total()) //Pegando a soma das entradas
    }, 

    // Limpar a aplicação toda vez que reinicia
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
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

// == APLICAÇÃO ==
const App = {
    init() { //inicia a aplicação
        
    // Prenchimento automatico dos dados
    Transaction.all.forEach(transaction => {
        DOM.addTransaction(transaction)
    })

    // Chamando o updateBalance:
    DOM.updateBalance()

    },
    reload() { //recarrega a aplicação
        DOM.clearTransactions()
        App.init()
    },
}

App.init() // Iniciou a aplicação