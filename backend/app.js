// const dotenv = require('dotenv')
// dotenv.config();
// const cookieparser = require('cookie-parser')
// const path = require('path')
// const express = require('express');
// const cors = require('cors')
// const app = express()
// const connectToDB = require('./db/db.js')
// const userRoutes = require('./Routes/user.routes.js')
// const captainRoutes = require('./Routes/captain.routes.js')
// const mapsRoutes = require('./Routes/maps.routes.js')
// const rideRoutes = require('../backend/Routes/ride.routes.js')
// const morgan = require('morgan');
// app.use(morgan('dev'))

// connectToDB()
// // app.use(cors())
// app.use(
//   cors({
//     origin: [
//       "https://ride-share-co4qsdvcq-ashish-maheshwaris-projects-ac4f06a6.vercel.app",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//   }),
// );
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(cookieparser())

// app.use('/users',userRoutes)
// app.use('/captains',captainRoutes)
// app.use('/maps',mapsRoutes)
// app.use('/rides',rideRoutes)

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

// module.exports=app;

const dotenv = require("dotenv");
dotenv.config();
const cookieparser = require("cookie-parser");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./db/db.js");
const userRoutes = require("./Routes/user.routes.js");
const captainRoutes = require("./Routes/captain.routes.js");
const mapsRoutes = require("./Routes/maps.routes.js");
const rideRoutes = require("../backend/Routes/ride.routes.js");
const morgan = require("morgan");

app.use(morgan("dev"));
connectToDB();

// Dynamic CORS configuration
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser calls (Postman, server-to-server) where origin is undefined
    if (!origin) return callback(null, true);

    // Allow local development domains
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Allow ANY deployment or preview URL under your Vercel project
    if (/^https:\/\/ride-share.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    callback(null, true); // Fallback: pass-through if needed, or throw error
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  credentials: true,
};

// 1. Apply CORS to all routes
app.use(cors(corsOptions));

// 2. Handle HTTP OPTIONS preflight requests explicitly
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;