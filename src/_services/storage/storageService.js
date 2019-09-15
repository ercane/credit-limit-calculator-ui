import { BehaviorSubject } from "rxjs";


const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('@user')));

export const storageService = {
    saveUser,
    logout,
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value }
};

function saveUser(user) {
    localStorage.setItem('@user', JSON.stringify(user));
    userSubject.next(user);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('@user');
    userSubject.next(null);
}