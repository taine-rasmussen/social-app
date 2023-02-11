import express from 'express';
import bodyParser from 'body-parser';
;import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv'
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './Controllers/Auth.js'
import authRoutes from './Routes/Auth.js'

// CONFIG
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File storage config
// https://github.com/expressjs/multer
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "public/assets");
  },
  filename: function (req, file, cb){
    cb(null, file.originalname)
  }
});

const upload = multer({ storage })

// Routes with files
// use middleware to upload locally
app.post("/auth/register", upload.single("picture"), register);

// ROUTES
app.use('/auth', authRoutes);

// Mongoose config
const PORT = process.env.PORT || 6001
const URL = process.env.MONGO_URL

// removes console warning about changes on mongoose 7
mongoose.set('strictQuery', true);
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`))