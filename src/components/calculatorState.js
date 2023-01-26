import { createContext, useContext, useState } from "react";

const AppContext = createContext({
    /* state */
    memory : null,
    operation: null,
    currentValue: null,
    /* methods */
    addNumber:(value) =>{},
    addOperation:(operation)=>{},
    getResult:()=>{},
    executeAction:()=>{},
})

export default function CalculatorState({children}){
    
    const [memory, setMemory] = useState(null);
    const [operation, setOperation] = useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [isReset, setIsReset] = useState(null);
    
    function handleAddNumber(value){
        if(isReset){
            setCurrentValue(parseInt(value));
            setIsReset(false);
        }else {
            const newValue = currentValue.toString() + value;
            setCurrentValue(newValue)
        }
    }
    function handleAddOperation(operation){

    }

    function handleGetResult(){

    }
    function handleExecuteAction(){}

    return (
        <AppContext.Provider
        value={{
            memory,
            operation,
            currentValue,
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