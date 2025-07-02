import { Schema, model } from "mongoose"

const studentSchema = new Schema({
    studentId: {
        type: String,
        unique: true,
        required: [true, 'El número de carnet es obligatorio'],
        minLength: [7, 'El número de carnet debe tener 7 dígitos'],
        maxLength: [7, 'El número de carnet debe tener 7 dígitos'],
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxLength: [35, 'El nombre no puede exceder los 35 caracteres'],
        trim: true,
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        maxLength: [35, 'El apellido no puede exceder los 35 caracteres'],
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    section: {
        type: String,
        enum: {
            values: ['IN6AM', 'IN6AV', 'IN6BM', 'IN6BV', 'IN6CM', 'IN6CV'],
            message: 'La sección no es válida',
        },
        required: [true, 'La sección es obligatoria'],
        trim: true,
    },
    assigned: {
        type: Boolean,
        default: false,
    },
    projectAssigned: {
        type: Schema.Types.ObjectId,
        ref: 'Projects',
    },
}, {
    versionKey: false,
    timestamps: true,
})

export default model('Student', studentSchema)