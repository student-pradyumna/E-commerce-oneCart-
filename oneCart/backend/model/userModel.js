import mongoose from"mongoose"

const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    
  },
  cartData:{
    type:Object,
    default:{}
  }

},{timestamps:true,minimize:false})
const User=mongoose.model("User",UserSchema)
export default User;