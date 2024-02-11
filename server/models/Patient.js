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
    birthdate: {
        type: Sequelize.DATE,
        // allowNull: false,
    },
    reason: {
        type: Sequelize.STRING,
    },
    symptoms: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    treatment: {
        type: Sequelize.TEXT,
    },
    temperature: {
        type: Sequelize.DOUBLE,
    },
    bloodPressure: {
        type: Sequelize.STRING,
    },
    heartRate: {
        type: Sequelize.INTEGER,
    },
    allergies: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    medications: {
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
    notes: {
        type: Sequelize.TEXT,
    }
});

module.exports = {
    db, 
    Patient
};
