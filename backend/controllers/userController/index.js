import User from '../../schema/userSchema.js';
import Pass from '../../schema/passSchema.js';

const userRegistration = async (req, res) => {
    console.log(req.body);
    try {
        const {user_name, user_mobile, user_role, vehicle_no, vehicle_type} = req.body;
        const existingUser = await User.findOne({user_mobile, vehicle_no});
        if(existingUser){
            return res.status(400).json({message: 'User already registered!'});
        }

        const newUser = new User({user_name, user_mobile, user_role, vehicle_no, vehicle_type});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully!', user: newUser});
        
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
}

const userPass = async (req, res) => {
    try {
        const passRates = await Pass.find();
        res.status(200).json(passRates);
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
}

export {userRegistration, userPass};