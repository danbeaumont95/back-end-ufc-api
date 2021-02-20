const request = require('supertest')

const app = require('../app')
const connection = require('../db/connection')

afterAll(() => {
    return connection.destroy()
})

beforeEach(() => {
    return connection.seed.run()
})

describe('/api', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api')
        .expect(200)
    })
})

describe('/api/fighters', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/fighters')
        .expect(200)
    })
    test('GET:200 responds with array of all fighters', () => {
        return request(app)
        .get('/api/fighters')
        .expect(200)
        .then(({ body }) => {
            expect(body.fighters).toHaveLength(3)
            expect(body.fighters[0]).toEqual(expect.objectContaining({
                first_name: expect.any(String),
                surname: expect.any(String),
                full_name: expect.any(String),
                weight: expect.any(String),
                age: expect.any(Number),
                dob: expect.any(String),
                champ_status: expect.any(String),
                next_fight: expect.any(String),
            }))
        })
    })
})

describe('/api/fighters/:full_name', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/fighters/ConorMcgregor')
        .expect(200)
    })
    test('GET:200 responds with correct fighter based on passed parameter Mcgregor', () => {
        return request(app)
        .get('/api/fighters/ConorMcgregor')
        .expect(200)
        .then(({ body: { fighter } }) => {
            expect(fighter).toEqual(
                expect.objectContaining({
                first_name: 'Conor',
                surname: 'Mcgregor',
                full_name: 'ConorMcgregor',
                weight: 'Lightweight',
                age: 32,
                dob: '14/07/88',
                champ_status: 'NA',
                next_fight:'TBA'
            }))
        })
    })
    test('GET:200 responds with correct fighter based on passed parameter Masvidal', () => {
        return request(app)
        .get('/api/fighters/JorgeMasvidal')
        .expect(200)
        .then(({ body: { fighter } }) => {
            expect(fighter).toEqual(
                expect.objectContaining({
                    first_name: 'Jorge',
                    surname: 'Masvidal',
                    full_name: 'JorgeMasvidal',
                    weight: 'Welterweight',
                    age: 36,
                    dob: '12/11/84',
                    champ_status: 'BMF champ',
                    next_fight: 'TBA'
            }))
        })
    })
})

describe('/api/fighters/weight/:weight', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/fighters/weight/Lightweight')
        .expect(200)
    })
    test('GET:200 responds with fighters depending on passed weight parameter', () => {
        return request(app)
        .get('/api/fighters/weight/Welterweight')
        .expect(200)
        .then(({ body: { fighters } }) => {
            expect(fighters).toEqual(
                
                   [{ first_name: 'Jorge',
                    surname: 'Masvidal',
                    full_name: 'JorgeMasvidal',
                    weight: 'Welterweight',
                    age: 36,
                    dob: '12/11/84',
                    champ_status: 'BMF champ',
                    next_fight: 'TBA'
                }]
            )
        })
    })
    test('GET:200 responds with fighters depending on passed weight parameter Lightweight', () => {
        return request(app)
        .get('/api/fighters/weight/Lightweight')
        .expect(200)
        .then(({ body: { fighters } }) => {
            expect(fighters).toEqual(
                
                   [{ first_name: 'Conor',
                    surname: 'Mcgregor',
                    full_name: 'ConorMcgregor',
                    weight: 'Lightweight',
                    age: 32,
                    dob: '14/07/88',
                    champ_status: 'NA',
                    next_fight: 'TBA'
                }]
            )
        })
    })
})

describe('/api/fighters/champions/champ_status', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/fighters/champions/champ_status')
        .expect(200)
    })
    test('GET:200 responds with correct fighters that are champions', () => {
        return request(app)
        .get('/api/fighters/champions/champ_status')
        .expect(200)
        .then(({ body: { fighters } }) => {
            expect(fighters).toEqual(
                
                   [{
                    first_name: 'Jorge',
                    surname: 'Masvidal',
                    full_name: 'JorgeMasvidal',
                    weight: 'Welterweight',
                    age: 36,
                    dob: '12/11/84',
                    champ_status: 'BMF champ',
                    next_fight: 'TBA'
                },
                {
                    first_name: 'Israel',
                    surname: 'Adesanya',
                    full_name: 'IsraelAdesanya',
                    weight: 'Middleweight',
                    age: 31,
                    dob: '22/07/89',
                    champ_status: 'Middleweight champ',
                    next_fight: 'Jan Blachowicz'
                }]
            )
        })
    })
})

describe('/api/staff', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/staff')
        .expect(200)
    })
    test('GET: 200 responds with all staff members', () => {
        return request(app)
        .get('/api/staff')
        .expect(200)
        .then(({ body }) => {
            expect(body.staff).toHaveLength(3)
            expect(body.staff[0]).toEqual(expect.objectContaining({
                first_name: expect.any(String),
                surname: expect.any(String),
                full_name: expect.any(String), 
                age: expect.any(Number),
                role: expect.any(String),
                years_at_company: expect.any(Number),
            }))
        })
    })
})

describe('/api/staff/:full_name', () => {
    test('GET:200 responds with correct status code', () => {
        return request(app)
        .get('/api/staff/DanaWhite')
        .expect(200)
    })
    test('GET:200 responds with correct ufc staff member', () => {
        return request(app)
        .get('/api/staff/DanaWhite')
        .expect(200)
        .then(({ body: { staff } }) => {
            expect(staff).toEqual(
                expect.objectContaining({
                first_name: 'Dana',
                surname: 'White',
                full_name: 'DanaWhite',
                age: 51,
                role: 'President of UFC',
                years_at_company: 20
            }))
        })
    })
})