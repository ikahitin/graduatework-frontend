export async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}
export async function registerUser(credentials) {
    credentials.email = credentials.username;
    delete credentials.username;
    return fetch('http://127.0.0.1:8000/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}