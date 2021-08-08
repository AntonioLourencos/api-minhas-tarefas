import dotEnv from "dotenv";
import mongoose from "mongoose";
dotEnv.config();

async function connectMongo() {
  const { URL_MONGO } = process.env;

  mongoose
    .connect(URL_MONGO!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch((err) => console.log(err));

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.log("failed");
  });

  db.once("open", () => {
    console.log("Server have connection with DATABASE");
  });
}

export default connectMongo;
