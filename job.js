    let jobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  minSalary: Number,
  maxSalary: String,
  postingDate: String,
  jobLocation: String,
  postedBy: String,
  salaryType: String,
  employmentType: String,
  experienceLevel: String,
  description: String,
})

let Job = mongoose.model('Job', jobSchema)

    
    //post job
    app.post("/post-job", async (req, res) => {
      const {
        jobTitle,
        companyName,
        minSalary,
        maxSalary,
        postingDate,
        jobLocation,
        postedBy,
        salaryType,
        employmentType,
        experienceLevel,
        description} = req.body;
      //job.createAt = new Date().now();
      if(!jobTitle  
        || !companyName
        || !minSalary
        || !maxSalary
        || !postingDate
        || !jobLocation
        || !postedBy
        || !salaryType
        || !employmentType
        || !experienceLevel
        || !description 
      ) {
        res.send("All fields required")
        return
      } else {
        try {
          let job = new Job({
            jobTitle,
            companyName,
            minSalary,
            maxSalary,
            postingDate,
            jobLocation,
            postedBy,
            salaryType,
            employmentType,
            experienceLevel,
            description
          });
          await job.save();
          res.status(200).json({
            job
          });
        } catch (error) {
          console.log(error)
          res.send('Server error..');
        }
      }

      //console.log(job)
      //const result = await jobCollections.insertOne(job)
      let jobPosting = await new Job.create({

      })

      if(result.insertedId) {
        return res.status(200).send(result);
      }else {
        return res.status(404).send({
          message: "Could not post job! Try Again.",
          status: false
        })
      }
    })

    //HASH PASSWORD HERE
        /*
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);*/

        //create a random profile picture (use api)
 const {
    jobTitle,
    companyName,
    minSalary,
    maxSalary,
    postingDate,
    jobLocation,
    salaryType,
    employmentType,
    experienceLevel,
    description,
    postedBy,
    skills,
    companyLogo,
    jobQualification,
    referenceNumber,
    keyResAreas,
    jobReqs 
  } = job;

  defaultValues: {
      
      jobTitle: job?.jobTitle,
      companyName: EazyUser()?.fullName,
      minSalary: job?.minSalary,
      maxSalary: job?.maxSalary,
      postingDate: job?.postingDate,
      jobLocation: job?.jobLocation,
      salaryType: job?.salaryType,
      employmentType: job?.employmentType,
      experienceLevel: job?.experienceLevel,
      description: job?.description,
      postedBy: EazyUser()?._id,
      skillsets: job?.skillsets,
      companyLogo: EazyUser()?.image,
      referenceNumber: job?.referenceNumber,
      keyResAreas: job?.keyResAreas,
      jobReqs: job?.jobReqs
    }