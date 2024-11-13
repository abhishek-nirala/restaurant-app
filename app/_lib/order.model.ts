import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    foodItems: String,
    restoId: mongoose.Schema.Types.ObjectId,
    deliveryBoyId: mongoose.Schema.Types.ObjectId,
    status: String,
    amount: String
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
