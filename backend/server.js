import express from "express"
import 'dotenv/config'
import notesRoutes from "./routes/notesRoutes.routes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.middleware.js"
import cors from 'cors'

const PORT = process.env.PORT


const app = express()

app.use(cors())

app.get('/', (req, res) => res.send("Api working"))
app.use("/api/notes", express.json(), rateLimiter ,notesRoutes)


// app.get("/api/notes", (req, res) => {
//     res.status(200).send("You have 5 notes")
// })

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({message:"Post created successfully"})
// })

// app.put("/api/notes", (req, res) => {
//     res.status(201).json({message:"Post updated successfully"})
// })

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(201).json({message:"Post deleted successfully"})
// })
connectDB().then(() => {
    app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
    })
})

