const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const Job = require("../models/Job");
const jwtAuth = require("../utils/jwtAuth");
const Recruiter = require("../models/Recruiter");
const { default: mongoose } = require("mongoose");
const Application = require("../models/Application");
const nodeMailer = require ("nodemailer");

const router = express.Router();

//create a new job
router.post("/create", jwtAuth,  async (req, res) => {    
    
    const user = req.user;
    //console.log(user)
    if (user?.type !== "recruiter") {
       return  res.status(401).json({
            message: "Only Recruiters can create jobs"
        })
    }
    const creator = await Recruiter.findOne({userId: user._id})
    //console.log(creator)

    try {
        const data = req.body;      //getting job from the request body
        //console.log(data)
        
        const job =  new Job({        //create a new job
            postedBy: user._id,
            jobTitle: data.jobTitle ,
            companyLogo: creator.profileImage,
            companyName: creator.fullName,
            jobLocation: data.jobLocation,
            minSalary: data.minSalary,
            maxSalary: data.maxSalary,
            jobPostingDate: data.jobPostingDate,
            maxApplications: data.maxApplications,
            salaryType: data.salaryType,
            deadline: data.deadline,
            employmentType: data.employmentType,
            experienceLevel: data.experienceLevel,
            description: data.description,
            referenceNumber: data.referenceNumber,
            KeyResAreas: data.KeyResAreas,
            jobReqs: data.jobReqs,
            jobBenefits: data.jobBenefits,
            activeApplications: data.activeApplications,
        });

        if(!job) {
            //if job was not created 
            return res.status.json({error: "Could not create job"})        
        };
        //console.log(job)
        await job.save();
        
        res.status(201).json({job});

    } catch (error) {
        console.log("Error in create job api: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    } 
});

//get all jobs 
router.get("/", async (req, res) => {
    //get id from params
    
    try {
        const jobs = await Job.find({ })
        //handle job errors
        if(!jobs) {

            return res.status(400).json({
                message: "No jobs found",
            });
        }
        //return the found job
        res.status(201).json(jobs);

    } catch (error) {
        console.log("Error in apiRoute: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
});

//get all jobs for a recruiter
router.get("/:id/dashboard", jwtAuth, async (req, res) => {
    //get user from params
    const user = req.user
    //console.log(user)
    const id = user._id
    if (user.type !== "recruiter") {
        return res.status(404).json({
            message: "you do not have permission"
        })
    }
    try {
        const jobs = await Job.find({ postedBy: id })
        //handle job errors
        if(!jobs) {

            return res.status(400).json({
                message: "Job does not exist",
            });
        }
        //return the found job
        res.status(201).json(jobs);

    } catch (error) {
        console.log("Error in apiRoute: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
});

//get job by id
router.get("/job/:id", async (req, res) => {
    //get id from params

    try {
        const id = req.params;
        const filter = `${id}`
        //console.log(req.params)
        
        const job = await Job.findById(req.params.id)
        //handle job errors
        if(!job) {

            return res.status(400).json({
                message: "Job does not exist",
            });
        }
        //console.log(job)
        //return the found job
        res.status(201).json(job);

    } catch (error) {
        console.log("Error in apiRoute: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
});

// to update info of a particular job
router.put("/job/:id", jwtAuth, async (req, res) => {

    const user = req.user;
    if (user.type != "recruiter") {

        return res.status(401).json({
        message: "You don't have permissions to change the job details",
        });
    }

    const {id} = req.params.id;
    const jobData = req.body;
    //console.log(id, jobData)
    try {
        const filter = {_id: id}
        const options = {upsert: true};
        const updateDoc = {
            $set: {
            ...jobData
            }
        }
        const result = await Job.updateOne(filter, updateDoc, options)
        if (!result ) {
            return res.status(404).json({
                message: "Could not update ob",
            });
        }
        //console.log(result)
        res.send(result)
        
    } catch (error) {
        console.log("Error in update route", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  
});

// to delete a job
router.delete("/job/:id/delete", jwtAuth, async (req, res) => {

    const user = req.user;
    if (user.type != "recruiter") {
        return res.status(401).json({
        message: "You don't have permissions to delete the job",
        });
    }
    const id =  req.params.id;
    const postedBy = user._id;
    const filter = { _id: id, postedBy: postedBy}
    console.log(id, postedBy)
    try {
        const job = await Job.findOneAndDelete(filter)
        if (!job ) {
            return res.status(401).json({
            message: "Could not delete job",
            });
        }
        res.status(200).json({
            message: "Job deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            error: "could not delete job"
        });
    }
});

//apply for a job
router.post("/job/:id/apply", jwtAuth, async (req, res) => {
    const user = req.user;
    //console.log(user)
    if (user.type !== "applicant") {
        return res.status(401).json({
            msg: "You don't have permissions to apply for a job",
        });
    }

    try {
        const data = req.body;
        const jobId = req.params.id;
        const filter = {
            jobId: jobId,
            userId: user._id
        }
        const job = await Job.find(filter)

        if( !job) {
            return res.status(404).json({
                message: "job does not exist"
            })
        }
        //console.log(job)
        //const application = await Application.find({filter})
        
        const application = new Application({
            userId: user._id,
            recruiterId: job.postedBy,
            jobId: jobId,
            coverLetter: data.coverLetter,
            employmentStatus: data.employmentStatus,
            noticePeriod: data.noticePeriod
        })
        if(!application) {
            return res.status(400).json({
                message: "could not applied for job"
            });
        }

        await application.save()
        //console.log(application)            

            var transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASS}`
            }
            });
            var mailOptions = {
            from: 'developerthulani@gmail.com',
            to: `${user.email}`,
            subject: 'Job Application Sent Successfully',
            text: `
                Hello ${user.fullName},
                Your application for ${job.employmentTitle} ${job.jobTitle} with ${job.companyName} based at ${job.jobLocation} has been sent successfully.
                Login to EazilyHired to apply for more opportunities.
                EazilyHired Team.
            `
            };
            //console.log(user, job)

            transporter.sendMail(mailOptions, function(error, info, user, job){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
            res.status(201).json(application);
        
    } catch (error) {
        return res.status(400).json(error);
    }
})
//get all jobs for an applicant
router.get("/:id/applications", jwtAuth, async (req, res) => {
    //get user from middleware
    const user = req.user
    //console.log(user)
    const id = user._id
    if (user.type !== "applicant") {
        return res.status(404).json({
            message: "you do not have permission"
        })
    }
    try {
        const applications = await Application.find({ userId: id })
        //handle job errors
        if(!applications) {

            return res.status(400).json({
                message: "No applications found",
            });
        }
        if ( applications.length > 0) {
            const jobs = []
            for (let index = 0; index < applications.length; ++ index) {
                const job = await Job.findById(applications[index].jobId)
                if( job) {
                    jobs.push(job)
                }
                
            }
            //console.log(jobs)
            res.status(201).json(jobs)
        }

    } catch (error) {
        console.log("Error in apiRoute: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
})

// to delete an application
router.delete("/application/:id/delete", jwtAuth, async (req, res) => {

    const user = req.user;
    //console.log(user)
    if (user.type !== "applicant") {
        return res.status(401).json({
        message: "You don't have permissions to delete the job",
        });
    }
    const jobId =  req.params.id;
    const userId = user.id;
    const filter = { jobId: jobId, userId: userId}
    //console.log(jobId)
    try {
        const application = await Application.findOneAndDelete(filter)
        //console.log(application)
        if (!application ) {
            return res.status(401).json({
            message: "Could not delete application",
            });
        }
        res.status(200).json({
            message: "Application deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            error: "could not delete job"
        });
    }
});

module.exports = router;