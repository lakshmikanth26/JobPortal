import express from "express";
import isAuthentication from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus, filterResumes, filterAllResumes } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthentication,applyJob);
router.route("/get").get(isAuthentication,getAppliedJobs);
router.route("/:id/applicants").get(isAuthentication,getApplicants);
router.route("/status/:id").post(isAuthentication,updateStatus);
router.route("/filter-resumes").post(isAuthentication,filterResumes);
router.route("/filter-all-resumes").post(isAuthentication,filterAllResumes);

export default router