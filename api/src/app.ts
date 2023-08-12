import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"; // Import the cors middleware
import scoreRoutes from "./routes/scoreRoutes";

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Use the cors middleware to enable CORS
app.use(cors());

// Routes
app.use("/api", scoreRoutes);

// Connect to MongoDB
const MONGODB_URI =
  "mongodb+srv://koftov:koftovkoftov@cluster0.4e7ky.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
