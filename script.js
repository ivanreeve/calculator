const EMPTY = '0';
const calc = {
  getBuffer(){
    return document.querySelector('.display #buffer').innerText;
  },
  setBuffer(val){
    document.querySelector('.display #buffer').innerText = val;
  },
  isBufferEmpty(){
    return this.getBuffer() === EMPTY;
  },
  getField(){
    return document.querySelector('.display #field').innerText
  },
  setField(val){
    document.querySelector('.display #field').innerText = val;
  },
  isFieldEmpty(){
    return this.getField() === EMPTY;
  }
};

function isLastCharacterOperator(){
  switch(calc.getBuffer().charAt(calc.getBuffer().length-1)){
    case '+':
    case '-':
    case '*':
    case '/': return true;
    default: return false;
  }
}

function clearBuffer(){
  calc.setBuffer(EMPTY);
}

function clearField(){
  calc.setField(EMPTY);
}

function clearAll(){
  clearBuffer();
  clearField();
}

function addDigit(val){
  if (calc.isBufferEmpty() && calc.isFieldEmpty()){
    calc.setBuffer(val);
    calc.setField(val);
  }
  else if (!calc.isBufferEmpty() && calc.isFieldEmpty()){
    if (isLastCharacterOperator()){
      calc.setBuffer(calc.getBuffer() + val);
    }
    else{
      calc.setBuffer(val);
    }
    calc.setField(val);
  }
  else{
    if (calc.getField().length < 9){
      calc.setBuffer(calc.getBuffer() + val);
      calc.setField(calc.getField() + val);
    }
  }
}

function backspace(){
  const b = calc.getBuffer();
  const f = calc.getField();
  if (!calc.isFieldEmpty()){
    if (b.length === 1 && f.length === 1){
      clearAll();
    }
    else if (b.length > 1 && f.length === 1){
      calc.setBuffer(b.substring(0, b.length - 1));
      clearField();
    }
    else{
      calc.setBuffer(b.substring(0, b.length - 1));
      calc.setField(f.substring(0, f.length - 1));
    }
  }
}

function addOperator(sign){
  calculate();
  const b = calc.getBuffer();

  //if the last character is an operator, we must replace it with the pressed operator!
  if (isLastCharacterOperator()) calc.setBuffer(b.slice(0, -1) + sign);
  else calc.setBuffer(b + sign);
}

function calculate() {
  const b = calc.getBuffer();
  try {
    if (isLastCharacterOperator()) calc.setBuffer(eval(b.slice(0, -1)));
    else calc.setBuffer(eval(b));

    clearField();
  } catch (error) {
    alert('Invalid Input!');
    clearAll();
  }
}