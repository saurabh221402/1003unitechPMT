import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    Leader: {
        type: String,
        required: true,
    },
    projectTimePeriod: {
        type: Date,
    },
    projectMembers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            taskCompleted: {
                type: Number,
            }
        }
    ],
    isCompleted: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
