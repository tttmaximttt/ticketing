import mongoose from 'mongoose'
import app from "./app";

const start = async () => {
  console.log('fasdfsd');
  if (!process.env.JWT_KEY) {
    throw new Error("Missing JWT secret");
  }

  await mongoose.connect('mongodb://auth-mongo-srv:27017', {
    dbName: 'auth',
    autoIndex: true,
  })
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

start()
  .then(() => {
    console.log('Db connected successfully.');
  })
  .catch((err) => {
    console.log(err);
  })
