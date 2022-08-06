export const loggedIn = (payload) => {
    return {
        type: 'LOGGED_IN',
        payload
    };
}
export const loggedOut = () => {
    return {
        type: 'LOGGED_OUT'
    };
}
export const onLogin = () => {
    return {
        type: 'ON_LOGIN'
    };
}
export const onSignUp = () => {
    return {
        type: 'ON_SIGN_UP'
    };
}
