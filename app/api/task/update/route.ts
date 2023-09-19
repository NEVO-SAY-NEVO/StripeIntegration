import joi from 'joi';

import { tasksRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    POST: updateTask
});

async function updateTask(req: Request) {
    const body = await req.json();
    console.log('updateTask body =>', body)
    return await tasksRepo.updateTask(body);
}

updateTask.schema = joi.object({
    id: joi.string().required(),
    status: joi.string().required(),
    done: joi.string().required(),
});