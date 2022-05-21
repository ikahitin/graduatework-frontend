import API from "../api";

export async function loginUser(credentials) {
    return API({
        method: 'post',
        url: 'auth/token',
        data: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}
export async function registerUser(credentials) {
    credentials.email = credentials.username;
    delete credentials.username;
    return API({
        method: 'post',
        url: 'auth/signup',
        data: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}