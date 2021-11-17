import { useState } from "react";


export const useInput = () => {

  const [input, setInput] = useState<string>("0");

  const [result, setResult] = useState<string>("") //ez lehet az Appba kell


  function updateInput (char:string) {
    //ha a result nem "", bármi lehet az első érték
    const inputArr = Array.from(input);
    const lastChar = inputArr[inputArr.length - 1];
    const beforeLastChar = inputArr[inputArr.length - 2];
    const isNumber = (character:string) => /\d/.test(character);
    const isOperator = (character:string) => /[-+*/.]/.test(character);

    const cases = {
      replaceInitial: (inputArr.length === 1 && inputArr[0] === "0") && (isNumber(char) || char === ("-"||"+")),
      dotAfterZero: ((inputArr.length === 1 && inputArr[0] === "0") && char === "."),
      multipleOperators: ((isOperator(lastChar) && (isOperator(char) && char !== "-")) || (lastChar === "-" && char === "-")) || (lastChar === "+" && char === "-"),
      secondDot: (char === "." && /\d+\.\d+$/.test(input)),
      noOperator:(/^\d+[+\-*/]?$/.test(input)),
      noPrevoiusResult:(result === ""),
      twoOperatorsAtEnd: (isOperator(lastChar) && isOperator(beforeLastChar) && isOperator(char))
    };
    
    if(cases.secondDot) {
      return
    }
   
    if (cases.replaceInitial) {
      const newInput = inputArr.map(e => char)
      console.log("initial 0 replaced");
      setInput(newInput.join(''));
    } 
    else if (cases.dotAfterZero) {
      setInput(input + char);
    } 
    else if (cases.twoOperatorsAtEnd){
      const newInput = inputArr.slice(0, inputArr.length - 2);
      console.log("two operators at end");
      newInput.push(char);
      setInput(newInput.join(''));
    }
    else if  (cases.multipleOperators) {
      const newInput = inputArr.slice(0, inputArr.length - 1);
      console.log(`newInput before push ${newInput}`);
      newInput.push(char);
      console.log(`newInput after push ${newInput}`);
      console.log("operators cant follow each other");
      setInput(newInput.join(''));
    } 
    else {
      setInput(input + char)
    }

  }

  function resetInput () {
    setInput("0");
    setResult("");
  }

  function deleteInput () {
    if (input === "0") {
      return
    } else if (input.length === 1 && input !== "0") {
      resetInput();
    } else {
      const newInput = Array.from(input).slice(0, input.length - 1).join("");
      setInput(newInput);
    }
  }

  const operators:any = {
    '+': function(a:number, b:number) { return a + b },
    '-': function(a:number, b:number) { return a - b },
    '*': function(a:number, b:number) { return a * b },
    '/': function(a:number, b:number) { return a / b }
  };

  function calculate (input:string) {
    //ha result nem üres és az első char egy operator unshiftelje resultot az array elejére

    //legalább 4 decimal places
    //https://expertcodeblog.wordpress.com/2018/02/12/typescript-javascript-round-number-by-decimal-pecision/
    function precisionRound(number: number, precision: number)
      {
        if (precision < 0)
        {
          let factor = Math.pow(10, precision);
          return Math.round(number * factor) / factor;
        }
        else
          return +(Math.round(Number(number + "e+" + precision)) +
            "e-" + precision);
      }


    const arr = input.split(/([^\d])/).filter(item => item !== "");
    
    if (Object.keys(operators).some(op => op === arr[0]) && result !== "") {
      arr.unshift(result);
    }
    // console.log(`arr is ${arr}`)

    function calc (arr:any) {
      while (arr.some((e:string) => Object.keys(operators).some(op => op === e))) {
        // console.log(`arr is ${arr} at while loop beginning`)
        
        const opindex = arr.indexOf(arr.find((e:string) => Object.keys(operators).some(op => op === e)));
        // console.log(`opindex is ${opindex}`)
        
        //ha negatív a következő szám
        if (arr[opindex+1] === "-") {
          // console.log(`next number is negative`)
          
          const num:number = operators[arr[opindex]](parseFloat(arr[opindex-1]), parseFloat(arr[opindex+1]) * (-1));
          // console.log(`num is ${num}`)
          
          arr.splice(0,4);
          // console.log(`arr is ${arr} after splicing`)
          
          arr.unshift(num);
          // console.log(`arr is ${arr} after unshift`)
        } else {
          // console.log(`next number is positive`)
          const num:number = operators[arr[opindex]](parseFloat(arr[opindex-1]), parseFloat(arr[opindex+1]));
          // console.log(`num is ${num}`)
          
          arr.splice(0,3);
          // console.log(`arr is ${arr} after splicing`)
          
          arr.unshift(num);
          // console.log(`arr is ${arr} after unshift`)
        }
        
      } 
        return Number.isInteger(Number(arr[0])) ?
          arr[0] 
          :
          precisionRound(arr[0], 5)
        ;
      } 
    console.log(`end of calculation is ${calc(arr)}`)
    setResult(calc(arr));
    setInput("");
  }

  function calculateResult() {
    calculate(input);
  }


  return {input, result, updateInput, deleteInput, resetInput, calculateResult}
}