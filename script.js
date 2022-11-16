//ELEMENTOS:

const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const salarioBrutoInput = document.getElementById("salarioBruto");
const backBtn = document.querySelector("#back-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");


//FUNÇÕES PARA CALCULAR:

function calcularImpostos(salarioBruto){
    let descontoINSS = inss(salarioBruto);
    let salarioBase = salarioBruto - descontoINSS;
    let descontoIRPF = irpf(salarioBase);
    let salarioLiquido = salarioBase - descontoIRPF;
    
    document.getElementById("inss").innerHTML = "INSS: R$ " + descontoINSS.toFixed(2);
    document.getElementById("irpf").innerHTML = "IRPF: R$ " + descontoIRPF.toFixed(2);
    document.getElementById("salL").innerHTML = "Seu salário líquido: R$ " + salarioLiquido.toFixed(2);
}

function inss(salarioBruto){                    //função que calcula o desconto do inss
    let inss;
    if (salarioBruto <= 1212){                  //inss para o salário entre os determinados valores abaixo
        inss = salarioBruto*0.075;
    }
    else if(salarioBruto>=1212.01 && salarioBruto<=2427.35){
        inss = salarioBruto*0.09;
    }
    else if(salarioBruto>=2427.36 && salarioBruto<=3641.03){
        inss = salarioBruto*0.12;
    }
    else if(salarioBruto>=3641.04){
        inss = salarioBruto*0.14;
        if(inss>828.39){
            inss = 828.39;
        }
    }
    return inss;
}

function irpf(salarioBase){                 //função que calcula o desconto do irpf
    let irpf;
    if (salarioBase <= 1903.98){            //irpf para o salário entre os determinados valores abaixo
        irpf = 0;
    }
    else if(salarioBase>=1903.99 && salarioBase<=2826.65){
        irpf = (salarioBase-1903.98)*0.075;
    }
    else if(salarioBase>=2826.66 && salarioBase<=3751.05){
        irpf = (salarioBase-2826.65)*0.15 + (2826.65-1903.98)*0.075;
    }
    else if(salarioBase>=3751.06 && salarioBase<=4664.68){
        irpf = (salarioBase-3751.05)*0.225 + (3751.05-2826.65)*0.15 + (2826.65-1903.98)*0.075;
    }
    else if(salarioBase>=4664.69){
        irpf = (salarioBase-4664.68)*0.275 + (4664.68-3751.05)*0.225 + (3751.05-2826.65)*0.15 + (2826.65-1903.98)*0.075;
    }
    return irpf;
}

//FUNÇÃO PARA LIMPAR:

function clearInputs(){
    salarioBrutoInput.value = ""
}

//FUNÇÃO PARA INPUT VÁLIDO:

function validDigits(text){
    return text.replace(/[^0-9,]/g, "")
}

//FUNÇÃO PARA ALTERAR ENTRE RESULTADO E CALCULADORA:

function showOrHide(){
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
}

//EVENTOS:

salarioBruto.addEventListener("input", (e) => {               //INPUTS VÁLIDOS
    const updatedValue = validDigits(e.target.value);
    e.target.value = updatedValue;
})

clearBtn.addEventListener("click", (e) => {                   //BOTÃO DE LIMPAR
    e.preventDefault();
    clearInputs();
})

calcBtn.addEventListener("click", (e) => {                    //BOTÃO DE CALCULAR
    e.preventDefault();
    const salarioBruto = +salarioBrutoInput.value.replace(",",".")

    if(!salarioBruto) return;

    else calcularImpostos(salarioBruto);

    showOrHide();
})

backBtn.addEventListener("click", () => {                    //BOTÃO DE VOLTAR À TELA INICIAL
    clearInputs();
    showOrHide();
})