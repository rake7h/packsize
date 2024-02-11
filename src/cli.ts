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

(async () => {
  if (input.length === 1) {
    switch (input[0]) {
      case 'init': {
        console.time('Done in');
        await init(projectRoot);
        console.timeEnd('Done in');
        return;
      }
      case 'diff': {
        console.time('Done in');
        await diff(projectRoot);
        console.timeEnd('Done in');
        return;
      }
      case 'clean': {
        console.time('Done in');
        await clean(projectRoot);
        console.timeEnd('Done in');
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
