import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { projectName, Leader, projectTimePeriod, projectMembers, isCompleted } = req.body;

        const newProject = new Project({
            projectName,
            Leader,
            projectTimePeriod,
            projectMembers,
            isCompleted
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('projectMembers.user', 'name'); // Populating user details in projectMembers
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('projectMembers.user', 'name'); // Assuming User model has a 'name' field
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update project by ID
export const updateProject = async (req, res) => {
    try {
        const updatedData = req.body;
        const project = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete project by ID
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add members to the project
export const addProjectMember = async (req, res) => {
    try {
        const { userId, taskCompleted } = req.body;

        const user = await User.findById(userId); // Verify the user exists
        if (!user) {
            // console.log(userId);

            return res.status(404).json({ message: 'User not found' });
        }

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Add the new member to projectMembers
        project.projectMembers.push({
            user: userId,
            taskCompleted: taskCompleted || 0
        });

        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
