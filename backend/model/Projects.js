const mongoose = require('mongoose');

const ProjectsSchema = mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: String,
        required: false,
        default: false
    },
    projectManagerId: {
        type: String,
        required: true
    },
    usersOnProject: {
        type: Array,
        required: false,
        default: []
    },
    tasks: [{
        taskTitle: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        } ,
        isCompleted: {
            type: Boolean,
            require: false,
            default: false
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true
        },
        subTaskID: {
            type: Array,
            default: []
        }
    }],
    columns: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true
        },
        columnTitle: {
            type: String,
            required: true
        },
        taskIds: {
            type: Array,
            required: false,
            default: []
        },
    }],
    columnOrder: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('projects', ProjectsSchema);