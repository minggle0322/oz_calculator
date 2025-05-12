
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#display'); 
let firstOperand = null;
let secondOperand = null;
let operator = null;
let trigger = false;

function calculate() {
    display.value = eval(`${firstOperand}${operator}${secondOperand}`);
}

display.value = 0;

buttons.forEach(button => {
  button.addEventListener('click', event => {
    const value = event.target.textContent;

    if (button.classList.contains('number')) {
        if (trigger) {
          display.value = value === '.' ? '0.' : value;
          trigger = false;
        } else {
          if (value === '.') {
            if (!display.value.includes('.')) {
              display.value += '.';
            }
          } else {
            if (display.value === '0') {
              display.value = value;
            } else {
              display.value += value;
            }
          }
        }
    }      

    if (button.classList.contains('operator')) {
        if(firstOperand === null) {
            firstOperand = Number(display.value);
            operator = value; 
            trigger = true;
            console.log(`First Operand : ${firstOperand}`);
            console.log(`Operator : ${operator}`);
        }else if(trigger === false && value === '=') {
            secondOperand = display.value;
            calculate(); 
            firstOperand = display.value;
            trigger = true;   
        }else if(trigger === true && value === '=') {
            calculate();
            firstOperand = display.value;
        }else if(trigger === false && value !== '=') {
          secondOperand = display.value;
          calculate();
          firstOperand = display.value;
          operator = value;
          trigger = true;
        }
        
        else {
            operator = value;
            firstOperand = Number(display.value);
            trigger = true;
        }

    }


    if (value === 'C') {
      display.value = '0';
      firstOperand = null;
      secondOperand = null;
      operator = null;
      trigger = false;
    }
  });
});


