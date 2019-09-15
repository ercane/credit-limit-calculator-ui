import config from 'config';
import { sendRestRequest } from './baseRestService';
import { LOGGER } from '../../_utils/logUtils';


const TAG="AuthService"
export function login(username, password, successCallback, errorCallback) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    LOGGER.info(TAG,"Data: " + requestOptions.body)
    sendRestRequest(`${config.apiUrl}/user/login`, requestOptions, successCallback, errorCallback)
    //post(`${config.apiUrl}/users/authenticate`,{username,password},successCallback,errorCallback)
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}