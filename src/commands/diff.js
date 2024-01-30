// genererate new sizeconfig and compare the hash
const fs = require('fs')
const { detailedDiff: diffCheck } = require('deep-object-diff')

const diff = async (directory) => {
  const { listPackages } = require('../helpers/packages')
  const { readSizeFile } = require('../helpers/fs')

  const WSPackage = require(`${directory}/package.json`)
  global.WS = directory
  global.WSPKG = WSPackage
  global.CONFIG_FILE = 'packsize.config.json'

  if (!fs.existsSync(`${directory}/${CONFIG_FILE}`)) {
    console.info('No packsize config present, run > packsize init')
  }

  const originalConfig = await readSizeFile({
    location: `${directory}/${CONFIG_FILE}`
  })

  const updatedConfig = await listPackages(directory)

  const originalHash = originalConfig.hash
  const updatedHash = updatedConfig.hash

  if (originalHash === updatedHash) {
    console.info('No changes!!')
  } else {
    console.log(
      JSON.stringify(diffCheck(originalConfig, updatedConfig), null, 2)
    )
    console.error('Some Changes Found!!')
  }
}

module.exports = { diff }
