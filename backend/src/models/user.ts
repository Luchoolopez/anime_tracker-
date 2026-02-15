import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    nombre:string;
    email:string;
    passwordHash:string;
}

const UserSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
},{
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);