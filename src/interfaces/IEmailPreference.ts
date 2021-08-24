export interface IEmailPreference {
    id: string
    value: number
    primaryLabel: string
    secondaryLabel: string
    section: string
    disabled?: boolean
}