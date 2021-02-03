type EntityType = 1 | 2 | 3 | 4 | 5 | 6

export interface IFeed {
    dateCreated: any
    entityType: EntityType
    entity: any
}