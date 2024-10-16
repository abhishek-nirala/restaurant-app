import mongoose from 'mongoose'


const restaurantSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    "first name" : {
        type : String
    },
    "last name" : {
        type : String
    },
    password : {
        type : String
    },
    city : {
        type : String
    },
    contact : Number
} , {timestamps : true})

// const Restaurant = mongoose.models.Restaurant ||  mongoose.model("restaurant", restaurantSchema)
export default mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

// export default Restaurant