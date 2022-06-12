import express from 'express'
import Product from '../model/productModel.js'
import Storename from '../model/storeModal.js'

const productRouter = express.Router()

productRouter.post('/', async (req,res)=>{  /* class: 61 part-2 Dashboard.jsx L-68*/
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

productRouter.get('/', async(req,res)=>{    /* ProductPage.jsx L-39 */
    const products = await Product.find()
    res.send(products)
})

// productRouter.get('/', async(req,res)=>{   /* class: 61 part-2 */
//     const products = await Cat.find()
//     res.send(products)
// })

productRouter.get('/:slug', async (req, res) => { /* vedio: 28 ProductDtails.jsx L-59 */
    console.log(req.query);
    let product = await Product.findOne({slug: req.params.slug})
    if(product){
        res.send(product)
    }else{
        res.status(404).send({msg: 'Product Not Found'})
    }
})

productRouter.post('/storename', async (req, res) => {  {/* class: 60 part-2 Storename.jsx L-22 */}
    let storenameInfo = {
        name: req.body.name,
        owner: req.body.id,
    }
    const storename = new Storename(storenameInfo)
    storename.save()
    // console.log("cate created");
    // console.log(storename);
})

productRouter.get('/storename/:id', async (req, res) => {  {/* class: 60 part-2 Storename.jsx L-40 */}
    let data = await Storename.find({owner: req.params.id})
    res.send(data)
    // console.log(data)
})
// productRouter.get('/:id', async (req,res)=>{
//     console.log(req.params);
//     const storename = await Storename.findById(req.params.id)
//     res.send(storename)
// })
productRouter.put('/storename/edit', async (req,res)=>{   {/* Storename.jsx L-32 */}
    let pro = {
        name: req.body.name,
    }
    Storename.findByIdAndUpdate(req.body.id, pro,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Edited : ", docs);
        }
    });
})

productRouter.get('/productlist/:id', async (req, res)=>{     {/* vedio: 60 Dashboard.jsx L- */}  
    let data = await Product.find({owner: req.params.id})
    res.send(data)
})

productRouter.post('/productlist/del', async (req,res)=>{       /* HW video: 62 */
    Product.findByIdAndDelete(req.body.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
})

productRouter.get('/productlistModal/:id', async (req,res)=>{
    let prolist = await Product.findById(req.params.id)
    res.send(prolist);
})

productRouter.put('/productlistModal/edit', async (req,res)=>{
    let proInfo = {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
    }
    Product.findByIdAndUpdate(req.body.id,  proInfo , function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    });
})
    
export default productRouter