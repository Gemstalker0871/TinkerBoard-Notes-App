import express from "express"
import 'dotenv/config'
import notesRoutes from "./routes/notesRoutes.routes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.middleware.js"
import path from "path"
import { fileURLToPath } from 'url';
import cors from 'cors'

const PORT = process.env.PORT



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()


app.use(cors())


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


if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../frontend/dist");

  app.use(express.static(distPath));

  app.get(/^\/(?!api).*/, (req, res) => {

    res.sendFile(path.join(distPath, "index.html"));
  });
}


connectDB().then(() => {
    app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
    })
})

