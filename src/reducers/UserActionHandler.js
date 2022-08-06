export default function userActionHandler(state = {
    isLoggedIn: false,
    onHomePage: true,
    onLoginPage: false,
    onSignUpPage: false,
    username: ''
},  action) {
    switch(action.type) {
        case 'LOGGED_IN':
            return {
                isLoggedIn: true,
                onHomePage: true,
                onLoginPage: false,
                onSignUpPage: false,
                username: action.payload
            }
        case 'LOGGED_OUT':
            return {
                isLoggedIn: false,
                onHomePage: true,
                onLoginPage: false,
                onSignUpPage: false,
                username: action.payload
            }
        case 'ON_LOGIN':
            return {
                isLoggedIn: false,
                onHomePage: false,
                onLoginPage: true,
                onSignUpPage: false,
                username: ''
            }
        case 'ON_SIGN_UP':
            return {
                isLoggedIn: false,
                onHomePage: false,
                onLoginPage: false,
                onSignUpPage: true,
                username: ''
            }
        default:
            return state
    }
}