import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const chechUserLoggedIn = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/auth/check", { credentials: "include" }); ///vite.config.js in frontend use proxy to mean that /api = http://localhost:5000/api
                const data = await res.json();
                setAuthUser(data.user);

            } catch (error) {
                toast.error(error.message);

            } finally {
                setLoading(false);
            }
        };
        chechUserLoggedIn();
    }, [])

    return <AuthContext.Provider value={{ authUser, setAuthUser,loading }}>
        {children}
    </AuthContext.Provider>

};