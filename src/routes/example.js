const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userController = {
    getAllUsers: async (req, res) => {
        const users = await prisma.users.findMany();
        console.log('Fetching all users from database');
        res.status(200).json(users);
    },

    getUserById: (req, res) => {
        const { id } = req.params;
        console.log(`Fetching user with id: ${id}`);
        res.status(200).json({ message: `Endpoint untuk mendapatkan pengguna dengan ID: ${id}` });
    },

    createUser: (req, res) => {
        const userData = req.body;
        console.log('Creating a new user with data:', userData);
        res.status(201).json({ message: 'Pengguna berhasil dibuat', data: userData });
    },

    updateUser: (req, res) => {
        const { id } = req.params;
        const userData = req.body;
        console.log(`Updating user with id: ${id} with data:`, userData);
        res.status(200).json({ message: `Pengguna dengan ID: ${id} berhasil diperbarui`, data: userData });
    },

    deleteUser: (req, res) => {
        const { id } = req.params;
        console.log(`Deleting user with id: ${id}`);
        res.status(200).json({ message: `Pengguna dengan ID: ${id} berhasil dihapus` });
    }
};

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

router.get('/users/:id', userController.getUserById); l
router.put('/users/:id', userController.updateUser); 
router.delete('/users/:id', userController.deleteUser); 

module.exports = router;