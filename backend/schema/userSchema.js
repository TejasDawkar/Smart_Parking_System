import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_name : {
        type: String,
        required : true
    },
    user_mobile : {
        type: Number,
        required: true
    }, 
    user_role : {
        type: String,
        required : true
    },
    vehicle_no : {
        type: String,
        required: true
    },
    vehicle_type : {
        type: String,
        required: true
    }
})
export default mongoose.model('User', userSchema);