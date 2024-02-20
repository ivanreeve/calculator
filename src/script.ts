const EMPTY: string = '0';
const OPERATORS: string = "+-*/";

interface Calculator {
    getBuffer(): string | undefined | null;
    setBuffer(val: string): void;
    isBufferEmpty(): boolean;
    getField(): string | undefined | null;
    setField(val: string): void;
    isFieldEmpty(): boolean;
}

const calc: Calculator = {
    getBuffer() {
        return document.querySelector('.display #buffer')?.textContent;
    },
    setBuffer(val) {
        var e: Element | null = document.querySelector('.display #buffer');
        if (e) e.textContent = val; // In JavaScript, an object reference implicitly evaluates to true in a boolean context if it is not null or undefined.
    },
    isBufferEmpty() {
        return this.getBuffer() === EMPTY;
    },
    getField() {
        return document.querySelector('.display #field')?.textContent;
    },
    setField(val) {
        var e: Element | null = document.querySelector('.display #field');
        if (e != null) e.textContent = val;
    },
    isFieldEmpty() {
        return this.getField() === EMPTY;
    }
};

function isLastCharacterOperator(): boolean {
    const buffer: string | null | undefined = calc.getBuffer();
    if (buffer && OPERATORS.indexOf(buffer.charAt(buffer.length-1)) !== -1) return true;
    else return false;
}

function clearBuffer(): void {
    calc.setBuffer(EMPTY);
}

function clearField(): void {
    calc.setField(EMPTY);
}

function clearAll(): void {
   clearBuffer();
   clearField();
}

function addDigit(val: string): void{
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
        const field: string | null | undefined = calc.getField();
        if (field && field.length < 9){
            calc.setBuffer(calc.getBuffer() + val);
            calc.setField(calc.getField() + val);
        }
    }
}

function addOperator(sign: string): void {
    calculate();
    const buffer: string | null | undefined = calc.getBuffer();
  
    //if the last character is an operator, we must replace it with the pressed operator!
    if (buffer && isLastCharacterOperator()) calc.setBuffer(buffer.slice(0, -1) + sign);
    else calc.setBuffer(buffer + sign);
}

function calculate(): void {
    const buffer: string | null | undefined = calc.getBuffer();
    try {
        if (buffer){
            if (isLastCharacterOperator()) calc.setBuffer(eval(buffer.slice(0, -1)));
            else calc.setBuffer(eval(buffer));
        }
        clearField();
    } catch (error) {
        alert('Invalid Input!');
        clearAll();
    }
  }

function backspace(): void {
    const buffer: string | null | undefined = calc.getBuffer();
    const field: string | null | undefined = calc.getField();

    if (buffer && field && !calc.isFieldEmpty()){

      if (buffer.length === 1 && field.length === 1){
        clearAll();
      }
      else if (buffer.length > 1 && field.length === 1){
        calc.setBuffer(buffer.substring(0, buffer.length - 1));
        clearField();
      }
      else{
        calc.setBuffer(buffer.substring(0, buffer.length - 1));
        calc.setField(field.substring(0, field.length - 1));
      }
    }
}

clearAll();