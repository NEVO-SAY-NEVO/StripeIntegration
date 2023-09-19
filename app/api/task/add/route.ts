import joi from 'joi';

import { tasksRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    POST: addTask
});

async function addTask(req: Request) {
    const body = await req.json();
    console.log('addtask body =>', body)
    await tasksRepo.addTask(body);
}

addTask.schema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().required(),
    title: joi.string(),
    homework: joi.string().required(),
    cost: joi.string(),
    duedate: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().required(),
    paid: joi.boolean().required(),
    priority: joi.boolean().required(),
    done: joi.boolean().required()
});