import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ /* vedio: 29 */
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    
    password:{
        type: String,
        required: true,
    },
    idAdmin:{
        type: Boolean,
        default: false,
        required: true,
    },
})

const User = mongoose.model("User", userSchema)

export default User
