export interface IUpload {
    ownerId?: string
    entityId?: string
    fileName: string
    fileSize: string | any
    path: string
    contentType: string
    dateCreated: string
}