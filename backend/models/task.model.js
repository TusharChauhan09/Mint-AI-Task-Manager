import { Schema , model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String, 
        require: true      
    },
    description: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true});

const Task = model("Task", taskSchema);

export default Task;
