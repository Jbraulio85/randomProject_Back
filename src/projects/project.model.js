import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    name:{
        type: String
    },
    repository:{
        type:String
    }
},{
    versionKey: false
})

export default mongoose.model('Projects', ProjectSchema); 