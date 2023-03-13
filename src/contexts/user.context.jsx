import * as React from "react";

import { onAuthStateChangeListener } from "../utils/firebase/firebase.auth";


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
            if (user && user.emailVerified) {
            setCurrentUser(user);
            }
        })
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}