/** for local testing purpose only */

require('dotenv').config();
const { init } = require('./commands/init.js');
const { diff } = require('./commands/diff.js');

// init(process.env.REPO_PATH);
diff(process.env.REPO_PATH);
