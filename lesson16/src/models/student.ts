import mongoose from 'mongoose';

const {Schema, model} = mongoose;
import {teacherModel} from './teacher'

const studentSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    age: {
        type: Number,
        default: 0
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});
studentSchema.virtual('fullName').get(function () {
    // @ts-ignore
    return this.name + ' ' + 'Zelenskiy';
})

// studentSchema.pre('findOne', function (){   //HOOK
//     this.populate('teacher');
// })
export const studentModel = model('student', studentSchema);