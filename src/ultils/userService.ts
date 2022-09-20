export interface User {
    id: string
    username: string
    email: string
    token: string
}

function storeUser(user: User) {
    localStorage.setItem('User', JSON.stringify(user));
}

function getCurrentUser() {
    const user = localStorage.getItem('User');
    if (user) {
        return JSON.parse(user);
    }
    return {}
}

function removeCurrentUser() {
    localStorage.removeItem('User');
}

function isUserLogged() {
    const user = localStorage.getItem('User');
    if (!user || !JSON.parse(user)?.token) {
        return false;
    }
    return true;
}

export default {
    storeUser,
    getCurrentUser,
    removeCurrentUser,
    isUserLogged
};