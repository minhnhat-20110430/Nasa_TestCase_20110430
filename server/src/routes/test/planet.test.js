const request = require('supertest');
const assert = require('assert');
const app = require('../../app');
const planetsRouter = require('../planets/planets.controller');
const {getAllPlanets} = require('../../models/planets.model');
const planets = getAllPlanets();

describe('GET allPlanets', () => {
    it('Should return status 200 and a list of habitable planets', async () => {
        const response = await request(app)
            .get('/planets');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        for(const planet of response.body) {
            expect(planet.koi_disposition).toBe('CONFIRMED')
            expect(planet.koi_insol).toBeGreaterThan(0.36)
            expect(planet.koi_insol).toBeLessThan(1.11)
            expect(planet.koi_prad).toBeLessThan(1.6)
        }
    })
})