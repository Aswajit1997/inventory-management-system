import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter a valid email"
    ]
  },
  password:{
    type:String,
    required:[true,"Please enter a password"],
    minLength:[6,"password must contain 6 characters"],
  },
  photo:{
    type:String,
    required:[true,"please add a photo"],
    default:"https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
  },
  phone:{
    type:String,
    default:"+91"
  },
  bio:{
    type:String,
    maxLength:[250,"bio must less than 250 characters"],
    default:"users bio"
  }

},{
    timestamps:true
  }
);

//hashing password before saving to db
userSchema.pre('save',async function(next){
  //required when updting existing userdata
  if(!this.isModified("password")){
    return next()
  }
  //hash password
  const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(this.password,salt);
  this.password=hashPassword;
  next();
})

const User=mongoose.model('user',userSchema);

export default User;
