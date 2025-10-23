
import Note from "../models/note.model.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message:"Unable to get notes", error: error.message})
    }
}


export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message:"Unable to get notes", error: error.message})
    }
}

export const createNotes = async (req, res) => {
    try {
        const {title, content} = req.body
        const note = new Note({title:title, content:content})

        const savedNote = await note.save()
        res.status(201).json({message:"Note created", savedNote })

    } catch (error) {
        res.status(500).json({message:"Unable to update notes", error: error.message})
    }
}

export const updateNotes = async (req, res) => {
    try {
        const {title, content} = req.body
        const newNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true})
        if (!newNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note updated", newNote })
    } catch (error) {
        res.status(500).json({message:"Unable to update notes", error: error.message})
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note deleted" })
    } catch (error) {
        res.status(500).json({message:"Unable to delete note", error: error.message})
    }
}