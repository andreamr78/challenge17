import mongoose from "mongoose";
//import connection from '../config/connection.js'
import db from '../config/connection.js'
import User from "../models/User.js";
import Thought from "../models/Thought.js";

const seedDB = async () => {
   // await connection;
    await db();
    console.log('db connected');

    await User.deleteMany({});
    await Thought.deleteMany({});
    
    const users = [
        {
            username: 'name-1',
            email: 'test_1@gmail.com'
        },
        {
            username: 'name-2',
            email: 'email_2@gmail.com'
        }
    ];
    const seedUsers = await User.insertMany(users);
    // console.log("Users: ", seedUsers)
    // console.log('users seeded');

    const thoughts = [
        {
            thoughtText: 'thoughttext user1',
            username: seedUsers[0].username,
            thoughtId: seedUsers[0]._id
            
        },
        {
            thoughtText: 'thoughttext user2',
            username: seedUsers[1].username,
            thoughtId: seedUsers[1]._id
        }
    ];

    await Thought.insertMany(thoughts);
    console.log('thoughts seeded');
    mongoose.connection.close();
    console.log('Database connection closed');
};

seedDB().catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
