const projects = require('../Models/projectSchema')
//add project
exports.addProject = async (req, res) => {
    console.log('inside addproject controller');
    const userId = req.payload;
    console.log(userId);
    const projectimage = req.file.filename;
    console.log(projectimage);
    const { title, language, github, website, overview } = req.body;
    try {
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(406).json('Project already exist,Upload a new one')
        } else {
            const newProject = new projects({
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectimage: projectimage,
                userId: userId
            })
            await newProject.save();
            res.status(200).json('Project added Successfully!!!')
        }
    } catch (err) {
        res.status(401).json('Unable to add project due to:', err)
    }
}
exports.getHomeProject = async (req, res) => {
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    } catch (err) {
        res.status(401).json('Request failed due to:', err)
    }
}

exports.getAllProject = async (req, res) => {
    //getting value from query parameter
    //syntax:req.query.keyname
    const searchkey = req.query.search;
    console.log(searchkey);
    const query = {
        language: {
            //regular expression
            //i-to remove case sensitivity
            $regex: searchkey, $options: 'i'
        }
    }
    try {
        const allProject = await projects.find(query);
        res.status(200).json(allProject)
    } catch (err) {
        res.status(401).json('Request failed due to:', err)
    }
}

exports.getUserProject = async (req, res) => {
    const userId = req.payload
    try {
        const userProject = await projects.find({ userId: userId });
        res.status(200).json(userProject)
    } catch (err) {
        res.status(401).json('Request failed due to:', err)
    }
}
exports.editUserproject = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    console.log('project id', id);
    console.log('user Id', userId);
    const { title, language, github, website, overview, projectimage } = req.body;
    const uploadProjectImage = req.file ? req.file.filename : projectimage;
    try {
        const updateProject = await projects.findByIdAndUpdate(
            { _id: id },
            {
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectimage: uploadProjectImage,
                userId: userId
            },
            { new: true })
        await updateProject.save()
        res.status(200).json('project updated sucessfully')
    } catch (err) {
        res.status(401).json('unable to update due to:', err)
    }

}
exports.deleteUserProject = async (req, res) => {
    const { id } = req.params
    try {
        const removeproject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json('Project deleted Successfully')
    } catch (err) {
        res.status(401).json('Deletion failed', err)
    }
}