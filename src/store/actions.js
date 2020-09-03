export const LOGIN = 'LOGIN'
export const MESSAGES = 'MESSAGES'

export const login = (user) =>{
    return {
        type: LOGIN,
        user:user
    }
}

export const messages = (chats) =>{
    return {
        type: MESSAGES,
        messages:chats
    }
}