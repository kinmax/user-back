const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(`Error fetching user ${req.params.id}:`, err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, birthDate, city, state, country, password } = req.body;

        const newUser = new User({
            name,
            email,
            birthDate,
            city,
            state,
            country,
            password
        });
        const { v4: uuidv4 } = require('uuid');
        newUser.userId = uuidv4();

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const updateData = req.body;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        if (updateData.email || updateData.userId) {
            return res.status(400).json({ error: 'Email and userId cannot be updated' });
        }

        const updatedUser = await User.findOneAndUpdate({ userId }, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully!', user: updatedUser });
    } catch (error) {
        console.error(`Error updating user ${req.params.id}:`, error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'All users deleted successfully!' });
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteUserById = async (req, res) => {
    try {
        await User.findOneAndDelete({ userId: req.params.id });
        res.json({ message: 'User deleted successfully!' });
    } catch(error) {
        console.error(`Error deleting user ${req.params.id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteAllUsers,
    deleteUserById
};