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
    "https://modern-task-flow.vercel.app/",
]
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming origin:", origin);

    if (!origin) return callback(null, true);

    if (origin.includes("vercel.app")) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("/{*splat}", cors(corsOptions)); //Express 5 no longer accepts '*' as a wildcard route.

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(morgan("dev"))

app.use('/task', postRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

module.exports = app;