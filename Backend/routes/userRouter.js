import express from "express"
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils.js"

const userRouter = express.Router() /* vedio: 30 */

userRouter.post('/signin',async (req, res) => {  /* Login.jsx L-37 */
    let user = await User.findOne({email: req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isVendor: user.isVendor,  /* class: 60 part-1 */
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({msg: "Invalid Email or Password"})
})
   
userRouter.post('/signup', async(req, res) => {    /* video no: 38 Signup.jsx L-35 */
    
    const newUser = {                           /* [Rules: 1] */
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }
    let user = new User(newUser)
    user.save()

    // const newUser = new User({               /* [Rules: 2] */
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password)
    // })
    // const user = await newUser.save()

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
})

userRouter.put('/vendor/:id', async(req, res) => {   {/* class: 60 part-1 Vendor.jsx L-17 */}
    console.log(req.params);
    User.findByIdAndUpdate(req.params.id,{isVendor: true},{new: true},function(err,docs){
        if(err){
            console.log(err);
        }else{
            res.send(docs)
        }
    })
})


export default userRouter