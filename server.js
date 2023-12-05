import mongoose from "mongoose";
import app from "./app.js";

app.listen(3001, () => {
  console.log("Server running. Use our API on port: 3001");
});

const DB_HOST =
  "mongodb+srv://ivanFranko_2000:Lesia2000%24@cluster1.emjabzr.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
