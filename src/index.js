const app = require("./app")
const port = process.env.PORT

/*
app.use((req, res) => {
    res.status(503).send("server under maintainance")
})
*/

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
