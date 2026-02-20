import React from "react";
import { PropsWithChildren } from "react";
import { createContext, useContext } from "@wordpress/element";

const KeyContext = createContext<string | undefined >( undefined );

export const KeyProvider = ( { children, value }: PropsWithChildren & { value: string } ) => {
    return (
        <KeyContext.Provider value={ value }>
            { children }
        </KeyContext.Provider>
    );
};

export const useKey = () => {

    const context = useContext( KeyContext );

    if ( ! context ) {
        throw new Error("useKey must be used within a KeyProvider");
    }

    return context;
};
