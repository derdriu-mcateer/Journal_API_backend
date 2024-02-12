import { Router } from "express"
import { EntryModel } from "../db.js"

const router = Router()

//Get all entries 
router.get('/', async (req, res) => res.send(await EntryModel.find().populate('category')))

// Get entry by id
router.get('/:id', async (req, res) => {
    const entry = await EntryModel.findById(req.params.id).populate('category')
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: 'Entry not found' })
    }
})

// Create a new entry 
router.post('/', async (req, res) => {
    try {
        const insertedEntry = await (await EntryModel.create(req.body)).populate('category')
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

 //Update an entry
router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (updatedEntry) {
            res.send(updatedEntry)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

//Delete an entry 
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id)
        if (deletedEntry) {
            res.sendStatus(204)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router


