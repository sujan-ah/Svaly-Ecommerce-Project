import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({    /* HW class: 63 */
   
    proId: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
})

const Rating = mongoose.model("Rating", ratingSchema)

export default Rating