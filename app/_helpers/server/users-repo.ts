import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { db } from './db';

const User = db.User;

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    getCurrent,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }: { email: string, password: string }) {

    if(email == 'Guest@Guest.com') {
        const user = {
            mode: 'Gueset',
            email,
            password,
        }
        const token = jwt.sign({ sub: '' }, process.env.JWT_SECRET!, { expiresIn: '7d' });

        return {
            user: user,
            token
        };
    } else {
        const user = await User.findOne({ email });

        if (!(user && bcrypt.compareSync(password, user.hash))) {
            throw 'Email or password is incorrect';
        }

        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

        return {
            user: user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id: string) {
    try {
        return await User.findById(id);
    } catch {
        throw 'User Not Found';
    }
}

async function getCurrent() {
    try {
        const currentUserId = headers().get('userId');
        return await User.findById(currentUserId);
    } catch {
        throw 'Current User Not Found';
    }
}

async function create(params: any) {
    // validate
    if (await User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    console.log('create in pareams', params);

    const user = new User(params);

    // hash password
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await user.save();
}

async function update(id: string, params: any) {
    let user = await User.findById(id);
    console.log('find by ', id);
    console.log('finded user by id', user)

    // validate
    if (!user) throw 'User not found';
    if (user.email !== params.email && await User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    console.log('params in users-repo=>', params)

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id: string) {
    await User.findByIdAndRemove(id);
}

