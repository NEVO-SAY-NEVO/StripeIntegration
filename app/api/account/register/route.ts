import joi from 'joi';

import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    POST: register
});

async function register(req: Request) {
    const body = await req.json();
    console.log('register user =>', body)
    await usersRepo.create(body);
}

register.schema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).required(),
    schoolName: joi.string().required(),
    schoolEmail: joi.string().required(),
    schoolPasscode: joi.string().required(),
});