import mongoose from 'mongoose'

//model for individual users who will order foods 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLenght: 4
    },
    city: {
        type: String,
        required: true,
        minLenght: 3
    },

    address: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User
