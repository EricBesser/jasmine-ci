function calculate (inputValue){

        const expression = /\+|\-|\*|\//;
        const numbers = inputValue.split(expression);

        const number1 = parseInt(numbers[0]);
        const number2 = parseInt(numbers[1]);

        const operator = inputValue.match(expression);

        if (Number.isNaN(number1) || Number.isNaN(number2) || operator === null){
            updateResult('Operation not reconized');
            return;
        }
        
        let cal = new Calculator();

        cal.add(number1);

        let results;

        switch(operator[0]){
            case '+':
                results = cal.add(number2);
                break;
            case '-':
                results = cal.subtract(number2);
                break;
            case '*': 
                results = cal.multiply(number2);
                break;      
            case '/':            
                results = cal.divide(number2);
                break;
        }

        updateResult(results);

}
    
function updateResult(result){
    const element = document.getElementById('Results');

    if(element){
        element.innerText = result;
    }
}

function showVersion(){
    const Calc = new Calculator();

    const element = document.getElementById('version');

     Calc.version.then(function(version){
        element.innerText = version;
    });
}