export interface IContact {
    id?: string
    belongsTo?: string
    type: number | string
    value: string
    details?: string
    category?: number | string
    dateCreated?: string
}