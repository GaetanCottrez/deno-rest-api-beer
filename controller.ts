import { Beer } from './interfaces/beers.interface.ts'

let listBeers: Array<Beer> = [{
  name: "Triple Karmeliet",
  category: "Belgian and French Ale",
  country: "Belgium",
},{
    name: "Dort",
    category: "German Lager",
    country: "Netherlands",
},{
    name: "Brasserie des Cimest",
    category: "",
    country: "French",
}]

const getBeers = ({ response }: { response: any }) => { 
  response.body = listBeers 
}

const getBeer = ({ params, response }: { params: { name: string }; response: any }) => {
  const beer: Beer | undefined = searchBeerByName(params.name)
  if (beer) {
    response.status = 200
    response.body = listBeers[0]
  } else {
    response.status = 404
    response.body = { message: `Beer not found.` }
  }   
}

const addBeer = async ({ request, response }: { request: any; response: any }) => {
  const body = await request.body()
  const beer: Beer = body.value
  listBeers.push(beer)
  response.body = { message: `Insert beer ${beer.name} success` }
  response.status = 200
}

const updateBeer = async ({ params, request, response }: { params: { name: string }; request: any; response: any }) => {
  let beer: Beer | undefined = searchBeerByName(params.name)
  if (beer) {
    const body = await request.body()
    const updateInfos: { name?: string; category?: string } = body.value
    beer = { ...beer, ...updateInfos}
    listBeers = [...listBeers.filter(book => book.name !== params.name), beer]
    response.status = 200
    response.body = { message: 'OK' }
  } else {
    response.status = 404
    response.body = { message: `Beer not found` }
  }  
}

const deleteBeer = ({ params, response }: { params: { name: string }; response: any }) => {
  listBeers = listBeers.filter(beer => beer.name !== params.name)
  response.body = { message: `Delete beer ${params.name} success` }
  response.status = 200
}

const searchBeerByName = (name: string): (Beer | undefined) => listBeers.filter(beer => beer.name === name )[0]

export { getBeers, getBeer, addBeer, updateBeer, deleteBeer }