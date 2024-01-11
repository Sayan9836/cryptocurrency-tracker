import React, { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('₹');

    useEffect(() => {
        if (currency === 'INR') {
            setSymbol('₹');
        } else if (currency === 'USD') {
            setSymbol('$');
        }
    }, [currency])

    return <Auth.Provider value={{ currency,setCurrency,symbol }}>
        {children}
    </Auth.Provider>

}

export const ContextState = () => {
    return useContext(Auth);
}
export default CryptoContext;

