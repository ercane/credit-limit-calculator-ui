import config from 'config';
import { authHeader } from '@/_helpers';
import { sendRestRequest } from './baseRestService';

export function addCustomer(data, successCallback, errorCallback) {
    const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(data) };
    sendRestRequest(`${config.apiUrl}/customer/add`, requestOptions, successCallback, errorCallback)
}

export function getAllActiveCustomers(successCallback, errorCallback) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    sendRestRequest(`${config.apiUrl}/customer/status/ACTIVE`, requestOptions, successCallback, errorCallback)
}

export function calculateCreditLimit(id,successCallback, errorCallback) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    sendRestRequest(`${config.apiUrl}/customer/calculateCreditLimit/${id}`, requestOptions, successCallback, errorCallback)
}