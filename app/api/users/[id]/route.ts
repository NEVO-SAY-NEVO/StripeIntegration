import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { usersRepo } from '_helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {
    return await usersRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    console.log('params in apiRouter=>', body)
    await usersRepo.update(id, body);
}

update.schema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().required(),
    schoolName: joi.string(),
    schoolEmail: joi.string(),
    schoolPasscode: joi.string(),
    billingAddress: joi.string(),
    billingCard: joi.string()
});

async function _delete(req: Request, { params: { id } }: any) {
    await usersRepo.delete(id);

    // auto logout if deleted self
    if (id === req.headers.get('userId')) {
        cookies().delete('authorization');
        return { deletedSelf: true };
    }
}
