type ButtonType = "number" | "operator" | "equals" | "delete";
type ButtonFuncitons = {
  updateInput(char:string):void, 
  deleteInput():void,
  resetInput():void,
  calculateResult():void
}

type ButtonProps = {
  type?:ButtonType; 
  value: string;
  functions:ButtonFuncitons;
}


export const Button = (props:ButtonProps) => {
  const {type, value, functions} = props;
  const {updateInput, deleteInput, resetInput, calculateResult} = functions;

  type ButtonIds = {
    [propName:string|number]:string
  }
  const ids:ButtonIds = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    0: "zero",
    '+': "add",
    '-': "subtract",
    '*': "multiply",
    '/': "divide",
    '.': "decimal"
  }



  switch(type) {
    case 'number':
      return <button className="calc-btn num-btn col-3 rounded" type="button" onClick={()=> updateInput(value)} id={ids[value]}>{value}</button>
    case 'operator':
      switch(value) {
        case '=':
          return <button className="calc-btn col-6 rounded" type="button" onClick={()=> calculateResult()} id="equals">{value}</button>
        case 'reset':
          return <button className="calc-btn reset-btn col-6 rounded" type="button" onClick={()=> resetInput()} id="clear">AC</button>
        default:
          return <button className="calc-btn op-btn col-3 rounded" type="button" onClick={()=> updateInput(value)} id={ids[value]}>{value}</button>
      }
    case 'delete':
      return <button className="calc-btn del-btn col-3 rounded" type="button" onClick={()=> deleteInput()}>{value}</button>  
    default:
      return <button className="calc-btn col-3 rounded" type="button">{value}</button>
  }  
    

}