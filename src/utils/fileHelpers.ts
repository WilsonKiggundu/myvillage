export const IsImage = (url: string) => {
    const baseUrl = url.split('?')[0]
    const arr = baseUrl.split('/')
    const arrLen = arr.length

    const fileName = arr[arrLen - 1]

    return ['jpg', 'jpeg', 'png'].some((ext: string) => {
        return fileName.toLowerCase().endsWith(ext)
    })
}