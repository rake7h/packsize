const meow = require('meow')
const { init } = require('./commands/init')
const { diff } = require('./commands/diff')

const { input } = meow(
  `
Usage
  $ packsize [command]
Commands
  init         initialise a the packsize config
  diff         check the diff of original and updated size config
`,
  {}
)

class CommandNotFoundError extends Error { }

const projectRoot = process.env.PACKSIZE_PROJECT_ROOT || process.cwd();

(async () => {
  if (input.length === 1) {
    switch (input[0]) {
      case 'init': {
        await init(projectRoot)
        return
      }
      case 'diff': {
        await diff(projectRoot)
        return
      }
      default: {
        throw new CommandNotFoundError()
      }
    }
  } else {
    throw new CommandNotFoundError()
  }
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
