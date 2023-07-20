
new Promise(function (a, r) {
    a(12)
}).then((data) => {
    console.log(data)
    return Promise.resolve("sdfsdfsdf")
}).then((data) => {
    console.log(data)
    return 1232
}).catch((err) => {
    console.log(err)
})
//TODO: sdfasd
//Fi: sdfasd
