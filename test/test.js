const https = require('https')

const data = JSON.stringify({
    phone: '918610141355',
    token: "d2b447ac23788d30022402b2d4349990ba19dfcd",
    text: "sup"
})

const options = {
    hostname: 'whin.inutil.info',
    port: 443,
    path: '/whin',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})
module.exports = { req, options, data }

