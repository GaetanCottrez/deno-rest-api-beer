import { Router }from 'https://deno.land/x/oak/mod.ts'
import { getBeers, getBeer, addBeer, updateBeer, deleteBeer } from './controller.ts'

const router = new Router()
router.get('/beers', getBeers)
    .get('/beers/:name', getBeer)
    .post('/beers', addBeer)
    .put('/beers/:name', updateBeer)
    .delete('/beers/:name', deleteBeer)

export default router