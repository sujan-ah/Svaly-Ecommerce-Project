import express from 'express'
import Product from '../model/productModel.js'

const productRouter = express.Router()

productRouter.get('/', async (req,res)=>{
    const products = await Product.find()
    res.send(products)
})

productRouter.get('/:slug', async (req, res) => { /* vedio: 28 */
    let product = await Product.findOne({slug: req.params.slug})
    if(product){
        res.send(product)
    }else{
        res.status(404).send({msg: 'Product Not Found'})
    }
})

productRouter.post('/storename', async (req, res) => {  {/* class: 60 part-2 */}
    console.log(req.body);
})


export default productRouter
