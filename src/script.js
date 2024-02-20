var EMPTY = '0';
var OPERATORS = "+-*/";
var calc = {
    getBuffer: function () {
        var _a;
        return (_a = document.querySelector('.display #buffer')) === null || _a === void 0 ? void 0 : _a.textContent;
    },
    setBuffer: function (val) {
        var e = document.querySelector('.display #buffer');
        if (e)
            e.textContent = val; // In JavaScript, an object reference implicitly evaluates to true in a boolean context if it is not null or undefined.
    },
    isBufferEmpty: function () {
        return this.getBuffer() === EMPTY;
    },
    getField: function () {
        var _a;
        return (_a = document.querySelector('.display #field')) === null || _a === void 0 ? void 0 : _a.textContent;
    },
    setField: function (val) {
        var e = document.querySelector('.display #field');
        if (e != null)
            e.textContent = val;
    },
    isFieldEmpty: function () {
        return this.getField() === EMPTY;
    }
};
function isLastCharacterOperator() {
    var buffer = calc.getBuffer();
    if (buffer && OPERATORS.indexOf(buffer.charAt(buffer.length - 1)) !== -1)
        return true;
    else
        return false;
}
function clearBuffer() {
    calc.setBuffer(EMPTY);
}
function clearField() {
    calc.setField(EMPTY);
}
function clearAll() {
    clearBuffer();
    clearField();
}
function addDigit(val) {
    if (calc.isBufferEmpty() && calc.isFieldEmpty()) {
        calc.setBuffer(val);
        calc.setField(val);
    }
    else if (!calc.isBufferEmpty() && calc.isFieldEmpty()) {
        if (isLastCharacterOperator()) {
            calc.setBuffer(calc.getBuffer() + val);
        }
        else {
            calc.setBuffer(val);
        }
        calc.setField(val);
    }
    else {
        var field = calc.getField();
        if (field && field.length < 9) {
            calc.setBuffer(calc.getBuffer() + val);
            calc.setField(calc.getField() + val);
        }
    }
}
function addOperator(sign) {
    calculate();
    var buffer = calc.getBuffer();
    //if the last character is an operator, we must replace it with the pressed operator!
    if (buffer && isLastCharacterOperator())
        calc.setBuffer(buffer.slice(0, -1) + sign);
    else
        calc.setBuffer(buffer + sign);
}
function calculate() {
    var buffer = calc.getBuffer();
    try {
        if (buffer) {
            if (isLastCharacterOperator())
                calc.setBuffer(eval(buffer.slice(0, -1)));
            else
                calc.setBuffer(eval(buffer));
        }
        clearField();
    }
    catch (error) {
        alert('Invalid Input!');
        clearAll();
    }
}
function backspace() {
    var buffer = calc.getBuffer();
    var field = calc.getField();
    if (buffer && field && !calc.isFieldEmpty()) {
        if (buffer.length === 1 && field.length === 1) {
            clearAll();
        }
        else if (buffer.length > 1 && field.length === 1) {
            calc.setBuffer(buffer.substring(0, buffer.length - 1));
            clearField();
        }
        else {
            calc.setBuffer(buffer.substring(0, buffer.length - 1));
            calc.setField(field.substring(0, field.length - 1));
        }
    }
}
clearAll();
