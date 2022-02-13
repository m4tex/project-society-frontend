import React from "react";

interface DefaultContextValue {
    authToken:string,
}

const MainContext = React.createContext<DefaultContextValue>({
    authToken: '',
})

export { MainContext }

// function MainProvider(props : { children : JSX.Element | JSX.Element[] }) {
//     return (
//         <MainContext.Provider value={}> //Add token validation and etc.
//             {props.children}
//         </MainContext.Provider>
//     );
// }
//
// export default MainProvider;