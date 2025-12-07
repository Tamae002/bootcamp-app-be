const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Idealnya, instance ini dibuat di satu tempat dan di-share

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await prisma.users.findMany();
            console.log('Fetching all users from database');
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    },

    getUserById: (req, res) => {
        const { id } = req.params;
        console.log(`Fetching user with id: ${id}`);
        // TODO: Implementasi logika untuk mengambil user dari database
        res.status(200).json({ message: `Endpoint untuk mendapatkan pengguna dengan ID: ${id}` });
    },

    createUser: (req, res) => {
        const userData = req.body;
        console.log('Creating a new user with data:', userData);
        // TODO: Implementasi logika untuk menyimpan user ke database
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

module.exports = userController;
