const express = require('express');
const router = express.Router();
var upload = require('../multer')


const controllerAdmin = require('../controllers/admin.controller')

router.get('/', controllerAdmin.index);
//product
router.get('/list', controllerAdmin.listMovies);
router.get('/product/add', controllerAdmin.newMovie);
router.post('/product/add', controllerAdmin.postMovie);
router.get('/product/edit/:id', controllerAdmin.editMovie);
router.post('/product/edit/:id', controllerAdmin.postEditMovie);
router.get('/product/delete/:id', controllerAdmin.deleteMovie);


//categories
router.get('/listcate', controllerAdmin.listCate);
router.get('/cate/add', controllerAdmin.addCate);
router.post('/cate/add', controllerAdmin.postCate);
router.get('/cate/edit/:id', controllerAdmin.editCate);
router.post('/cate/edit/:id', controllerAdmin.postEditCate);
router.get('/cate/delete/:id', controllerAdmin.deleteCate);

//blog
router.get('/listblogs', controllerAdmin.listBlogs);
router.get('/blog/add', controllerAdmin.newBlog);
router.post('/blog/add', controllerAdmin.postBlog);
router.get('/blog/edit/:id', controllerAdmin.editBlog);
router.post('/blog/edit/:id', controllerAdmin.postEditBlog);
router.get('/blog/delete/:id', controllerAdmin.deleteBlog);


module.exports = router;