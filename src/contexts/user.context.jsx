import * as React from "react";

import { onAuthStateChangeListener } from "../utils/firebase/firebase.utils";


// as the actual value you want to access
export const UserContext = React.createContext({
    	currentUser: null,
        setCurrentUser:  null,
});


export const UserProvider = ({children})=>{
    
    const [currentUser, setCurrentUser] = React.useState(null);
    const value = {currentUser, setCurrentUser};

    React.useEffect(()=> {
        const unsubscribe = onAuthStateChangeListener((user)=>{
            // console.log('user', user)
            if (user) {
            setCurrentUser(user);
            }
        })
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}