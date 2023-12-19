import {useState, useEffect} from 'react';

/** Custom hook for keeping state data sycned w/ localStorage */

const useLocalStorage = (key, firstValue = null) => {
    const storedValue = localStorage.getItem(key) 
    const initialValue = storedValue ? JSON.parse(storedValue) : firstValue;
    const [item, setItem] = useState(initialValue);

    useEffect(() => {
        if(item === null){
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(item));
        }
    }, [key, item])

    return [item, setItem];
};

export default useLocalStorage;