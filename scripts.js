// == MODAL ==
const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

// == LOCAL STORAGE ==
// Vamos sempre guardar chave e valor
const Storage = {
    // Pegar as informações:
    // Na hora de pegar, o dado esta como string e precisa transformar em array
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [] //parse vai transformar a string em array // || ou devolve um array vazio
    },

    // Guardar as informações, no nosso caso, as informações de transaction:
    // Local Storage guarda string, para transformar ARRAY em STRING, utiliza o JSON
    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

// == TRANSACTION ==
const Transaction = {
    
    // == Object (vai guardar as informações)
    // Tiramos para salvar no localstore
    // all: [
    //     {
    //         description: 'Luz',
    //         amount: -50000,
    //         date: '23/07/2021'
    //     },
    //     {
    //         description: 'Criação de website',
    //         amount: 500000,
    //         date: '23/07/2021'
    //     },
    //     {
    //         description: 'Internet',
    //         amount: -20000,
    //         date: '23/07/2021'
    //     }, 
    //     {
    //         description: 'App',
    //         amount: 200000,
    //         date: '23/07/2021'
    //     },  
    // ],

    all: Storage.get(),

    // Adicionando
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload() //reinicia a aplicação
    },

    // Removendo
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

// == DOM == Pegar as transações do objeto em JavaScript e colocar no HTML
const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index //Index recebe a posição do array

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
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
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
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
    
    formatAmount(value) {
        value = Number(value) * 100//transformando em numero e multiplicando por 100

        return value
    },

    formatDate(date) {
        const splittedDate = date.split('-');

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`//Retornando com a formatação correta (dia/mes/ano)
    },

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

// == FORMULARIO ==
const Form = {

    // Pegandos os campos(elementos):
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    // Pegando os valores destes campos:
    getValues() {
        return {
            description: Form.description.value, 
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    // Formatar os dados:
    formatData() {
        console.log('Formatar os dados tio')
    },

    // Verificar os campos, validar os campos
    validateFields() {
        const { description, amount, date } = Form.getValues() //Desustrurando o objeto
       // console.log(description)

       if(description.trim() === "" || amount.trim() === "" || date.trim() === "") { // trim: limpeza da sua string
        throw new Error("Por favor, preencha todos os campos")// Throw é jogar para fora (cuspir), criando um novo objeto de erro com uma mensagem adicionada
       } 
    },

    // Formatação dos valores e data
    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)   

        return {
            description: description,
            amount: amount,
            date: date
        }
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault() // Cancelando o comportamento padrão do envio de dados do formulario

        // Irá tentar fazer o passo a passo (dentro de try), se um desse passo falhar, devolve o erro.
        try {

            //Funcionalidades:
            // Verificar se todas as informações foram preenchidas
            Form.validateFields()

            // Formatar os dados para salvar
            const transaction = Form.formatValues()

            // Salvar os dados
            Transaction.add(transaction)

            // Apagar os dados do formulario
            Form.clearFields()

            // Fechar o modal
            Modal.close()

        } catch(error) { // Responsável por capturar o erro
            alert(error.message);
        }
    }
}

// == APLICAÇÃO ==
const App = {
    init() { //inicia a aplicação
        
    // Prenchimento automatico dos dados
    Transaction.all.forEach((transaction, index) => {
        DOM.addTransaction(transaction, index)
    })

    // Chamando o updateBalance:
    DOM.updateBalance()

    // Dados salvos no Storage (chamando):
    Storage.set(Transaction.all)
    
    },
    reload() { //recarrega a aplicação
        DOM.clearTransactions()
        App.init()
    },
}

App.init() // Iniciou a aplicação