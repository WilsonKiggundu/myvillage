import store from "../data/store";

export type HttpMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD'

export default function apiRequest(httpMethod: HttpMethod, url: string, data?: object) {

    const {access_token} = store.getState()?.oidc?.user
    const method = httpMethod.toString()

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Authorization", `Bearer ${access_token}`)
    const options = { method, headers }

    return fetch(url, options)
        .then(res => res.json())
        .then(data => ({ data }))
        .catch(error => ({ error }));
}