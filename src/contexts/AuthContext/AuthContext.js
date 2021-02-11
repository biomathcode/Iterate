import React,{createContext, useReducer} from 'react';
import AuthReducer from './AuthReducer';
//initial state of Auth
const initialState = {
    isLoggedIn: false,
    token: null,
    user: null,
}
//created context 
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState );

    //Actions
    function UserLogin(userdata) {
        dispatch({
            type: 'LOGIN',
            payload: userdata
        })
    }
    function UserLogOut() {
        dispatch({
            type: "LOGOUT",
            payload: null
        })
    }

    
    return (
        <AuthContext.Provider
        value={{
            user: state.user,
            token: state.token,
            isLoggedIn: state.isLoggedIn,
            UserLogin,
            UserLogOut
        }}>
        {children}
    </AuthContext.Provider>

    )
    
}