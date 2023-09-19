import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAlertService } from '_services';
import { useFetch } from '_helpers/client';

import { toast } from 'react-toastify';
import { Message } from 'postcss';

import emailjs from "@emailjs/browser";

export { useUserService };

// user state store
const initialState = {
    users: undefined,
    user: undefined,
    currentUser: undefined,
    currentPage: '',
    isActionEnded: false,
    startProcess: false,
};
const userStore = create<IUserStore>(() => initialState);

function useUserService(): IUserService {
    const alertService = useAlertService();
    const fetch = useFetch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { users, user, currentUser, isActionEnded, startProcess, currentPage  } = userStore();

    return {
        users,
        user,
        currentUser,
        isActionEnded,
        currentPage,
        startProcess,
        login: async (email, password) => {
            alertService.clear();
            try {
                const currentUser = await fetch.post('/api/account/login', { email, password });
                
                userStore.setState({ ...initialState, currentUser });

                userStore.setState({
                    currentPage: 'home'
                })
                // get return url from query parameters or default to '/'
                toast.success('Login successful');
                localStorage.setItem('user', JSON.stringify(currentUser));
            } catch (error: any) {
                toast.error(error);
            }
        },
        logout: async () => {
            try{
                await fetch.post('/api/account/logout');
                router.push('/');
                userStore.setState({
                    currentUser: undefined
                })
                toast.success('Logout successfully!')
            } catch (error: any)  {
                toast.error(error);
            }
            
        },
        register: async (user) => {
            try {
                console.log('register =>', user);
                await fetch.post('/api/account/register', user);
                // alertService.success('Registration successful', true);
                toast.success('Registration successfully!');
                router.push('/');
                userStore.setState({ isActionEnded: true });
            } catch (error: any) {
                // alertService.error(error);
                toast.error(error);
                userStore.setState({ isActionEnded: true });
            }
            // userStore.setState({ isActionEnded: false })
        },
        getAll: async () => {
            userStore.setState({ users: await fetch.get('/api/users') });
        },
        getById: async (id) => {
            userStore.setState({ user: undefined });
            try {
                userStore.setState({ user: await fetch.get(`/api/users/${id}`) });
            } catch (error: any) {
                toast.error(error);
            }
        },
        getCurrent: async () => {
            if (!currentUser) {
                userStore.setState({ currentUser: await fetch.get('/api/users/current') });
            }
        },
        create: async (user) => {
            await fetch.post('/api/users', user);
        },
        update: async (id, params) => {
            try {
                console.log('params in UserService=>', params)
                await fetch.put(`/api/users/${id}`, params);
                toast.success('Update successfully!');
                if (id === currentUser?.id) {
                    userStore.setState({ currentUser: { ...currentUser, ...params } })
                }
            } catch (error: any) {
                toast.error(error);
            }
        },
        delete: async (id) => {
            // set isDeleting prop to true on user
            userStore.setState({
                users: users!.map(x => {
                    if (x.id === id) { x.isDeleting = true; }
                    return x;
                })
            });

            // delete user
            const response = await fetch.delete(`/api/users/${id}`);

            // remove deleted user from state
            userStore.setState({ users: users!.filter(x => x.id !== id) });

            // logout if the user deleted their own record
            if (response.deletedSelf) {
                router.push('/');
            }
        },
        setActionFlag: async (flag) => {
            userStore.setState({
                isActionEnded: flag
            })
        },
        setCurrentPage: async (flag) => {
            userStore.setState({
                currentPage: flag
            })
        },
        setProcess: async(flag) => {
            userStore.setState({
                startProcess: flag
            })
        },
        setCurrentUser: async(user) => {
            userStore.setState({
                currentUser: user
            })
        },
        sendMsg: async (info) => {
            console.log('router info =>', info)
            emailjs.init('aZmuyHXCwxO47kgbu');
            emailjs.send('service_nui3ycc', 'template_2kltri8', {
                to_name: 'Dear cManager',
                from_name: info.name,
                from_email: info.email,
                subject: info.subject,
                message: info.message
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                toast.success('Message sent successfully!');
            }, function(error) {
                console.log('FAILED...', error);
                toast.error(error);
            });
            
            await fetch.post('/api/email', info);
        },
        registerAsGuest: async (info) => {
            console.log('registerAsGuest =>', info);
            try{
                const currentUser = await fetch.post('/api/account/login', { email:'Guest@Guest.com', password:'123456' });
                const temp = {
                    id: '',
                    fullName: 'Guest',
                    email: 'Guest@Guest.com',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    password: '123456',
                    schoolName: info.schoolName,
                    schoolEmail: info.schoolEmail,
                    schoolPasscode: info.schoolPasscode,
                    billingAddress: '',
                    billingCard: '',
                    isDeleting: false,
                }
                localStorage.setItem('user', JSON.stringify(temp));
                userStore.setState({
                    currentUser: temp
                })
            } catch(error) {

            }

        }
    }
};

// interfaces

interface IUser {
    id: string,
    fullName: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    password: string,
    schoolName?: string,
    schoolEmail?: string,
    schoolPasscode?: string,
    billingAddress?: string,
    billingCard?: string,
    isDeleting?: boolean,
}

interface IUserStore {
    users?: IUser[],
    user?: IUser,
    currentUser?: IUser,
    currentPage?: string,
    isActionEnded?: boolean,
    startProcess?: boolean
}

interface MessageProp {
    name: string,
    email: string,
    subject: string,
    message: string
}

interface GuestInfo {
    schoolEmail: string,
    schoolPasscode: string,
    schoolName: string
}

interface IUserService extends IUserStore {
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    register: (user: IUser) => Promise<void>,
    getAll: () => Promise<void>,
    getById: (id: string) => Promise<void>,
    getCurrent: () => Promise<void>,
    create: (user: IUser) => Promise<void>,
    update: (id: string, params: Partial<IUser>) => Promise<void>,
    delete: (id: string) => Promise<void>,
    setActionFlag: (flag: boolean) => Promise<void>,
    setCurrentPage: (flag: string) => Promise<void>,
    setProcess: (flag: boolean) => Promise<void>,
    setCurrentUser: (user: IUser) => Promise<void>,
    sendMsg: (info: MessageProp) => Promise<void>,
    registerAsGuest: (info: GuestInfo) => Promise<void>
}