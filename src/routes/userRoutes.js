const express = require('express');
const { getAllUsers, getUserById, createUser, updateUserById, deleteAllUsers, deleteUserById } = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res) => {
    getAllUsers(req, res);
});

router.get('/:id', (req, res) => {
    getUserById(req, res);
});

router.post('/', (req, res) => {
    createUser(req, res);
});

router.patch('/:id', (req, res) => {
    updateUserById(req, res);
});

router.delete('/', (req, res) => {
    deleteAllUsers(req, res);
});

router.delete('/:id', (req, res) => {
    deleteUserById(req, res);
});

module.exports = router;