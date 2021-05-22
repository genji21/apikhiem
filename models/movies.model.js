const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { Timestamp } = require('mongodb');

const MovieSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    slug: { type: String, slug: "name", unique: true }
}, { timestamps: true });
// a setter
MovieSchema.path('name').set(function(input) {
    return input[0].toUpperCase() + input.slice(1)
});

MovieSchema.plugin(slug);
MovieSchema.plugin(mongoose_fuzzy_searching, { fields: ['title'] });

module.exports = mongoose.model('Products', MovieSchema);