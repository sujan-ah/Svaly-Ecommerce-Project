import express from "express"
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils.js"

const userRouter = express.Router() /* vedio: 30 */

userRouter.post('/signin',async (req, res) => {
    let user = await User.findOne({email: req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                idAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({msg: "Invalid Email or Password"})
})

    
/* video no: 38 */
userRouter.post('/signup', async(req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })
    const user = await newUser.save()
    console.log(user);

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        idAdmin: user.isAdmin,
        token: generateToken(user)
    })
})

/* video no: 38 */
export default userRouter

