import jp from 'jsonpath'

export function prettyJson(json: string): string {
    try {
        const data = JSON.parse(json)
        return JSON.stringify(data, null, 2)
    } catch (e: any) {
        return "null"
    }
}

export function parseXpath(data: any, path: any): any {
    try {
        let p = `${path}`
        if (!p.startsWith("$")) {
            p = `$.${path}`
        }
        const resp = jp.query(data, p)
        if (resp && resp.length > 0) {
            return resp[0]
        }
    } catch (e: any) {
        console.error(e)
    }
    return undefined
}
