const init = async (directory) => {
  const { listPackages } = require('../helpers/packages')
  const { writeSizeFile } = require('../helpers/fs')

  const WSPackage = require(`${directory}/package.json`)
  global.WS = directory
  global.WSPKG = WSPackage
  global.CONFIG_FILE = 'packsize.config.json'

  const pkgsInfo = await listPackages(directory)
  writeSizeFile({ location: `${WS}/${CONFIG_FILE}`, content: pkgsInfo })

  console.info('packsize config initialised at root!')
}

module.exports = { init }
