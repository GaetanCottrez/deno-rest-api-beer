import { Beer } from './interfaces/beers.interface.ts'
import { mongoBeers } from './db.ts'

const getBeers = async ({ response }: { response: any }) => { 
  response.body = await mongoBeers.find({})
}

const getBeer = async ({ params, response }: { params: { name: string }; response: any }) => {
  const beer =  searchBeerByName(params.name)
  if (beer) {
    response.status = 200
    response.body = beer
  } else {
    response.status = 404
    response.body = { message: `Beer not found.` }
  }   
}

const addBeer = async ({ request, response }: { request: any; response: any }) => {
  const body = await request.body()
  const beer: Beer = body.value
  await mongoBeers.insertOne(beer);
  response.body = { message: `Insert beer ${beer.name} success` }
  response.status = 200
}

const updateBeer = async ({ params, request, response }: { params: { name: string }; request: any; response: any }) => {
  let beer = searchBeerByName(params.name)
  if (beer) {
    const body = await request.body()
    await mongoBeers.updateOne(
      {'name' : params.name},
      { $set: { name: body.value.name, category: body.value.category } }
    )
    response.status = 200
    response.body = { message: 'OK' }
  } else {
    response.status = 404
    response.body = { message: `Beer not found` }
  }  
}

const deleteBeer = async ({ params, response }: { params: { name: string }; response: any }) => {
  await mongoBeers.deleteOne({ name: params.name })
  response.body = { message: `Delete beer ${params.name} success` }
  response.status = 200
}

const searchBeerByName = (name: string) => mongoBeers.findOne({ name: name })

export { getBeers, getBeer, addBeer, updateBeer, deleteBeer }