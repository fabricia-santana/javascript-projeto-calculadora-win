
class CalController{

    constructor(){
        this._display = document.querySelector("#display");
        this._operations = [];        
        this._lastNumber = '';
        this._lastOperator = '';
        this._isOperatorClick= false;
        this.inicializer()
    }

    inicializer(){
        this.display = 0;
        this.initButtonsEvents()
    }

    get display(){
        return this._display;
    }

    set display(value){
        this._display.innerHTML = value;
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {

            btn.addEventListener('mouseup', e =>{
                this.execBtn(btn.innerHTML);
                
            });
            
        });
    }

    execBtn(value){

        switch(value){
            case 'CE':
                this.clearEntry();
                break;
            case 'C':
                this.clearAll();
                break;
            case 'X':
                this.addOperation('*');
                break;
            case '÷':                                               
                this.addOperation('/');
                break;
            case '%':  

            case '√':                
            case 'x²':                
            case '←':                
            
            case '±':                
            case ',':                
            case '=':                
            case '¹/x':   
            case '-':
            case '+':
                this.addOperation(value);
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseFloat(value));
                break;
            default:
                this.setError();
        }
    }

    clearEntry(){
        this._operations.pop();
    }

    clearAll(){
        this.display = 0;
        this._operations = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this._isOperatorClick= false;
    }

    setError(){
        this.display = 'ERROR';
    }
    
    addOperation(value){    
        
        if(this.isOperator(value)){
            this._isOperatorClick = true;
            this.calculate(value);
        }else{
            this.pushNumber(value);
        }
        
        console.log(this._operations);
    }
    
    pushNumber(value){
        if(this._operations.length === 0){
            this._operations.push(value);
            this._lastNumber = value;
            
        }else{
            if(!this._isOperatorClick){
                if(this._lastOperator !== '='){
                    if(!isNaN(this.getLastPosition())){
                        let newValue = parseFloat(this.getLastPosition().toString() + value.toString())
                        this.setLastPosition(newValue);
                        this._lastNumber = newValue;
                        
                    }else{
                        this._operations.push(value);
                        this._lastNumber = value;
                        
                    }
                }else{
                    this._operations = [value];
                    this._lastOperator = '';
                    this._isOperatorClick = false;
                }
            }else{
                if(this.getLastPosition() === '='){
                    this._operations = [value];
                    
                }else{
                    this._operations.push(this._lastOperator);                
                    this._operations.push(value);
                    this._lastNumber = value;
                    this._isOperatorClick = false;
                }                
            }
        }
        this.updateDisplay();
    }
    
    calculate(value){ 

        this._isOperatorClick = false;

        if(value === '←'){
            if(!this.isOperator(this.getLastPosition())){
                let str = this.getLastPosition().toString();
                if(str.length >1){
                    this.setLastPosition(parseFloat(str.substring(0, str.length -1)));

                } else{
                    this.setLastPosition(0);
                }
                
            }
        }else if(value === '±'){
            if(!isNaN(this.getLastPosition())){
                if(Math.sign(this.getLastPosition() === -1)){
                    this.setLastPosition(+this.getLastPosition());
                }else{
                    this.setLastPosition(-this.getLastPosition());

                }
            }
        }
        else{

            if(this._operations.length === 0){
    
                if(value === '¹/x'){
                    this.display = 'Cannot divide by zero';                
                }else{
                    this._operations.push(0);
                    this._lastNumber = 0;
                    this._operations.push(value);
                    this._lastOperator = value;
    
                }
    
            }else if(this._operations.length === 1){
                if(value === '='){
                    if(this._lastOperator !== '' && this._lastOperator !== '¹/x' && this._lastOperator !== '√'){                    
                        this._operations.push(this._lastOperator); 
                        this._operations.push(this._lastNumber); 
                        this._operations = [this.getResult()];                   
                    } 
                }else if(value === '¹/x'){
                    if(this._operations.length > 0 && this.getLastPosition() !== 0  && !isNaN(this.getLastPosition())){
                        this.calcDivisionX();
                    }                  
                }else if(value === 'x²'){
                    this._operations.push('*');
                    this._operations.push(this._lastNumber);
                    this._operations = [this.getResult()];
                    this._lastNumber = this._operations[0];
                    this._lastOperator = '*';
    
                }else if(value === '√'){
                    this._operations = [Math.sqrt(this._operations[0])];
                    this._lastOperator = '√';
                    this._lastNumber = this._operations[0];
                    
                }else{
                    if(!this.isOperator(this.getLastPosition())){
                        this._operations.push(value);
                        this._lastOperator = value;
    
                    }else{
                        this.setLastPosition(value);
                        this._lastOperator = value;
                    }
                }
                
            }else if(this._operations.length === 2){
                if(value === '='){
                    this._operations.push(this._lastNumber);
                    this._operations = [this.getResult()];
                }else if (value === '%'){
                    this._lastOperator = this._operations[1];
                    this._lastNumber = this._operations[0];
                    this._operations =  [this._operations[0] * this._operations[0]/100];
                }
                
            }else if(this._operations.length === 3){
                if(value === '='){
                    console.log('Soma e operator Click true');
                    this._operations = [this.getResult()];
                    this._operations.push(value);
                    this._isOperatorClick = true;
                }else if(value === '%'){
                    console.log('%');
                }else{
                    this._operations = [this.getResult()];
                    if(value !== '='){
                        this._operations.push(value);
                        this._lastOperator = value;
                    }
                }
            }
        }
        
       this.updateDisplay();
       console.log('Saiu calculate:'+ this._operations.length);
        
    }

    calcSqrt(){
        
    }

    calcDivisionX(){
        let firstPosition = this._operations[0];
        this._operations[0] = 1;
        this._operations.push('/');
        this._operations.push(firstPosition);
        this._operations = [this.getResult()];
        this._lastOperator = '¹/x';

    }
    

    popOperations(){
        if(!isNaN(this.getLastPosition())){
            let value = this.getLastPosition().toString();
            if(value.length > 1 && this._lastOperator === ''){
                this._operations.pop();
                value = value.slice(0, value.length - 1);
                this._operations.push(parseFloat(value));
                
            }else{
                this._operations.push(0);
            }
        }
        this.updateDisplay();
    }

    getResult(){
        return eval(this._operations.join('')) 
    }

   //**Verifica se o botão clicado é um operador * /
    isOperator(value){
              
        return (['+','-','%','√', 'x²','¹/x','←','/','*','±','='].indexOf(value) > -1);
    }   

    //**Obtem a última posição do array */
    getLastPosition(){
        return this._operations[this._operations.length - 1];
    }

    setLastPosition(value){
        this._operations[this._operations.length - 1] = value;
    }         

    updateDisplay(){
        if(this._operations.length > 0){
            if(this.isOperator(this.getLastPosition())){
                this.display = this._operations[this._operations.length - 2];
            }else{
                this.display = this.getLastPosition();
            }

        }else{
            this.display = '0';
        }

    }

   
}