const meow = require('meow');
const { init } = require('./commands/init');
const { diff } = require('./commands/diff');

let { input } = meow(
  `
Usage
  $ packsize [command]
Commands
  init         initialise a the packsize config
  diff         check the diff of original and updated size config
`,
  {}
);

let errors = {
  commandNotFound: 'Command not found',
};

class CommandNotFoundError extends Error {}

(async () => {
  if (input.length === 1) {
    switch (input[0]) {
      case 'init': {
        await init(process.cwd());
        return;
      }
      case 'diff': {
        await diff(process.cwd());
        return;
      }
      default: {
        throw new CommandNotFoundError();
      }
    }
  } else {
    throw new CommandNotFoundError();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
