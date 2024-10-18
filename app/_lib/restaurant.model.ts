import mongoose from 'mongoose'


const restaurantSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLenght : 4
    },
    city: {
        type: String,
        required: true,
        minLenght : 3
    },
    contact: {
        type: Number,
        required: true,
        length:10

    }
}, { timestamps: true })

export default mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

// const Restaurant = mongoose.models.Restaurant ||  mongoose.model("restaurant", restaurantSchema)
// export default Restaurant