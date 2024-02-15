import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "bestar9772@outlook.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "johndoe211@outlook.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: "Anna",
        email: "anna628@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }
]

export default users;