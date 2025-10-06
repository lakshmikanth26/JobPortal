import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin dekhega kitne user ne apply kia hai
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// New endpoint to filter resumes based on requirements
export const filterResumes = async (req, res) => {
    try {
        const { jobId, requirement } = req.body;
        
        if (!jobId || !requirement) {
            return res.status(400).json({
                message: 'Job ID and requirement are required',
                success: false
            });
        }

        // Get all applicants for the job
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        }

        // Parse the requirement string
        const requirementLower = requirement.toLowerCase();
        
        // Extract skills, experience, and keywords from requirement
        const extractNumbers = (text) => {
            const matches = text.match(/\d+/g);
            return matches ? matches.map(Number) : [];
        };

        const numbers = extractNumbers(requirementLower);
        const experienceYears = numbers.length > 0 ? numbers[0] : null;

        // Check for fresher keywords
        const isFresher = /\b(fresher|0\s*year|no\s*experience|entry\s*level|graduate)\b/i.test(requirementLower);
        
        // Filter applicants based on requirement
        const filteredApplicants = job.applications.filter(application => {
            const applicant = application.applicant;
            if (!applicant) return false;

            const skills = applicant.profile?.skills || [];
            const bio = (applicant.profile?.bio || '').toLowerCase();
            const skillsString = skills.join(' ').toLowerCase();
            const combinedText = `${skillsString} ${bio}`.toLowerCase();

            // Check if it's a fresher search
            if (isFresher) {
                // Look for freshers or people with 0-1 years experience
                const hasLowExperience = /\b(fresher|0\s*year|no\s*experience|entry\s*level|graduate)\b/i.test(combinedText);
                const experienceMatches = combinedText.match(/(\d+)\s*(?:\+)?\s*(?:year|yr)/gi);
                const maxExperience = experienceMatches 
                    ? Math.max(...experienceMatches.map(m => parseInt(m.match(/\d+/)[0])))
                    : 0;
                
                return hasLowExperience || maxExperience <= 1;
            }

            // Extract technology/skill keywords from requirement
            const techKeywords = requirementLower
                .split(/[\s,]+/)
                .filter(word => 
                    word.length > 2 && 
                    !['and', 'or', 'with', 'the', 'experience', 'years', 'year', 'skills', 'skill'].includes(word)
                );

            // Check if any tech keyword matches skills or bio
            const hasSkillMatch = techKeywords.some(keyword => 
                combinedText.includes(keyword)
            );

            // Check experience if specified
            let hasExperienceMatch = true;
            if (experienceYears !== null) {
                // Look for experience years in bio
                const experienceMatches = combinedText.match(/(\d+)\s*(?:\+)?\s*(?:year|yr)/gi);
                if (experienceMatches) {
                    const candidateExperience = Math.max(
                        ...experienceMatches.map(match => {
                            const num = parseInt(match.match(/\d+/)[0]);
                            return num;
                        })
                    );
                    
                    // Allow some flexibility (±1 year)
                    hasExperienceMatch = Math.abs(candidateExperience - experienceYears) <= 1;
                } else {
                    // If no experience mentioned, don't match if experience is required
                    hasExperienceMatch = false;
                }
            }

            return hasSkillMatch && hasExperienceMatch;
        });

        return res.status(200).json({
            message: `Found ${filteredApplicants.length} matching candidates`,
            filteredApplicants: filteredApplicants,
            totalApplicants: job.applications.length,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while filtering resumes',
            success: false
        });
    }
};

// Filter resumes across all jobs for a recruiter
export const filterAllResumes = async (req, res) => {
    try {
        const { requirement } = req.body;
        
        if (!requirement) {
            return res.status(400).json({
                message: 'Requirement is required',
                success: false
            });
        }

        // Get all jobs with applications (search across ALL jobs in the system)
        const jobs = await Job.find({}).populate({
            path: 'applications',
            populate: {
                path: 'applicant'
            }
        });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: 'No jobs found in the system',
                success: false
            });
        }

        // Parse the requirement string
        const requirementLower = requirement.toLowerCase();
        
        // Extract skills, experience, and keywords from requirement
        const extractNumbers = (text) => {
            const matches = text.match(/\d+/g);
            return matches ? matches.map(Number) : [];
        };

        const numbers = extractNumbers(requirementLower);
        const experienceYears = numbers.length > 0 ? numbers[0] : null;

        // Check for fresher keywords
        const isFresher = /\b(fresher|0\s*year|no\s*experience|entry\s*level|graduate)\b/i.test(requirementLower);
        
        // Collect all applications from all jobs
        const allApplications = [];
        const matchingJobs = [];

        jobs.forEach(job => {
            if (job.applications && job.applications.length > 0) {
                job.applications.forEach(application => {
                    allApplications.push({
                        ...application.toObject(),
                        jobTitle: job.title,
                        jobId: job._id,
                        company: job.company
                    });
                });
            }
        });

        // Filter applicants based on requirement
        const filteredApplicants = allApplications.filter(application => {
            const applicant = application.applicant;
            if (!applicant) return false;

            const skills = applicant.profile?.skills || [];
            const bio = (applicant.profile?.bio || '').toLowerCase();
            const skillsString = skills.join(' ').toLowerCase();
            const combinedText = `${skillsString} ${bio}`.toLowerCase();

            // Check if it's a fresher search
            if (isFresher) {
                const hasLowExperience = /\b(fresher|0\s*year|no\s*experience|entry\s*level|graduate)\b/i.test(combinedText);
                const experienceMatches = combinedText.match(/(\d+)\s*(?:\+)?\s*(?:year|yr)/gi);
                const maxExperience = experienceMatches 
                    ? Math.max(...experienceMatches.map(m => parseInt(m.match(/\d+/)[0])))
                    : 0;
                
                return hasLowExperience || maxExperience <= 1;
            }

            // Extract technology/skill keywords from requirement
            const techKeywords = requirementLower
                .split(/[\s,]+/)
                .filter(word => 
                    word.length > 2 && 
                    !['and', 'or', 'with', 'the', 'experience', 'years', 'year', 'skills', 'skill'].includes(word)
                );

            // Check if any tech keyword matches skills or bio
            const hasSkillMatch = techKeywords.some(keyword => 
                combinedText.includes(keyword)
            );

            // Check experience if specified
            let hasExperienceMatch = true;
            if (experienceYears !== null) {
                const experienceMatches = combinedText.match(/(\d+)\s*(?:\+)?\s*(?:year|yr)/gi);
                if (experienceMatches) {
                    const candidateExperience = Math.max(
                        ...experienceMatches.map(match => {
                            const num = parseInt(match.match(/\d+/)[0]);
                            return num;
                        })
                    );
                    
                    // Allow some flexibility (±1 year)
                    hasExperienceMatch = Math.abs(candidateExperience - experienceYears) <= 1;
                } else {
                    hasExperienceMatch = false;
                }
            }

            if (hasSkillMatch && hasExperienceMatch) {
                // Track which jobs have matching applicants
                if (!matchingJobs.find(j => j._id.toString() === application.jobId.toString())) {
                    matchingJobs.push({
                        _id: application.jobId,
                        title: application.jobTitle
                    });
                }
                return true;
            }

            return false;
        });

        return res.status(200).json({
            message: `Found ${filteredApplicants.length} matching candidates across ${matchingJobs.length} jobs`,
            filteredApplicants: filteredApplicants,
            matchingJobs: matchingJobs,
            totalApplicants: allApplications.length,
            totalJobs: jobs.length,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while filtering resumes',
            success: false
        });
    }
};
