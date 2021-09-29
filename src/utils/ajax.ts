import * as superagent from 'superagent'
import Toast from './Toast'
import {Endpoints} from "../services/Endpoints";
import userManager from "./userManager";
import {User} from "oidc-client";

type CallbackFunction = (data?: any) => void;
type ErrorCallback = (err: any, res: superagent.Response) => void;
type EndCallback = (data?: any) => void;

export const handleError = (err: any = {}, res: superagent.Response) => {

    const defaultMessage = "Invalid request, please contact admin";
    if ((res && res.forbidden) || (res && res.unauthorized)) {
        Toast.error("Authentication Error")
    } else if (res && res.badRequest) {
        const {message, errors} = res.body
        let msg = message + '\n'
        for (const err of errors) {
            const error = Object.values(err)[0]
            msg += (error + '\n')
        }
        Toast.error(msg || defaultMessage)
    } else if ((res && res.clientError) || (res && res.notAcceptable) || (res && res.error)) {
        const {message} = res.body || {}
        Toast.error(message || defaultMessage)
    } else {
        const message = err.message || 'Unknown error, contact admin'
        const finalMessage = message.indexOf("offline") !== -1
            ? "Can't reach server, Check connectivity"
            : message
        Toast.error(finalMessage)
    }
}

const timeout = 0
export const isAuthError = (err: any = {}, res: superagent.Response) => {
    if (err) {
        return false
    }
    return (res && res.forbidden) || (res && res.unauthorized)
}

export const isOffline = (): boolean => {
    return !window.navigator.onLine
}

export const handleResponse = (callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => (err: any, res: superagent.Response) => {
    try {
        if (err || !res.ok) {
            if (errorCallBack) {
                errorCallBack(err, res)
            } else {
                handleError(err, res)
            }
        } else {
            callBack(res.body)
        }
    } catch (e: any) {
        console.error("Failed to process response", e)
    } finally {
        if (endCallBack) {
            endCallBack()
        }
    }
}

export type Services = "Profiles" | "Jobs" | "Events" | "Auth" | "CDN" | "Notification" | "InvestorReadiness"

export const makeUrl = (service: Services, endpoint: string, params?: object) => {
    switch (service) {
        case "CDN":
            return Endpoints.cdn.base + Endpoints.cdn.api
        case "Auth":
        case "Events":
            return Endpoints.events.base + endpoint
        case "Jobs":
            return Endpoints.jobs.base + endpoint
        case "Profiles":
            return Endpoints.base + endpoint
        case "InvestorReadiness":
            return Endpoints.investorReadiness.base + endpoint
        case "Notification":
            return Endpoints.notification.base + endpoint
        default:
            return Endpoints.base + endpoint
    }
}

export const get = (url: string, params: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    userManager.getUser().then((user: User | null) => {
        if (user) {
            superagent.get(url)
                .set('Authorization', `Bearer ${user.access_token}`)
                .query(params)
                .set('Accept', 'application/json')
                .timeout(timeout)
                .end(handleResponse(callBack, errorCallBack, endCallBack))
        } else {
            userManager.signinSilent()
        }
    }).catch(error => {
        Toast.error(error.message)
    })
}

export const getAsync = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        userManager.getUser().then((user: User | null) => {
            if (user) {
                return superagent.get(url)
                    .set('Authorization', `Bearer ${user.access_token}`)
                    .set('Accept', 'application/json')
                    .query(params)
                    .timeout(timeout)
                    .end((err, res) => {
                        if (!err) resolve(res)
                        else reject(err)
                    })
            } else {
                userManager.signinSilent()
            }
        }).catch(error => {
            Toast.error(error.message)
        })
    })
}

export const getWithoutLoginAsync = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        return superagent.get(url)
            .set('Accept', 'application/json')
            .query(params)
            .timeout(timeout)
            .end((err, res) => {
                if (!err) resolve(res)
                else reject(err)
            })
    })
}

export const search = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    userManager.getUser().then((user: User | null) => {
        if (user) {
            superagent.get(url)
                .set('Authorization', `Bearer ${user.access_token}`)
                .set('Accept', 'application/json')
                .query(data)
                .timeout(timeout)
                .end(handleResponse(callBack, errorCallBack, endCallBack))
        } else {
            userManager.signinSilent()
        }
    }).catch(error => {
        Toast.error(error.message)
    })

}

export const post = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    userManager.getUser().then((user: User | null) => {
        if (user) {
            superagent.post(url)
                .set('Authorization', `Bearer ${user.access_token}`)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(data)
                .timeout(timeout)
                .end(handleResponse(callBack, errorCallBack, endCallBack))
        } else {
            userManager.signinSilent()
        }
    }).catch(error => {
        Toast.error(error.message)
    })
}

export const postAsync = (url: string, data: any, apikey?: string) => {
    return new Promise((resolve, reject) => {

        userManager.getUser().then((user: User | null) => {
            if (user) {

                let request = superagent.post(url)
                    .set('Authorization', `Bearer ${user.access_token}`)
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')

                if (apikey)
                    request = request.set('APIKEY', apikey)

                return request
                    .send(data)
                    .timeout(timeout)
                    .end((err, res) => {
                        if (!err) resolve(res)
                        else reject(err)
                    })
            } else {
                userManager.signinSilent()
            }
        }).catch(error => {
            Toast.error(error.message)
        })

    })
}

export const postWithoutLoginAsync = (url: string, data: any, apikey?: string) => {
    return new Promise((resolve, reject) => {

        let request = superagent.post(url)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')

        if (apikey)
            request = request.set('APIKEY', apikey)

        return request
            .send(data)
            .timeout(timeout)
            .end((err, res) => {
                if (!err) resolve(res)
                else reject(err)
            })

    })
}

export const postWithoutLogin = (url: string, data: any, apikey?: string) => {
    let request = superagent.post(url)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')

    if (apikey)
        request = request.set('APIKEY', apikey)

    return request
        .send(data)
        .timeout(timeout)
        .end((err, res) => {
            // console.log(res)
        })
}

export const postFile = (file: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {
    const url = Endpoints.cdn.base + Endpoints.cdn.api

    const formData = new FormData();
    formData.append('file', file);

    userManager.getUser().then((user: User | null) => {
        if (user) {
            superagent.post(url)
                .set('Authorization', `Bearer ${user.access_token}`)
                .set('Accept', 'application/octet-stream')
                .set('APIKEY', 'ea22375e-7836-43ba-9b85-5150c0a973e6')
                .send(formData)
                .timeout(timeout)
                .end(handleResponse(callBack, errorCallBack, endCallBack))
        } else {
            userManager.signinSilent()
        }
    }).catch(error => {
        Toast.error(error.message)
    })


}

export const postFileAsync = (file: any) => {
    const url = Endpoints.cdn.base + Endpoints.cdn.api

    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {

        userManager.getUser().then((user: User | null) => {
            if (user) {
                return superagent.post(url)
                    .set('Authorization', `Bearer ${user.access_token}`)
                    .set('Accept', 'application/octet-stream')
                    .set('APIKEY', 'ea22375e-7836-43ba-9b85-5150c0a973e6')
                    .send(formData)
                    .timeout(timeout)
                    .end((err, res) => {
                        if (!err) resolve(res)
                        else reject(err)
                    })
            } else {
                userManager.signinSilent()
            }
        }).catch(error => {
            reject(error)
        })

    })
}

export const put = (url: string, data: any, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {

    userManager.getUser().then((user: User | null) => {
        if (user) {
            superagent.put(url)
                .set('Authorization', `Bearer ${user.access_token}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(data)
                .timeout(timeout)
                .end(handleResponse(callBack, errorCallBack, endCallBack))
        } else {
            userManager.signinSilent()
        }
    }).catch(error => {
        Toast.error(error.message)
    })

}

export const putAsync = (url: string, data: any) => {
    return new Promise((resolve, reject) => {

        return superagent.put(url)
            // .set('Authorization', `Bearer ${user.access_token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(data)
            .timeout(timeout)
            .end((err, res) => {
                if (!err) resolve(res)
                else reject(err)
            })

    })
}

export const deleteAsync = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
        return superagent.delete(url)
            // .set('Authorization', `Bearer ${user.access_token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .query(params)
            .timeout(timeout)
            .end((err, res) => {
                if (!err) resolve(res)
                else reject(err)
            })
    })
}

export const del = (url: string, callBack: CallbackFunction, errorCallBack?: ErrorCallback, endCallBack?: EndCallback) => {

    userManager.getUser().then((user: User | null) => {
        if (user) {
            superagent.delete(url)
                .set('Authorization', `Bearer ${user.access_token}`)
                .set('Accept', 'application/json')
                .timeout(timeout)
                .end(handleResponse(callBack, errorCallBack, endCallBack))
        } else {
            userManager.signinSilent()
        }
    }).catch(error => {
        Toast.error(error.message)
    })


}

