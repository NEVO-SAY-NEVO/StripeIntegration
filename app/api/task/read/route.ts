import joi from 'joi';

import { tasksRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
});

async function getAll() {
    return await tasksRepo.getAll();
}