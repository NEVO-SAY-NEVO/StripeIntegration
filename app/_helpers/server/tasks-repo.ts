
import { db } from './db';

const Task = db.Task;

export const tasksRepo = {
    addTask,
    getAll,
    updateTask
};

async function addTask(params: any) {

    console.log('params =>', params);
    const task = new Task(params);

    // save task
    await task.save();
}

async function getAll() {
    return await Task.find();
}

async function updateTask(task:any) {

    console.log('updated task =>', task);

    let user = await Task.findById(task.id);

    console.log('old task => ', user);
    
    Object.assign(user, task);

    await user.save();

    return await Task.find();
}
