import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    name:{
        type: String
    },
    repositoryBack:{
        type: String
    },
    repositoryFront: {
        type: String
    }
},{
    versionKey: false
})

export default mongoose.model('Projects', ProjectSchema); 