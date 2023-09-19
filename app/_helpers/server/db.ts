import { string } from 'joi';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Task: taskModel()
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        fullName: { type: String, required: true },
        hash: { type: String, required: true },
        email: { type: String, required: true },
        schoolName: { type: String, required: true },
        schoolEmail: { type: String },
        schoolPasscode: { type: String },
        billingAddress: { type: String },
        billingCard: { type: String },
        personEmail: { type: String }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}

function taskModel() {
    const schema = new Schema({
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        title: { type: String, required: true },
        homework: { type: String, required: true },
        cost: { type: String, required: true },
        duedate: { type: Date, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        paid: { type: Boolean, required: true },
        priority: { type: Boolean, required: true },
        done: { type: Boolean, required: true },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.Task || mongoose.model('Task', schema);
}
