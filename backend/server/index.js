import express from 'express';
import cors  from 'cors'; //for cross origin resource sharing, as express api runs on port 5000 and react runs on port 3000 then access will be blocked.
import mongoose from 'mongoose';
import userRoutes from "../routes/userRoute.js"; 
import uploadRoutes from "../routes/uploadRoute.js";
import path from "path";

const dbURL = 'mongodb://localhost:27017/smart_parking_db'
const app = express(); // intialized express object
const PORT = 5000;

mongoose.connect(dbURL)
  .then(() => console.log('connected to database'))
  .catch(() => console.log('connection to database failed!'))

//enables cross origin resource sharing
app.use(cors());
//parses incoming JSON requests
app.use(express.json());

//This route is a basic test route that serves as a sanity check to ensure your Node.js server is working correctly.
// app.get('/test', (req, res) => {
//   res.json({ message: "API is working!" });
// });
app.use("/users", userRoutes);
app.use("/files", uploadRoutes); // Upload-related routes

// Serve uploaded files
app.use("/uploads", express.static(path.join("uploads")));

//Start Server
app.listen(PORT, () => {
  console.log(`Node server is running on PORT ${PORT}`);
});
