class Calculadora{
    constructor(operand1Element, operand2Element){
        this.operand1Element = operand1Element;
        this.operand2Element = operand2Element;
        this.clear();
    }

    clear(){
        this.operand1 = 0;
        this.operand2 = 0;
        this.operador = '';
        this.actualizarUI();
    }

    actualizarUI(){
        this.operand1Element.innerHTML = this.operand1 + this.operador;
        this.operand2Element.innerHTML = this.operand2;
    }

    appendNumber(number){

        if(number === '.' && this.operand2.includes('.')) return;

        this.operand2 = this.operand2 === 0 ? number: this.operand2.toString() + number;

        this.actualizarUI();
    }

    borrar(){
        if(this.operand2 === 0) return;

        this.operand2 = +this.operand2.toString().slice(0, -1);
        this.actualizarUI();
    }

    operation(operador){
        if(this.operador){
            this.calc();
        }

        this.operador = operador;
        this.operand1 = +this.operand2 === 0 ? this.operand1 : this.operand2;
        this.operand2 = 0;
        this.actualizarUI();
    }

    calc(){

        switch(this.operador){
            case "+":
                this.operand1 = +this.operand1 + +this.operand2;
            break;

            case "-":
                this.operand1 = +this.operand1 - +this.operand2;
            break;

            case "*":
                this.operand1 = +this.operand1 * +this.operand2;
            break;

            case "/":
                this.operand1 = +this.operand1 / +this.operand2;
            break;
        }

        this.operador = "";
        this.operand2 = 0;
        this.actualizarUI();

    }

}

const operand1Element = document.querySelector("[datos-oper-1]");
const operand2Element = document.querySelector("[datos-oper-2]");
const borrarBoton = document.querySelector("[data-clear]");
const numeroBotones = document.querySelectorAll("[data-number]");
const eliminarBoton = document.querySelector("[data-delete]");
const operacionBotones = document.querySelectorAll("[data-operation]");
const igualBonton = document.querySelector("[data-equals]");

const calculadoras = new Calculadora(operand1Element, operand2Element);

borrarBoton.addEventListener("click", () =>{
    calculadoras.clear();
});

numeroBotones.forEach(button =>{
    button.addEventListener('click', () =>{
        calculadoras.appendNumber(button.innerHTML);
    })
});

eliminarBoton.addEventListener('click', () =>{
    calculadoras.borrar();
});

operacionBotones.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculadoras.operation(button.innerHTML);
    });
});

igualBonton.addEventListener('click', ()=>{
    calculadoras.calc();
});