require('dotenv').config();
const { init } = require('./commands/init');

init(process.env.REPO_PATH);
