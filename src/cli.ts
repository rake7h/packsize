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
        console.time('init-cli');
        await init(projectRoot);
        console.timeEnd('init-cli');
        return;
      }
      case 'diff': {
        console.time('diff-cli');
        await diff(projectRoot);
        console.timeEnd('diff-cli');
        return;
      }
      case 'clean': {
        console.time('clean-cli');
        await clean(projectRoot);
        console.timeEnd('clean-cli');
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
