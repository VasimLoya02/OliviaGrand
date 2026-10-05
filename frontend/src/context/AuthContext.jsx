import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";


// ==========================================
// CREATE AUTH CONTEXT
// ==========================================

const AuthContext = createContext();


// ==========================================
// AUTH PROVIDER
// ==========================================

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // ==========================================
    // LOAD SAVED USER
    // ==========================================

    useEffect(() => {

        const savedUser =
            localStorage.getItem("user");

        const savedToken =
            localStorage.getItem("token");


        if (savedUser && savedToken) {

            try {

                setUser(
                    JSON.parse(savedUser)
                );

            } catch (error) {

                console.error(
                    "Invalid saved user:",
                    error
                );

                localStorage.removeItem("user");
                localStorage.removeItem("token");

            }

        }


        setLoading(false);

    }, []);


    // ==========================================
    // LOGIN
    // ==========================================

    const login = async (email, password) => {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );


            const data = response.data;


            // ==========================================
            // SHOW FULL LOGIN RESPONSE
            // ==========================================

            console.log(
                "FULL LOGIN RESPONSE:",
                data
            );


            // ==========================================
            // GET TOKEN
            // Backend response:
            //
            // data.data.token
            // ==========================================

            const token =
                data?.data?.token ||
                data?.token;


            // ==========================================
            // GET USER
            // Backend response:
            //
            // data.data.user
            // ==========================================

            const loggedUser =
                data?.data?.user ||
                data?.user;


            // ==========================================
            // CHECK TOKEN
            // ==========================================

            if (!token) {

                console.error(
                    "Token not found in login response:",
                    data
                );

                throw new Error(
                    "Token not received from server"
                );

            }


            // ==========================================
            // SAVE TOKEN
            // ==========================================

            localStorage.setItem(
                "token",
                token
            );


            // ==========================================
            // SAVE USER
            // ==========================================

            if (loggedUser) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(loggedUser)
                );

                setUser(loggedUser);

            }


            // ==========================================
            // CHECK SAVED TOKEN
            // ==========================================

            console.log(
                "TOKEN SAVED:",
                localStorage.getItem("token")
            );


            // ==========================================
            // CHECK SAVED USER
            // ==========================================

            console.log(
                "USER SAVED:",
                localStorage.getItem("user")
            );


            return data;

        } catch (error) {

            console.error(
                "Login API Error:",
                error
            );

            throw error;

        }

    };


    // ==========================================
    // REGISTER
    // ==========================================

    const register = async (userData) => {

        const response = await api.post(
            "/auth/register",
            userData
        );


        const data = response.data;


        // ==========================================
        // GET TOKEN AFTER REGISTER
        // ==========================================

        const token =
            data.data?.token ||
            data.token;


        const registeredUser =
            data.data?.user ||
            data.user;


        // ==========================================
        // SAVE TOKEN
        // ==========================================

        if (token) {

            localStorage.setItem(
                "token",
                token
            );

        }


        // ==========================================
        // SAVE USER
        // ==========================================

        if (registeredUser) {

            localStorage.setItem(
                "user",
                JSON.stringify(registeredUser)
            );

            setUser(registeredUser);

        }


        return data;

    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setUser(null);

    };


    // ==========================================
    // ADMIN CHECK
    // ==========================================

    const isAdmin =
        user?.role === "admin" ||
        user?.role === "manager";


    // ==========================================
    // PROVIDER
    // ==========================================

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAdmin
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


// ==========================================
// USE AUTH
// ==========================================

export function useAuth() {

    return useContext(
        AuthContext
    );

}

