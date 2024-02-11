const express = require('express');
const router = express.Router();
const { Patient } = require('../models/Patient');

// Get all patients
router.get('/', async (req, res, next) => {
    try {
        const patients = await Patient.findAll(); 
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients', error);
        next(error);
    }
});

// Create a patient
router.post('/', async (req, res, next) => {
    try {
        const newPatient = await Patient.create(req.body);
        res.json(newPatient);
    } catch (error) {
        console.error('Error creating patient', error);
        next(error);
    }
}); 

// Get patient by id
router.get('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findByPk(req.params.id); 
        res.json(patient);
    } catch (error) {
        console.error('Error fetching patient', error);
        next(error);
    }
});

// Update patient by id
router.put('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        await patient.update(req.body);
        res.json(patient);
    } catch (error) {
        console.error('Error updating patient', error);
        next(error);
    }
});

//Delete patient by id
router.delete('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        await patient.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting patient', error);
        next(error);
    }
});

module.exports = router;