import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: String,
    imageURL: {
        type: String,
        required: true
    }
});

export interface IProduct extends Document {
    name: string;
    description: string;
    imageURL: string;
}

export default model<IProduct>('Product', schema);