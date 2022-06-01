import express from 'express'
import Product from '../model/productModel.js'
import Storename from '../model/storeModal.js'

const productRouter = express.Router()

productRouter.post('/', async (req,res)=>{  /* class: 61 part-2 */
    console.log(req.body);
    let productInfo = {
        name: req.body.name,
        img: req.body.image,
        price: req.body.price,
        description: req.body.description,
        slug: req.body.slug,
        instock: req.body.stock,
        catagory: req.body.catagory,
        cupon: req.body.cupon,
        discount: req.body.discount,
        total: req.body.total,
        owner: req.body.owner,
    }
    let product = new Product(productInfo)
    product.save()
})

productRouter.get('/', async(req,res)=>{
    const products = await Product.find()
    res.send(products)
})

// productRouter.get('/', async(req,res)=>{   /* class: 61 part-2 */
//     const products = await Cat.find()
//     res.send(products)
// })

productRouter.get('/:slug', async (req, res) => { /* vedio: 28 */
    let product = await Product.findOne({slug: req.params.slug})
    if(product){
        res.send(product)
    }else{
        res.status(404).send({msg: 'Product Not Found'})
    }
})

productRouter.post('/storename', async (req, res) => {  {/* class: 60 part-2 */}
    // console.log(req.body);

    let storenameInfo = {
        name: req.body.name,
        owner: req.body.id,
    }
    const storename = new Storename(storenameInfo)
    storename.save()
    // console.log("cate created");
    // console.log(storename);
})


productRouter.get('/storename/:id', async (req, res) => {  {/* class: 60 part-2 */}
    let data = await Storename.find({owner: req.params.id})
    res.send(data)
    // console.log(data)
})

productRouter.get('/:id', async (req,res)=>{
    console.log(req.params);
    const storename = await Storename.findById(req.params.id)
    res.send(storename)
})
productRouter.put('/edit', async (req,res)=>{
    console.log(req.body.id);
    console.log(req.body.storename);
    // let name = {
    //     storename: req.body.storename,
    // }
    // Storename.findByIdAndUpdate(req.body.id, name,function (err, docs) {
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("Edited : ", docs);
    //     }
    // });
})

export default productRouter
