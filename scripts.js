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
    
    addTransaction(transaction, index){
        //console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        //console.log(tr.innerHTML)
    },

    innerHTMLTransaction(transaction) {
        //Montando a máscara do HTML:
        const html = `
        
            <td class="description">${transaction.description}</td>
            <td class="expense">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        
        `
        return html
    }
}

DOM.addTransaction(transations[1])