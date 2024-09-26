import express from "express";
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject, addProjectMember } from "../Controllers/projectControllers.js"

const router = express.Router();


router.route("/createProject").post(createProject);
router.route("/getAllProject").get(getAllProjects);
router.route("/getProject/:id").get(getProjectById);
router.route("/updateProject/:id").put(updateProject);
router.route("/deleteProject/:id").delete(deleteProject);
router.route("/:id/addMember").post(addProjectMember);



export default router;



