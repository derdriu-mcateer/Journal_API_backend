import {Router} from "express"
import { EntryModel, CategoryModel } from "../db.js"

const router = Router()

// Get all categories
router.get('/', async (req, res) => res.send(await CategoryModel.find()))

// Get single category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (category) {
            const entries = await EntryModel.find({ category: category._id });
            res.send({ category, entries });
        } else {
            res.status(404).send({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Create a new category
router.post('/', async(req, res) => {
    try {
        const newCategory = await CategoryModel.create(req.body)
        res.status(201).send(newCategory)
    } catch (error){
        res.status(500).send({ error: error.message })
    }
})

// Update a single category
router.put('/:id', async(req, res) => {
    try{
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(updatedCategory){
            res.send(updatedCategory)
        } else{
            res.status(404).send({error: 'Category not found'})
        }

    } catch(error){
        res.status(500).send({error: error.message})
    }
})

// Delete a category
router.delete('/:id', async(req, res) => {
    try{
        const deleteCategory = await CategoryModel.findByIdAndDelete(req.params.id)
        if(deleteCategory){
            res.json("Success : Category deleted")
        } else {
            res.status(404).send({error: 'Entry not found'})
        }
    } catch (error){
        res.status(500).send({error: error.message})
    }
})

export default router