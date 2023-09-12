import {YmapsAddressClass} from "@/types/ymaps";

export interface User {
    name : string,
    lastName : string,
    phone : string,
    address : YmapsAddressClass[]
    activeAddress: YmapsAddressClass
}
