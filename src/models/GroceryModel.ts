import mongoose, { Schema, Document } from 'mongoose';

export interface IGroceryItem extends Document {
  name: string;
  price: number;
  quantity: number;
}

const GroceryItemSchema: Schema = new Schema({
    _id:String,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
},{
    timestamps: {
        createdAt: "_created_at",
        updatedAt: "_updated_at"
    },
    versionKey: false

});

export default mongoose.model<IGroceryItem>('Items', GroceryItemSchema);
