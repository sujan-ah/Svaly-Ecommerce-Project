import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({     /* class: 60 part-2 */
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

const Storename = new mongoose.model('Storename', storeSchema)

module.exports = Storename