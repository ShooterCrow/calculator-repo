let numbers = document.querySelectorAll("[number]")
let operators = document.querySelectorAll("[operation]")
let input = document.querySelector(".current-input")
let previousInput = document.querySelector(".previous-input")
let allClearBtn = document.querySelector('[all-clear]')
let equalsBtn = document.querySelector("[equals]")
let deleteBtn = document.querySelector("[delete-btn]")
let errorDisplay = document.querySelector(".error")
let sqrtBtn = document.querySelector("[sqrt]")
let powerUp = document.querySelector("[power]")


class Calculator {
    constructor (currentInput, prevInput) {
        this.currentInput = currentInput;
        this.prevInput = prevInput;
        this.allClear()
    }

    allClear () {
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = ''

    }

    deleteItem () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber (number) {
        if (number == '.' && this.currentOperand.includes('.')) return
        if (this.currentOperand.length > 21) {
            errorDisplay.classList.remove("no-display")
            errorDisplay.textContent = 'Max Value Reached'
            setInterval(() => {
                errorDisplay.classList.add("no-display")
            }, 4000);
            return
        }   
        this.currentOperand += number.toString()
        
    }

    display () {
        this.currentInput.textContent = this.currentOperand
        this.prevInput.textContent = this.prevOperand
        if (this.prevOperand === undefined & this.prevOperand !== '') {
            console.log(this.prevOperand)
            return
        }
        if (this.operation === '√') return
            this.prevInput.textContent = `${this.prevOperand} ${this.operation}`  
             
    }

    compute () {
        let compute
        let it = +this.prevOperand
        if (this.operation == '*') {
            compute = +this.currentOperand * +this.prevOperand
        } else if (this.operation === '+') {
            compute = +this.currentOperand + +this.prevOperand
        } else if (this.operation === '-') {
            compute = +this.prevOperand - +this.currentOperand
        } else if (this.operation === '/') {
            compute = +this.prevOperand / +this.currentOperand 
        } else if (this.operation === '^') {
            compute = it ** +this.currentOperand 
        } else if (this.operation === '√') {
            compute = it ** +this.currentOperand + "clciked"
        }
        this.currentOperand = compute
        this.operation = ""
        this.prevOperand = ''
        // return compute
    }

    selectOperator (operation) {
        if (this.currentOperand == "") return
        if (this.prevOperand !== "") {

            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
        // if (operation==="√" & this.currentOperand  == "") {
        //     this.currentOperand = operation + this.currentOperand
        // }
        // this.compute()
        // if (this.prevOperand !== "" || this.) return

    }
}


const calc1 = new Calculator (input, previousInput)

numbers.forEach((x) => x.addEventListener("click", () => {
    calc1.appendNumber(x.textContent)
    calc1.display()
}))

operators.forEach((x) => x.addEventListener("click", () => {
    calc1.selectOperator(x.textContent)
    calc1.display()
}))

equalsBtn.addEventListener("click", () => {
    calc1.compute()
    calc1.display()
})

deleteBtn.addEventListener("click", () => {
    calc1.deleteItem()
    calc1.display()
})

allClearBtn.addEventListener("click", () => {
    calc1.allClear()
    calc1.display()
})

