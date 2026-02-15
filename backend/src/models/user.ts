import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    nombre:string;
    email:string;
    password:string;
}

const UserSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
{
    timestamps: true
});

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

export default mongoose.model<IUser>('User', UserSchema);