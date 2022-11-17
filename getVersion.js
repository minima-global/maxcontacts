const fs = require('fs')

const dappConfPath = __dirname + '/public/dapp.conf'

const data = fs.readFileSync(dappConfPath, { encoding: 'utf8', flag: 'r' })

const config = JSON.parse(data)

// console.log(config.version)

process.stdout.write(config.version)
