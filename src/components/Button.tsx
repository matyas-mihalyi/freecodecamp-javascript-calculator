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


  switch(type) {
    case 'number':
      return <button className="calc-btn num-btn col-3 rounded" type="button" onClick={()=> updateInput(value)}>{value}</button>
    case 'operator':
      switch(value) {
        case '=':
          return <button className="calc-btn col-6 rounded" type="button" onClick={()=> calculateResult()}>{value}</button>
        case 'reset':
          return <button className="calc-btn reset-btn col-6 rounded" type="button" onClick={()=> resetInput()}>AC</button>
        default:
          return <button className="calc-btn col-3 rounded" type="button" onClick={()=> updateInput(value)}>{value}</button>
      }
    case 'delete':
      return <button className="calc-btn del-btn col-3 rounded" type="button" onClick={()=> deleteInput()}>{value}</button>  
    default:
      return <button className="calc-btn col-3 rounded" type="button">{value}</button>
  }  
    

}