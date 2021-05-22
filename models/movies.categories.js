const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { Timestamp } = require('mongodb');

const CategorySchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, slug: "title", require: true, index: true, unique: true }
}, { timestamps: true });
// a setter
CategorySchema.path('title').set(function(input) {
    return input[0].toUpperCase() + input.slice(1)
});
CategorySchema.plugin(slug);
CategorySchema.plugin(mongoose_fuzzy_searching, { fields: ['title'] });
module.exports = mongoose.model('Category', CategorySchema);