require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const exphbs  = require('express-handlebars');
const path    = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/config'); // Your Sequelize config

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars setup
const hbs = exphbs.create({ /* helpers if needed */ });

// Session setup
const sess = {
  secret: process.env.SESSION_SECRET || 'SuperSecretSessionKey',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Use Handlebars for templating
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes
app.use(routes);

// Sync sequelize then start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
