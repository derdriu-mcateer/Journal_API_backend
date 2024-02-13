import { EntryModel, closeConnection, CategoryModel } from "./db.js"

const seedDatabase = async () => {
    try {
        await CategoryModel.deleteMany();
        console.log('Deleted categories');

        const categories = [
            { name: 'Food' },
            { name: 'Gaming' },
            { name: 'Coding' },
            { name: 'Other' }
        ];

        const cats = await CategoryModel.insertMany(categories);
        console.log('Added categories');

        await EntryModel.deleteMany();
        console.log('Deleted entries');

        const entries = [
            { category: cats[0], content: 'Pizza is yummy!' },
            { category: cats[2], content: 'Coding is fun!' },
            { category: cats[1], content: 'Skyrim is for the Nords' }
        ];

        await EntryModel.insertMany(entries);
        console.log('Added entries');
    } catch (error) {
        console.error('Error during seeding:', error.message);
    } finally {
        closeConnection();
    }
};

// Connect to the database and run the seeding logic
seedDatabase()