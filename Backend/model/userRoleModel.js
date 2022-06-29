import mongoose from "mongoose";

const UserroleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    permissions:{
        type: [{type: String}]
    },
})

const UserRole = mongoose.model("UserRole", UserroleSchema)

export default UserRole