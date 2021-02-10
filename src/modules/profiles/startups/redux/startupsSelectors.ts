import {IStartup} from "../../../../interfaces/IStartup";

export const startupsSelector = (state: any) =>
    state.startups

export const startupSelector = (state: any, id?: string) =>
    id ? state.startups.data.find((startup: IStartup) => startup.id === id) : undefined

export const startupProductsSelector = (state: any, id: string) =>
    state.startups.data.find((startup: IStartup) => startup.id === id)?.products

export const startupInterestsSelector = (state: any, id: string) =>
    state.startups.data.find((startup: IStartup) => startup.id === id)?.interests




