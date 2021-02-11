const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": 
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                token : action.payload.token,
            }
        case "LOGOUT": 
            localStorage.clear()
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default: 
            return state;
    }
}

export default AuthReducer;