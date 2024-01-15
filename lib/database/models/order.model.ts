import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
 stripeId: string;
 totalAmount : string;
 event: {
    _id: string;
    title: string;
 }
 buyer: {
    _id: string;
    firstName: string;
    lastName: string
 };
 createdAt: Date
}

const OrderSchema = new Schema({
    stripeId: {
        type: String,
        required: true,
        unique: true
    },
    totalAmount: {
        type: String
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = models.Order || model('Order', OrderSchema);
export default Order;