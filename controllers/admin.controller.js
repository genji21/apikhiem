const { connection } = require('../database')
const Movie = require('../models/movies.model')
const Category = require('../models/movies.categories')
const Blogs = require('../models/movies.blogs')
const { convertToYYYYMMDD } = require('../utils/mongoose')

const Confirm = require('prompt-confirm');
const { find } = require('../models/movies.model')
const e = require('express')


module.exports.index = (req, res) => {
    res.redirect('list');
}
module.exports.listMovies = async(req, res) => {
    try {
        const categories = await Category.find({});
        const movies = await Movie.find({});
        res.render('sanpham', {
            layout: 'sanpham',
            movies: movies,
            categories: categories
        })
    } catch (err) {
        console.log(err)
    }
}
module.exports.newMovie = async(req, res) => {
    try {
        const categories = await Category.find({})
        res.render('sanphamadd', {
            layout: 'sanphamadd',
            categories: categories,
            pageTitle: 'thêm sản phẩm'
        });
    } catch (err) {
        console.log(err)
    }
}
module.exports.postMovie = async(req, res) => {
    var { image, name, category, price, stock } = req.body;
    let values = { image, name, category, price, stock }
    try {
        let newMovie = new Movie(values)
        await newMovie.save();
    } catch (err) {
        console.log(err)
    }
    res.redirect('/admin/list')

}
module.exports.editMovie = async(req, res) => {
    var id = req.params.id;
    try {
        const categories = await Category.find({});
        const movie = await Movie.findOne({ _id: id });
        var premiere = convertToYYYYMMDD(movie.premiere)
        res.render('sanphamedit', {
            layout: 'sanphamedit',
            dataedit: movie,
            premiere,
            categories: categories,
        })
    } catch (err) {
        console.log(err)
    }

}
module.exports.postEditMovie = async(req, res) => {
    try {
        var id = req.body.id;
        var { image, name, category, price, stock } = req.body;
        var values = { image, name, category, price, stock }
        console.log(values)
        await Movie.findOneAndUpdate({ _id: id }, values, function(err, data) {
            if (err) console.log(err)
            res.redirect('/admin/list')
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.deleteMovie = async(req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findByIdAndRemove({ _id: id })
        res.redirect('/admin/list')
    } catch (err) {
        console.log(err)
    }
}

module.exports.listCate = async(req, res) => {

    try {
        const categories = await Category.find({});
        res.render('danhmuc', {
            layout: 'danhmuc',
            categories: categories
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.addCate = async(req, res) => {
    try {
        const categories = await Category.find({})

        console.log(categories);
        res.render('danhmucadd', {
            layout: 'danhmucadd',
            categories: categories,
            pageTitle: 'thêm sản phẩm'
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports.postCate = async(req, res) => {
    var { title } = req.body;
    let values = { title }
    console.log(values);
    try {
        let newCate = new Category(values)
        await newCate.save();
    } catch (err) {
        console.log(err)
    }
    res.redirect('/admin/listcate')

}

module.exports.deleteCate = async(req, res) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndRemove({ _id: id })
        res.redirect('/admin/listcate')
    } catch (err) {
        console.log(err)
    }
}

module.exports.editCate = async(req, res) => {
    var id = req.params.id;
    try {
        const categories = await Category.findOne({ _id: id });
        res.render('danhmucedit', {
            layout: 'danhmucedit',
            categories: categories,
        })
    } catch (err) {
        console.log(err)
    }

}

module.exports.postEditCate = async(req, res) => {
    try {
        var id = req.body.id;
        var { title } = req.body;
        var values = { title }
        await Category.findOneAndUpdate({ _id: id }, values, function(err, data) {
            if (err) console.log(err)
            res.redirect('/admin/listcate')
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.listBlogs = async(req, res) => {
    try {

        const blogs = await Blogs.find({});
        res.render('blogs', {
            layout: 'blogs',
            blogs: blogs,
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.newBlog = async(req, res) => {
    try {
        const categories = await Category.find({})
        res.render('blogadd', {
            layout: 'blogadd',
            categories: categories,
        });
    } catch (err) {
        console.log(err)
    }
}
module.exports.postBlog = async(req, res) => {
    var { image, title, mota, content } = req.body;
    let values = { image, title, mota, content }
    try {
        let newBlogs = new Blogs(values)
        await newBlogs.save();
    } catch (err) {
        console.log(err)
    }
    res.redirect('/admin/listblogs')
}

module.exports.deleteBlog = async(req, res) => {
    try {
        const id = req.params.id;
        await Blogs.findByIdAndRemove({ _id: id })
        res.redirect('/admin/listblogs')
    } catch (err) {
        console.log(err)
    }
}

module.exports.editBlog = async(req, res) => {
    var id = req.params.id;
    try {
        const dataedit = await Blogs.findOne({ _id: id });
        res.render('blogedit', {
            layout: 'blogedit',
            dataedit: dataedit,
        })
    } catch (err) {
        console.log(err)
    }

}

module.exports.postEditBlog = async(req, res) => {
    try {
        var id = req.body.id;
        var { image, title, mota, content } = req.body;
        let values = { image, title, mota, content }
        await Blogs.findOneAndUpdate({ _id: id }, values, function(err, data) {
            if (err) console.log(err)
            res.redirect('/admin/listblogs')
        })
    } catch (err) {
        console.log(err)
    }
}


module.exports.listMoviesApi = async(req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (err) {
        console.log(err)
    }
}


module.exports.productDetailApi = async(req, res) => {

    var id = req.params.id;
    try {
        const movie = await Movie.findOne({ _id: id });
        res.json(movie);
    } catch (err) {
        console.log(err)
    }

}

module.exports.listCatesApi = async(req, res) => {
    try {
        const category = await Category.find({});
        res.json(category);
    } catch (err) {
        console.log(err)
    }
}


module.exports.cateDetailApi = async(req, res) => {

    var id = req.params.id;
    try {
        const category = await Category.findOne({ _id: id });
        res.json(category);
    } catch (err) {
        console.log(err)
    }

}

module.exports.productOfCate = async(req, res) => {

    var id = req.params.id;
    try {
        const products = await Movie.find({ category: id });
        res.json(products);
    } catch (err) {
        console.log(err)
    }

}

module.exports.listBlogApi = async(req, res) => {
    try {
        const blogs = await Blogs.find({});
        res.json(blogs);
    } catch (err) {
        console.log(err)
    }
}

module.exports.blogDetailApi = async(req, res) => {
    var id = req.params.id;
    try {
        const blog = await Blogs.findOne({ _id: id });
        res.json(blog);
    } catch (err) {
        console.log(err)
    }

}