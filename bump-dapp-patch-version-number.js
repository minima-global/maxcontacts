var fs = require('fs')

const dappConfPath = __dirname + '/public/dapp.conf'

fs.readFile(dappConfPath, 'utf8', (err, data) => {
    if (err) throw err
    const config = JSON.parse(data)
    const major = parseInt(config.version.split('.')[0])
    const minor = parseInt(config.version.split('.')[1])
    let patch = parseInt(config.version.split('.')[2])

    patch++

    config.version = `${major}.${minor}.${patch}`

    fs.writeFile(dappConfPath, JSON.stringify(config), function (err) {
        if (err) throw err
        console.log('Saved delete version: ' + config.version)
    })
})
