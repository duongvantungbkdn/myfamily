const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: 
        {
            type: String,
            enum: ['GST','MEM','ADM1','ADM']
        }
    },
    { timestamps: true }
);

// add plugin soft_delete
usersSchema.plugin(
    mongooseDelete,
    { 
        overrideMethods: 'all',
        deletedAt: true
    }
)

module.exports = mongoose.model('Users', usersSchema);
