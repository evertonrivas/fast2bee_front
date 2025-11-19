import { Paginate } from "./paginate.model"

export interface User {
    id:number,
    name:string,
    email:string,
    username:string,
    type:string,
    active: boolean,
    id_entity: number|undefined,
    password: string | undefined,
    date_created: string | undefined,
    date_updated: string | undefined,
}
