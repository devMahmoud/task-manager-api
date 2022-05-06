const mongoose = require("mongoose")
/*
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
*/

mongoose.connect(process.env.MONGODB_URL, err => {
    if(err) throw err;
    console.log('connected to MongoDB')
})


