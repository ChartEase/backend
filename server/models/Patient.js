const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/kair');

const Patient = db.define('Patient', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
    },
    birth: {
        type: Sequelize.DATE,
        // allowNull: false,
    },
    reason: {
        type: Sequelize.STRING,
    },
    symptoms: {
        type: Sequelize.STRING
    },
    treatment: {
        type: Sequelize.TEXT,
    },
    temperature: {
        type: Sequelize.INTEGER,
    },
    bloodPressure: {
        type: Sequelize.STRING,
    },
    heartRate: {
        type: Sequelize.STRING,
    },
    allergies: {
        type: Sequelize.STRING,
    },
    medications: {
        type: Sequelize.STRING,
    },
    notes: {
        type: Sequelize.TEXT,
    }
});

module.exports = {
    db, 
    Patient
};
