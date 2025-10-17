const readline = require('readline'); 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Simple Calculator");
console.log("Choose an operation: +, -, *, /");

rl.question("Enter first number: ", (num1) => {
    rl.question("Enter second number: ", (num2) => {
        rl.question("Enter operation (+, -, *, /): ", (operator) => {
            const a = parseFloat(num1);
            const b = parseFloat(num2);
            let result;

            switch (operator) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    if (b !== 0) {
                        result = a / b;
                    } else {
                        console.log("Error: Division by zero!");
                        rl.close();
                        return;
                    }
                    break;
                default:
                    console.log("Invalid operator!");
                    rl.close();
                    return;
            }

            console.log(`Result: ${result}`);
            rl.close();
        });
    });
});
