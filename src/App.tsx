import React from 'react';
import './App.css';
import { Button } from './components/Button';
import { useInput } from './InputHook';

function App() {
  const {input, result, updateInput, deleteInput, resetInput, calculateResult} = useInput();

  const btnProps = {updateInput, deleteInput, resetInput, calculateResult}


  return (
    <div className="row align-items-center justify-content-center min-vh-100">
      <div className="calculator-wrapper col-4 rounded d-flex flex-column pt-3 pb-4 px-3">
        {/* DISPLAY */}
          <div id="display-wrapper" className="my-2">
            <div id="display">{input}</div>
            <span id="prev-value">{result}</span>
          </div>
        {/* DISPLAY */}
        {/* KEYPAD */}
          <div id="keypad-wrapper" className="container-fluid d-flex flex-column flex-grow-1 justify-content-between">
            <div className="row flex-grow-1 p-1 justify-content-between">
              <Button type="operator" value="reset" functions={btnProps}/>
              <Button type="delete" value="del" functions={btnProps}/>
              <Button type="operator" value="/" functions={btnProps}/>
            </div>
            <div className="row flex-grow-1 p-1 justify-content-between">
              <Button type="number" value="7" functions={btnProps}/>
              <Button type="number" value="8" functions={btnProps}/>
              <Button type="number" value="9" functions={btnProps}/>
              <Button type="operator" value="*" functions={btnProps}/>
            </div>
            <div className="row flex-grow-1 p-1 justify-content-between">
              <Button type="number" value="4" functions={btnProps}/>
              <Button type="number" value="5" functions={btnProps}/>
              <Button type="number" value="6" functions={btnProps}/>
              <Button type="operator" value="-" functions={btnProps}/>
            </div>
            <div className="row flex-grow-1 p-1 justify-content-between">
              <Button type="number" value="1" functions={btnProps}/>
              <Button type="number" value="2" functions={btnProps}/>
              <Button type="number" value="3" functions={btnProps}/>
              <Button type="operator" value="+" functions={btnProps}/>
            </div>
            <div className="row flex-grow-1 p-1 justify-content-between">
              <Button type="number" value="0" functions={btnProps}/>
              <Button type="number" value="." functions={btnProps}/>
              <Button type="operator" value="=" functions={btnProps}/>
            </div>
          </div>
        {/* KEYPAD */}
      </div>
    </div>
  );
}

export default App;
