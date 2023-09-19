import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAlertService } from '_services';
import { useFetch } from '_helpers/client';

import { toast } from 'react-toastify';

export { useTaskService };

// user state store
const initialState = {
    tableContent: []
};

const taskStore = create<ITaskStore>(() => initialState);

function useTaskService(): ITaskService {
    const alertService = useAlertService();
    const fetch = useFetch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { tableContent } = taskStore();

    return {
        tableContent,
        addTask: async (task) => {
            console.log('task in useTaskService => ', task)
            try {
                console.log('task in useTaskService try try try => ', task)
                await fetch.post('/api/task/add', task);
                toast.success('Task added successfully!');
            } catch (error: any) {
                toast.error(error);
            }
            // userStore.setState({ isActionEnded: false })
        },
        getAll: async () => {
            console.log('getAll function is called')
            taskStore.setState({ tableContent: await fetch.get('/api/task/read') });
        },
        updateTask: async (info) => {
            console.log('info in taskService =>', info);
            taskStore.setState({ tableContent: await fetch.post('/api/task/update', info) });
            
        }
    }
};

// interfaces

interface ITask {
    fullname: string,
    email: string,
    title?: string,
    homework: string,
    cost?:string,
    description: string,
    duedate: string,
    status: string,
    paid: boolean,
    done: boolean
}

interface ITaskStore {
    tableContent: ITask[]
}

interface updatedInfo {
    id: string,
    status: string,
    done: string
}

interface ITaskService extends ITaskStore {
    addTask: (task: ITask) => Promise<void>,
    updateTask: (info: updatedInfo) => Promise<void>,
    getAll: () => Promise<void>,
}