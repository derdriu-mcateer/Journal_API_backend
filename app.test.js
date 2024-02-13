import app from './app.js'
import request from 'supertest'

// app.get('/', (req, res) => res.send({ info: 'Journal API' }))
describe('App Test', () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toContain('json')
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Journal API')
    })

    describe('POST /entries', () => {
        let cats, res

        beforeAll(async () => {
            cats = await request(app).get('/categories')
            res = await request(app).post('/entries').send({
                category: cats.body[0]._id,
                content: 'Jest test content'
            })
        })

            test('Returns JSON with 201', async () => {
                expect(res.status).toBe(201)
                expect(res.header['content-type']).toContain('json')
            })

            test('Body has _id, category and content fields', async () => {
                expect(res.body._id).toBeDefined()
                expect(res.body.category).toBeDefined()
                expect(res.body.content).toBeDefined()
                
            })
            test('Category is an object with an id and name field', async () => {
                expect(res.body.category).toBeInstanceOf(Object)
                expect(res.body.category._id).toBeDefined()
                expect(res.body.category.name).toBeDefined()

            })

            test('Category has correct id and content', async () => {
                expect(res.body.category._id).toBe(cats.body[0]._id)
                expect(res.body.content).toBe('Jest test content')
                
            })

            afterAll(() => {
                request(app).delete(`/entires/${res.body._id}`)
            })


        })
        
    })

    describe('GET / categories', () => {
        let res

        beforeAll(async () => {
            res = await request(app).get('/categories')
        })

        test('Returns JSON content', () => {
            expect(res.status).toBe(200)
            expect(res.header['content-type']).toContain('json')
        })

        test('Returns an array', () => {
            expect(res.body).toBeInstanceOf(Array)
        })
        test('Array has 4 elements', () => {
            expect(res.body).toHaveLength(4)
        })
        test('Food', () => {
            expect(res.body[0].name).toBe('Food')
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: "Gaming" })]))
        })
    })
