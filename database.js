const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const urlDB = "mongodb+srv://khiem:khiemtran@123@cluster0.34vwq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection
    .once("open", () => {
        console.log("Database connected...");
    })
    .catch((err) => {
        console.log("Connection failed...");
    });

module.exports = { connection };


// tài khoản mongoosee
// tk:khiem
// mk:khiemtran@123