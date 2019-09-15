import { storageService } from '../_services/storage/storageService';

export function authHeader() {
    // return authorization header with jwt token
    let headers;
    const currentUser = storageService.userValue;
    if (currentUser && currentUser.token) {
        headers = {
            'Authorization': 'Bearer ' + currentUser.token,
            'Content-Type': 'application/json'
        };
    } else {
        headers = {
            'Content-Type': 'application/json'
        };
    }

    return headers;
}