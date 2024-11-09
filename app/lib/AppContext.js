'use client'
import React, { createContext } from 'react';
import { useState } from 'react';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [loggedIn,setLoggedIn]=useState(false);
    const [examData,setExamData]=useState({});

    return(
        <AppContext.Provider value={{loggedIn,setLoggedIn,examData,setExamData}}>
            {children}
            </AppContext.Provider>

    )
}