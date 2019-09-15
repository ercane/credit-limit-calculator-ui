
const BASE_TAG = 'CREDIT_LIMIT_CALCULATOR__'
const ERROR_TAG = BASE_TAG + 'ERROR'
export const LOGGER = {
    error: (tag, msg) => {
        console.info(ERROR_TAG + ' ' + tag + ':\t' + msg)
    },
    warn: (tag, msg) => {
        console.warn(BASE_TAG + ' ' + tag + ':\t' + msg)
    },
    info: (tag, msg) => {
        console.info(BASE_TAG + ' ' + tag + ':\t' + msg)
    },
    log: (tag, msg) => {
        console.log(BASE_TAG + ' ' + tag + ':\t' + msg)
    },

}