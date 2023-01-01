import mongoose from "mongoose"


const connectToDatabase = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@goyave_mongodb:27017/${process.env.DATABASE_NAME}?authSource=admin`)
    console.log('Successfully connected to database')
  } catch (error) {
    console.log(error)
  }
}


export default connectToDatabase