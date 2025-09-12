import mongoose,{Schema,Document,Model} from "mongoose";

export interface User extends Document{
    username : string;
    email :string;
    password : string;
    createdAt : Date;
}

const UserSchema : Schema<User> = new Schema(
    {
        username:{
            type:String,
            required:[true,"username is required"],
            unique:true,
            trim:true,
            minlength:3,
            maxlength:10,
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:true,
            
        },
        password:{
            type:String,
            required:[true,"password is required"],
            unique:true,
            minlength:6,
            
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },
    },

)

const User : Model<User>=
mongoose.models.User || mongoose.model<User>("User",UserSchema)

export default User