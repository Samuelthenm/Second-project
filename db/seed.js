// db/seed.js

const sequelize = require('../config/config'); // Your Sequelize instance
const { User, Post } = require('../models');  // Your models

// Sample user data
const userData = [
  {
    username: 'alice',
    password: 'password123'
  },
  {
    username: 'bob',
    password: 'password123'
  },
  {
    username: 'charlie',
    password: 'password123'
  }
];

// Sample post data
const postData = [
  {
    title: 'Hello from Alice',
    body: 'This is my first post!',
    // user_id will be assigned after the users are created
  },
  {
    title: 'Bob’s Travel Tips',
    body: 'Here are the top 10 places you must visit...',
  },
  {
    title: 'Charlie’s Coding Journey',
    body: 'Today I learned about Sequelize and MVC patterns.',
  }
];

const seedDatabase = async () => {
  try {
    // Connect to the database
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    // Create users
    const users = await User.bulkCreate(userData, {
      individualHooks: true, // needed so that the beforeCreate hook (bcrypt hashing) runs for each user
      returning: true
    });
    console.log('\n----- USERS SEEDED -----\n');

    // Create posts
    // We’ll randomly assign each post to one of the newly created users
    for (let post of postData) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Post.create({
        ...post,
        user_id: randomUser.id
      });
    }
    console.log('\n----- POSTS SEEDED -----\n');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
