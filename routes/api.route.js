const express = require('express');
const router = express.Router();
var upload = require('../multer')


const controllerAdmin = require('../controllers/admin.controller')

//product api
router.get('/allproducts', controllerAdmin.listMoviesApi);
router.get('/prodetail/:id', controllerAdmin.productDetailApi);
router.get('/productofcate/:id', controllerAdmin.productOfCate);

// cate api
router.get('/allcates', controllerAdmin.listCatesApi);
router.get('/catedetail/:id', controllerAdmin.cateDetailApi);

// blogs api
router.get('/allblogs', controllerAdmin.listBlogApi);
router.get('/blogdetail/:id', controllerAdmin.blogDetailApi);


module.exports = router;