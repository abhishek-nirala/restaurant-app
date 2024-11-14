import mongoose from "mongoose";

export interface DishType  {
  dishName:string,
  dishPrice: number,
  dishImgPath:string,
  dishDescription:string,
  restoId: mongoose.Schema.Types.ObjectId,
}

const dishesSchema = new mongoose.Schema({
  dishName: String,
  dishPrice: Number,
  dishImgPath: String,
  dishDescription: String,
  restoId: mongoose.Schema.Types.ObjectId,
});

const Dish= mongoose.models.Dish || mongoose.model("Dish", dishesSchema);

export default Dish
