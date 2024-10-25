import mongoose from 'mongoose';
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://Jonatan:test123@cluster0.t6xuq1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const initMongoDB = async () => {
  try {
      mongoose.set('strictQuery', false)
      await mongoose.connect(MONGO_URL);
      console.log("Conectado a la base de datos de MONGODB");
  } catch (error) {
      console.log(error);
  }
};