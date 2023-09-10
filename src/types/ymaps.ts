export interface YmapsAddress {
    street?: string
    house?: string
    district?: string 
    province?: string 
    country?: string
    formatted : string
    cords : string[]
}

export const YmapsAddress_init = {
    street: "",
    house: "",
    district: "" ,
    province: "" ,
    country: "",
    formatted : "string",
    cords : []
}

export function createYMapsAddress({street, house, district, province, country, cords, formatted} : YmapsAddress) : YmapsAddress {

    if (cords.length <= 1){
        console.log("formating cords...")

        const cordsNumber : string = cords[0]
        console.log("cordsNumber",cordsNumber)

        const latitude = parseFloat(cordsNumber[1]);
        const longitude = parseFloat(cordsNumber[0]);


        console.log("latitude:", latitude)
        console.log("longitude:", longitude)
        cords = cordsNumber.split(' ').reverse()
        console.log("cords:",cords)
    }

    return {
        street: street,
        house: house,
        district: district,
        province: province,
        country: country,
        formatted: formatted,
        cords: cords,
    }
}
