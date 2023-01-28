import { cleanup } from "@testing-library/react";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
    /* state */
    memory : null,
    operation: null,
    currentValue: null,
    isDecimal: false,
    /* methods */
    addNumber:(value) =>{},
    addOperation:(operation)=>{},
    getResult:()=>{},
    executeAction:(action)=>{},
})

export default function CalculatorState({children}){
    
    const [memory, setMemory] = useState(null);
    const [operation, setOperation] = useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [isReset, setIsReset] = useState(null);
    const [isDecimal, setIsDecimal] = useState(false);

    function handleAddNumber(value){
        if(isReset){
            if(value=== "."){
                setIsDecimal(true);

            } else {
                const point = isDecimal ? '.': '';
                const newValue = currentValue.toString() + point + value.toString();
                setCurrentValue(parseFloat(newValue));
                setIsReset(false);
                setIsDecimal(false);
            }
        }else {
            if(value === '.'){
                setIsDecimal(true);
            } else {
                const point = isDecimal ? '.': '';
                const newValue = currentValue.toString() + point + value.toString();
                setIsDecimal(false);
                setCurrentValue(parseFloat(newValue));
            }
            const newValue = currentValue.toString() + value;
            setCurrentValue(parseFloat(newValue))
        }
    }
    
    function handleAddOperation(operat){
        if(currentValue){
            if(operation){
                handleGetResult();
                setOperation(operat);
            } else {
                setOperation(operat);
                setMemory(currentValue);
                setCurrentValue(0);
                setIsReset(true);
            }
        }
    }

    function handleGetResult(){
        let res = 0;
        if(currentValue && operation && memory){
            switch (operation) {
                case "+":
                    res = parseFloat(currentValue) + parseFloat(memory);
                    break;
                case "-":
                    res = parseFloat(memory) - parseFloat(currentValue);
                    break;
                case "*":
                    res = parseFloat(currentValue) * parseFloat(memory);
                    break;
                case "/":
                    res = parseFloat(memory) / parseFloat(currentValue);
                    break;
                case "%":
                    res = (parseFloat(memory) / 100) * parseFloat(currentValue);
                    break;
                default:
                    break;
            }
            setCurrentValue(res);
            setOperation(null);
            setMemory(res);
            setIsReset(true);
            setIsDecimal(false)
        }
    }
    
    function handleExecuteAction(action){
        switch (action) {
            case "=":
                handleGetResult();
                break;
            case "AC":
                clean();
                break;
            case "<==":
                deleteNumber();
                break;    
            case "+/-":
                changeSign();
                break;    
            case ".":
                convertToFloat();
                break;
            default:
                break;
        }
    }

    function convertToFloat(){
        if(currentValue.toString().indexOf(".") > 0 ){
            //el # ya es flotante
        } else {
            handleAddNumber(".");
        }
    }

    function changeSign(){
        setCurrentValue(currentValue * -1)
    }

    function deleteNumber(){
        const index = currentValue.toString().indexOf(".");
        if(index > 0){
            const numberOfDecimals = currentValue.toString().slice(index + 1).length;
            if(numberOfDecimals===1){
                const min = Math.floor(currentValue);
                setCurrentValue(min);
            } else {
                const newNumber = parseFloat(currentValue).toFixed(numberOfDecimals - 1);
                setCurrentValue(newNumber);
            }
         }
        //setCurrentValue(parseInt(currentValue/10)) 
    }

    function clean(){
        setCurrentValue(0);
        setOperation(null);
        setMemory(0);
        setIsReset(true);
        setIsDecimal(false);
    }

    return (
        <AppContext.Provider
        value={{
            memory,
            operation,
            currentValue,
            isDecimal,
            addNumber: handleAddNumber,
            addOperation: handleAddOperation,
            getResult: handleGetResult,
            executeAction: handleExecuteAction,
        }}
        >
        {children}
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext);
}