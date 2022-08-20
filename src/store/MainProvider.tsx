import React, {useState} from "react";

interface ContextValue {
    authToken:string,
    isLoggedIn:boolean,
    logIn : (login: string, pword:string) => void,
    logOut: ()=>void,
}

const initState = {
    authToken: '',
    isLoggedIn: true,
    logIn: (login:string, pword:string) => {},
    logOut: ()=>{}
}

const MainContext = React.createContext<ContextValue>(initState)


function MainProvider(props : { children : JSX.Element | JSX.Element[] }) {

    const stateInit = {
        ...initState,
        logIn: logInHandler,
        logOut: logOutHandler,
    }

    const [mainContext, ] = useState<ContextValue>(stateInit);

    function logInHandler(login: string, password:string) {
        // setMainContext((prevState) => {...prevState, isLoggedIn: true})
    }
    function logOutHandler(){
        console.log('Logging out!');
    }

    return (
        <MainContext.Provider value={mainContext}>
            {props.children}
        </MainContext.Provider>
    );
}

export { MainContext }
export default MainProvider;