import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login = (email,password) =>{
        setLoading(false)
        return signInWithEmailAndPassword(auth,email,password);
    }

    const info = {
        loading,
        user,
        createUser,
        login
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;