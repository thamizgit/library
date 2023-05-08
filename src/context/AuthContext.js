import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [skip, setSkip] = useState(8);
    return(
        <AuthContext.Provider value={{ auth, setAuth,skip,setSkip }}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;