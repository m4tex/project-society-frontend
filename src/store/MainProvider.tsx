import React, {useState} from "react";
import {log} from "util";

interface ContextValue {
    authToken:string,
    isLoggedIn:boolean,
    logIn : (login: string, pword:string) => void,
}

const initState = {
    authToken: '',
    isLoggedIn: true,
    logIn: (login:string, pword:string) => {},
}

const MainContext = React.createContext<ContextValue>(initState)


function MainProvider(props : { children : JSX.Element | JSX.Element[] }) {

    const stateInit = {
        ...initState,
        logIn: logInHandler,
    }

    const [mainContext, setMainContext] = useState<ContextValue>(stateInit)

    function logInHandler(login: string, pword:string) {
        // setMainContext((prevState) => {...prevState, isLoggedIn: true})
    }

    return (
        <MainContext.Provider value={mainContext}>
            {props.children}
        </MainContext.Provider>
    );
}

export { MainContext }
export default MainProvider;