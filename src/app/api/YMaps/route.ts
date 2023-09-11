export async function GET(request: Request){
    const body = await request.json()
    console.log("You send:",body)
    return new Response("GET from API YMaps")
}

export async function POST(req: Request) {

    const API_KEY = process.env.YMAPS_API
    const data = await req.json();
    const addressToSearch = data.addressToSearch
    if (typeof API_KEY != "undefined"){
        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&lang=en_RU&geocode=${addressToSearch}`
        );
        const responseObject = {
            message: `Collection from ${addressToSearch}`,
            askToSearch:  data.addressToSearch,
            collectionFromSearchStatus : response.status,
            collectionFromSearch: await response.json()
            // Include the received data if needed
        };
        return new Response(JSON.stringify(responseObject), {
            headers: { "Content-Type": "application/json" },
        });
    } else {
        return new Response('Resource not found Invalid API', { status: 404 });
    }


    // Return the JSON response with the appropriate headers
}

