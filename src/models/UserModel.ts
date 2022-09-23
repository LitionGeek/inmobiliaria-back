import mongoose, { Schema } from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    password: {type:String, required:true},
    email:{
        type:String,
        required:true,
        lowercase: true
    },
    typeUser: {type:String,default:"AGENT"},
    status: {type:String, default:'active'},
    propertys:[{ type:Schema.Types.ObjectId, ref:"Property"}],
    image:{type:String}
},{timestamps:true}
);

UserSchema.path('email').validate(async (value)=>{
    const emailCount = await mongoose.models.User.countDocuments({email:value});
    return !emailCount;
},'Email already exists')

const UserModel = mongoose.model("User",UserSchema);

export default UserModel