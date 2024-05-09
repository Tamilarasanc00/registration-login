const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    image:String
})


const FileModel = mongoose.model("files",FileSchema)

module.exports = FileModel