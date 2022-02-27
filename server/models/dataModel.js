const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    url: {type: String, required: true},
    thumnail: {type: String},
    username: {type: String},
    location: {type: String},
    date: {type: Date},
    user: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    },
    { timestamps: true }
)

// add plugin soft_delete
dataSchema.plugin(
    mongooseDelete,
    { 
        overrideMethods: 'all',
        deletedAt: true,
        deletedBy: true
    }
)

module.exports = mongoose.model('Datas', dataSchema);
