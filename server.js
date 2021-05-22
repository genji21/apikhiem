require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const router = express.Router();

/* Router */


const adminRouter = require('./routes/admin.route');
const apiRouter = require('./routes/api.route');
/* set */
app.set('views', './views');
app.set('view engine', 'ejs');
app.set("layout admin", false);
/* use */
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use(express.urlencoded({
    extended: true
}))
app.use(expressLayouts);

app.use('/api', apiRouter)

app.use('/admin', adminRouter);


app.get('*', function(req, res, next) {
    res.render('notFound', {
        pageTitle: 'Không tìm thấy trang'
    })
});

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`App is listening on port ${port}`));