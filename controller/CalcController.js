class CalController{

    constructor(){
        this._display = document.querySelector("#display");
        this._operations = [];        
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
            case '%':                    
            case '√':                
            case 'x²':                
            case '←':                
            case '÷':                
            case 'X':                   
            case '±':                
            case ',':                
            case '=':                
            case '¹/x':   
            case '-':
            case '+':
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
                this.addOperation(value);
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
    }

    setError(){
        this.display = 'ERROR';
    }

    addOperation(value){ 
        
      if(this._operations.length > 2){
          if(this.isOperator(value)){
            //calculate
            console.log('É um operador');
          }else{
              this.pushOperations(value);
          }
      } else{
          this.pushOperations(value);
      }
      
      console.log(this._operations);
    }

    getResult(){
        return eval(this._operations.join('')) 
    }

   //**Verifica se o botão clicado é um operador * /
    isOperator(value){
               
        return (['+','-','%','√', 'x²','¹/x','←','÷','X','±','='].indexOf(value) > -1);
    }

    //**Obtem a última posição do array */
    getLastOperator(){
        return this._operations[this._operations.length - 1];
    }

    setLastOperator(value){
        this._operations[this._operations.length - 1] = value;
    }         
    
    pushOperations(value){
        if(this._operations.length !== 0){

            if(isNaN(this.getLastOperator())){
              
               if(this.isOperator(value)){
                   this.setLastOperator(value);
               }else{
                   this._operations.push(value);
                   this.display = this.getLastOperator();
               }
            }else{            
                if(!isNaN(value)){
                    let newValue = this.getLastOperator() + value;
                    this.setLastOperator(newValue);
                    this.display = newValue;
                }else{
                    this._operations.push(value);                    
                }
            }
          }else{
              
              if(this.isOperator(value)){
                  if(value === '¹/x'){
                      this.display = 'Cannot divide by zero';
                  }else{
                      this._operations.push(0);
                      this._operations.push(value);                        
                }
                  
              }else{
                this.display = value;
                this._operations.push(value)
              }
          }

    }
    
}