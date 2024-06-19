import { Schema, model } from "mongoose"

const studentSchema = Schema({
    studentId: {
        type: Number,
        unique: true,
        minLength: 7,
        maxLength: 7,
        required: true
    },
    name: {
        type: String,
        maxLength: 35,
        required: true
    },
    surname: {
        type: String,
        maxLength: 35,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    section: {
        type: String,
        enum: ['IN6AM', 'IN6AV', 'IN6BM', 'IN6BV'],
        required: true
    },
    assigned: {
        type: Boolean,
        default: false
    },
    projectAssigned: {
        type: Schema.Types.ObjectId,
        ref: 'Projects'
    }
}, {
    versionKey: false
})

export default model('Student', studentSchema)