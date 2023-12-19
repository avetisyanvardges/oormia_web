export type ActionWithPayload<T extends string, P> = { type: T; payload: P }
export type Action<T extends string> = { type: T }

export interface IParams {
    page: string,
    per_page: string,
    name?: string,
}

export interface IMeta {
    current_page?: number,
    last_page?: number,
    total?: number
}

export interface IRole {
    id: string,
    name: string
}

export interface IPermission {
    id: number,
    name: string
}

export interface IRoleById {
    id: number,
    name: string,
    permissions: IPermission[]
}

export interface IPagePermissions {
    full: string,
    list: string,
    create: string,
    edit: string,
    remove: string,
}

export interface IPagePropsPermissions {
    full: boolean,
    list: boolean,
    create: boolean,
    edit: boolean,
    remove: boolean,
    set_to_parcel: boolean
}
