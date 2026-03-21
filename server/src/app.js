const express = require("express")
const cookieParser = require("cookie-parser")
const postRouter = require("./routes/task.routes")
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const morgan = require("morgan")
const cors = require("cors")
const app = express();

//Built in middlewares

const allowedOrigins = [
    "http://localhost:5173",
    "https://task-manager-phi-five-12.vercel.app",
    "https://task-flow-xi-lemon.vercel.app",
    "https://task-flow-xi-lemon.vercel.app/"

    // BLACKBOXAI: Fixed CORS for Vercel frontend -> Render backend deploys. Trailing / removed for standard origin matching.
]
app.use(cors({
  origin: function (origin, callback) {

    console.log("Incoming origin:", origin); // optional debug

    // allow requests like Postman (no origin)
    if (!origin) return callback(null, true);

    // ✅ allow all vercel domains (temporary or permanent)
    if (origin.includes("vercel.app")) {
      return callback(null, true);
    }

    // ✅ strict match for others
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(morgan("dev"))

app.use('/task', postRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

module.exports = app;