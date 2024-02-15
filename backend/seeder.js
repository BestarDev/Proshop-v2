import colors from 'colors'
import connectDB from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'

connectDB();

const seedData = async() => {
    try {
        await User.deleteMany();
        await Order.deleteMany();
        await Product.deleteMany();

        const createdUser = await User.insertMany(users);
        const adminUser = createdUser[0]._id;
        const sampleProducts = products.map(product => (
            {...product, user: adminUser}
        ));
        await Product.insertMany(sampleProducts);
        console.log('Data has been planted'.green.inverse);
        process.exit();
    } catch (error) {
        console.log('Error while seeding data'.red.inverse);
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data has been removed'.yellow.inverse);
        process.exit();
    } catch (error) {
        console.log('Error while removing data'.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] == '-d')
    destroyData();
else
    seedData();