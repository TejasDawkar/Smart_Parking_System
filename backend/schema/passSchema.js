import mongoose from "mongoose";

const passSchema = new mongoose.Schema({
    Car : {
        Monthly : Number,
        Quarterly : Number,
        Yearly: Number
    },
    Bike : {
        Monthly : Number,
        Quarterly : Number,
        Yearly: Number
    },
    Bicycle : {
        Monthly : Number,
        Quarterly : Number,
        Yearly: Number
    }
});

export default mongoose.model('Pass', passSchema);