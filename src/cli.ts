import meow from 'meow';
import { init } from './commands/init';
import { diff } from './commands/diff';
import { clean } from './commands/clean';

class CommandNotFoundError extends Error {}

const { input } = meow(
  `
Usage
  $ packsize [command]
Commands
  init         initialise a the packsize config
  diff         check the diff of original and updated size config
  clean        remove all .packsize.json file from packages
`,
  {}
);

const projectRoot = process.env.PACKSIZE_PROJECT_ROOT || process.cwd();

console.log('projectRoot', process.env.PACKSIZE_PROJECT_ROOT);


(async () => {
  if (input.length === 1) {
    switch (input[0]) {
      case 'init': {
        await init(projectRoot);
        return;
      }
      case 'diff': {
        await diff(projectRoot);
        return;
      }
      case 'clean': {
        await clean(projectRoot);
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
