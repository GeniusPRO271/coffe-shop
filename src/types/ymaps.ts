export class YmapsAddressClass {
    street?: string;
    house?: string;
    district?: string;
    province?: string;
    country?: string;
    formatted: string;
    cords: string[];

    constructor(cords? : string[], street? : string, house? : string,district? : string ,province? : string,country?: string,formatted? : string) {
        this.street = street || "";
        this.house = house || "";
        this.district = district || "";
        this.province = province || "";
        this.country = country || "";
        this.formatted = formatted || "";
        this.cords = cords || [];
    }
    createYMapsAddress(street: string, house: string, district: string, province:string , country: string, cords: string[], formatted:string) : void {

        if (cords.length <= 1){
            const cordsNumber : string = cords[0]
            cords = cordsNumber.split(' ').reverse()
        }

        this.street= street
        this.house= house
        this.district= district
        this.province= province
        this.country= country
        this.formatted= formatted
        this.cords= cords
    }
    async createYMapsAddressUsingCords(cords: string[]) {
        try {
            if (cords && typeof cords != "undefined") {
                const res = await fetch(`/api/YMaps`, {
                    method: "POST",
                    body: JSON.stringify({ addressToSearch: cords.reverse().join(',')}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (data.collectionFromSearchStatus == 200){
                    const responseFromYmapAPI = data.collectionFromSearch.response
                    const AddressFromCoords = responseFromYmapAPI.GeoObjectCollection.featureMember[0]
                    let street = ""
                    let house = ""
                    let district = ""
                    let province = ""
                    let country = ""
                    let formatted: string
                    AddressFromCoords.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.forEach((parts:any) => {
                            switch (parts.kind) {
                                case 'country':
                                    country = parts.name;
                                    break;
                                case 'province':
                                    province = parts.name;
                                    break;
                                case 'district':
                                    district = parts.name;
                                    break;
                                case 'street':
                                    street = parts.name;
                                    break;
                                case "house":
                                    house = parts.name
                                    break;
                                default:
                                    break;
                            }});
                    let cords
                    cords = [AddressFromCoords.GeoObject.Point.pos]
                    console.log("new cords=", cords )
                    formatted = `${AddressFromCoords.GeoObject.name}, ${AddressFromCoords.GeoObject.description}`

                    const YmapsAddressObject : YmapsAddressClass = new YmapsAddressClass(cords, street, house, district,province,country,formatted)
                    YmapsAddressObject.consoleLog()
                    return YmapsAddressObject
                } else {
                    console.log("Error when calling API")
                }


            }
        } catch (e) {
            console.log(e);
        }
    }

    formatCoordsAsTwoStringInAnArray(){
        try {
            return this.cords[0].split(" ")
        } catch (e){
            console.log(e)
            console.log("Error at formatting")
            return []
        }

    }
    validateAddressBasedOnUserInput(UserInput : string) : boolean{
        if (this.formatCoordsAsTwoStringInAnArray().length > 1 &&
            this.formatted === UserInput &&
            this.house != undefined &&
            this.house.trim() !== ""
            ){
            console.log("Valid address: ")
            this.consoleLog()
            return true
        } else {
            console.log("Invalid address: false")
            return false
        }
    }

    validateAddressForReduxDispatch() : boolean{
        return this.street !== undefined && this.street.trim() !== "";

    }

    formattedShortVersion() : string{
        return `${this.street}, ${this.house} `
    }

    consoleLog(){
        console.log("Runing consoleLog Method:")
        console.log("street:", this.street)
        console.log("house:", this.house)
        console.log("district:", this.district)
        console.log("province:", this.province)
        console.log("country:", this.country)
        console.log("formatted:", this.formatted)
        console.log("cords:", this.cords)
    }
}

export class CollectionOfYMapsAddresses{
    collection : YmapsAddressClass[] = [];
    async getCollectionBasedOnString(addressToSearch : string) {
        try {
            if (addressToSearch) {
                const res = await fetch(`/api/YMaps`, {
                    method: "POST",
                    body: JSON.stringify({ addressToSearch: addressToSearch }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();

                if (data.collectionFromSearchStatus == 200){
                    const responseFromYmapAPI = data.collectionFromSearch.response
                    const collectionYmapAddreses : YmapsAddressClass[] = []
                    console.log("responseFromYmapAPI=",responseFromYmapAPI)
                    const collectionOfAddresses = responseFromYmapAPI.GeoObjectCollection.featureMember.map(
                        (item:any) => item.GeoObject
                    );
                    collectionOfAddresses.map((iteam:any) => {

                        let street = ""
                        let house = ""
                        let district = ""
                        let province = ""
                        let country = ""
                        let formatted: string
                        iteam.metaDataProperty.GeocoderMetaData.Address.Components.forEach((parts:any) => {
                            switch (parts.kind) {
                                case 'country':
                                    country = parts.name;
                                    break;
                                case 'province':
                                    province = parts.name;
                                    break;
                                case 'district':
                                    district = parts.name;
                                    break;
                                case 'street':
                                    street = parts.name;
                                    break;
                                case "house":
                                    house = parts.name
                                    break;
                                default:
                                    break;
                            }
                        });

                        let cords
                        cords = [iteam.Point.pos]
                        formatted = `${iteam.name}, ${iteam.description}`

                        const YmapsAddressObject : YmapsAddressClass = new YmapsAddressClass(cords, street, house, district,province,country,formatted)
                        collectionYmapAddreses.push(YmapsAddressObject)

                    })
                    return collectionYmapAddreses
                } else {
                    console.log("Error when calling API")
                }


            }
        } catch (e) {
            console.log(e);
        }
    }

    consoleLog(){
        console.log("Returning items of collection...")
        this.collection.map((i) => {
            console.log(i)
        })
    }
}

