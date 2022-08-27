const { req, options, data } = require("./test");
// req.on('error', error => {
//     console.error(error)
// })

req.write(data)
req.end()