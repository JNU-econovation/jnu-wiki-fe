import { useState, useEffect } from "react";


const useInput = (initialValue) => {
    const [valueInit, setValue] = useState(initialValue);
    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setValue({ ...valueInit, [id]: value });
    }
    useEffect((e) => {
        // console.log(valueInit.password);
    }, [valueInit]);
    return { valueInit, handleOnChange };
};

export default useInput;