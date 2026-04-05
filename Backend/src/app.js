const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://resumeforge.vmb.indevs.in"
    ],
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

// Health check endpoint to prevent Render from sleeping
app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is awake' });
});


module.exports = app