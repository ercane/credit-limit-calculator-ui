import { LOGGER } from "../../_utils/logUtils";
import { storageService } from "../storage/storageService";

const TAG = "BaseRestService"

export function sendRestRequest(url, requestOptions, successCallback, errorCallback) {

    LOGGER.info(TAG, "Send Rest")
    fetch(url, requestOptions)
        .then((response) => {
            if (response.ok) {
                LOGGER.info(TAG, "Rest Response Ok: " + JSON.stringify(response))
                response.text()
                    .then(text => {
                        const data = text && JSON.parse(text);
                        LOGGER.info(TAG, "Data: " + JSON.stringify(data))
                        successCallback(data)
                    })
            } else {

   
                LOGGER.info(TAG, "Rest Response failed Status: " + response.status)
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    storageService.logout();
                    location.reload(true);
                }

                response.json()
                .then(function (err) {
                    errorCallback(err.message.split(':')[1]);
                });
               /* const data = response.text;
                const error = response.status + ' ' + response.statusText;
                LOGGER.info(TAG, "Rest Response failed Status: " + error)
                LOGGER.info(TAG, "Rest Response failed Status: " + JSON.stringify(data))

                errorCallback(error)*/
            }
        })
        .catch(error => {
            LOGGER.error(TAG, "Exception: " + JSON.stringify(error))
            errorCallback(JSON.stringify(error))
        })
}

