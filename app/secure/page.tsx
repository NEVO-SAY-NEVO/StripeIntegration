'use client';

import Link from 'next/link';
import {useEffect} from 'react';

import {useUserService, useTaskService} from '_services';
import {Spinner} from '_components';

import {useForm} from 'react-hook-form';

// import Table from '_components/table';
import TableComp from '_components/tableComp/Table'

export default Home;

function Home() {
    const userService = useUserService();
    const taskService = useTaskService();

    const user = userService.currentUser;

    const {register, handleSubmit, formState} = useForm();

    const {errors} = formState;

    const currentPage = userService.currentPage;
    const currentUser = userService.currentUser;

    const tableContent = taskService.tableContent;
    const finishTask = tableContent.filter((task) => task.done == true);
    const doingTask = tableContent.filter((task) => task.done == false);

    console.log('doingTask in page2 => ', doingTask)
    console.log('tableContent in page2 => ', finishTask)

    const fields = {
        firstName: register('firstName', {required: 'First Name is required'}),
        lastName: register('lastName', {required: 'Last Name is required'}),
        schoolEmail: register('schoolEmail'),
        schoolPasscode: register('schoolPasscode'),
        billingAddress: register('billingAddress'),
        billingCard: register('billingCard'),
        email: register('email', {required: 'Email is required'})
    };

    useEffect(() => {
        if(!currentUser){
            let temp = localStorage.getItem('user');
            if(temp) {
                userService.setCurrentUser(JSON.parse(temp));
            }
        }
    }, [])

    async function onSubmit(updateUser : any) {
        console.log('currentUser =>', currentUser);
        const newUpdateUser: any = {
            fullName: `${
                updateUser.firstName
            } ${
                updateUser.lastName
            }`,
            email: updateUser.email,
            schoolEmail: updateUser.schoolEmail,
            schoolPasscode: updateUser.schoolPasscode,
            billingAddress: updateUser.billingAddress,
            billingCard: updateUser.billingCard
        }
        console.log('Update User =>', newUpdateUser);
        if (currentUser) 
            await userService.update(currentUser.id, newUpdateUser);
        
    }

    useEffect(() => {
        userService.getCurrent();
        taskService.getAll();
    }, []);

    useEffect(() => {
        console.log('tableContent =>', tableContent)
    }, [tableContent])

    if (user) {
        return (
            <> 
                {currentPage == 'home' ? 
                <>
                    <p className='text-[40px] leading-[30px] font-bold mb-16 text-black'>Assignments
                        <span>&nbsp;</span>
                        <span className="bg-[#A8BBD1] min-[600px]:text-[26px] max-[600px]:text-[16px] text-[#023E89] font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-[#A8BBD1] dark:text-[#023E89]">
                            {doingTask.length}
                        </span>
                    </p>
                    {/* <Table/> */}
                    <TableComp users={doingTask}/> {/* <TableComp /> */} </> : <>
                    <p className='min-[600px]:text-[40px] max-[600px]:text-[25px] leading-[30px] text-black font-bold mb-16'>Account Settings
                    </p>
                    <form className='w-full min-[500px]:block max-[500px]:hidden'
                        onSubmit={
                            handleSubmit(onSubmit)
                    }>
                        <div className='min-[1024px]:w-1/2 max-[1024px]:w-full grid grid-cols-2 gap-5 '>
                            <div className=''>
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
                                    <div className="mt-2.5">
                                        {/* <input type="text" placeholder='Jhon' name="firstName" id="first-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                        <input {...fields.firstName}
                                            value={
                                                currentUser ?. fullName.split(' ')[0]
                                            }
                                            type="text"
                                            className={
                                                `form-control ${
                                                    errors.firstName ? 'is-invalid' : ''
                                                }`
                                            }/>
                                        <div className="invalid-feedback">
                                            {
                                            errors.firstName ?. message ?. toString()
                                        }</div>
                                    </div>
                                </div>
                                <div className=' mt-6'>
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">School Email</label>
                                    <div className="mt-2.5">
                                        {/* <input type="text" placeholder='JohnDoe@gmail.com' name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                        <input {...fields.schoolEmail}
                                            value={
                                                currentUser ?. schoolEmail
                                            }
                                            type="email"
                                            className={
                                                `form-control ${
                                                    errors.schoolEmail ? 'is-invalid' : ''
                                                }`
                                            }/>
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <label htmlFor="billing-address" className="block text-sm font-semibold leading-6 text-gray-900">Billing Address</label>
                                    <div className="mt-2.5">
                                        {/* <input type="text" placeholder='123 Ez Street.' name="billing-address" id="billing-address" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                        <input {...fields.billingAddress}
                                            value={
                                                currentUser ?. billingAddress
                                            }
                                            type="text"
                                            className={
                                                `form-control ${
                                                    errors.billingAddress ? 'is-invalid' : ''
                                                }`
                                            }/>
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <label htmlFor="personal-email" className="block text-sm font-semibold leading-6 text-gray-900">Personal Email</label>
                                    <div className="mt-2.5">
                                        {/* <input type="text" placeholder='JohnDoe@notschool..' name="personal-email" id="personal-email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                        <input {...fields.email}
                                            value={
                                                currentUser ?. email
                                            }
                                            type="email"
                                            className={
                                                `form-control ${
                                                    errors.email ? 'is-invalid' : ''
                                                }`
                                            }/>
                                        <div className="invalid-feedback">
                                            {
                                            errors.email ?. message ?. toString()
                                        }</div>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last Name</label>
                                    <div className="mt-2.5">
                                        {/* <input type="text" placeholder='Doe' name="last-name" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                        <input {...fields.lastName}
                                            value={
                                                currentUser ?. fullName.split(' ')[1]
                                            }
                                            type="text"
                                            className={
                                                `form-control ${
                                                    errors.lastName ? 'is-invalid' : ''
                                                }`
                                            }/>
                                        <div className="invalid-feedback">
                                            {
                                            errors.lastName ?. message ?. toString()
                                        }</div>
                                    </div>
                                </div>
                                <div className=' mt-6'>
                                    <label htmlFor="school-pass" className="block text-sm font-semibold leading-6 text-gray-900">School Passcode</label>
                                    <div className="mt-2.5">
                                        {/* <input type="password" placeholder='Jhon' name="school-pass" id="school-pass" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                        <input {...fields.schoolPasscode}
                                            value={
                                                currentUser ?. schoolPasscode
                                            }
                                            type="text"
                                            className={
                                                `form-control ${
                                                    errors.schoolPasscode ? 'is-invalid' : ''
                                                }`
                                            }/>
                                        <div className="invalid-feedback">
                                            {
                                            errors.schoolPasscode ?. message ?. toString()
                                        }</div>
                                    </div>
                                </div>
                                <div className=' mt-6'>
                                    <label htmlFor="billing-card" className="block text-sm font-semibold leading-6 text-gray-900">Billing Card</label>
                                    <div className="mt-2.5">
                                        {/* <input type="password" placeholder='Jhon' name="billing-card" id="billing-card" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                        <input {...fields.billingCard}
                                            value={
                                                currentUser ?. billingCard
                                            }
                                            type="text"
                                            className={
                                                `form-control ${
                                                    errors.billingCard ? 'is-invalid' : ''
                                                }`
                                            }/>
                                        <div className="invalid-feedback">
                                            {
                                            errors.billingCard ?. message ?. toString()
                                        }</div>
                                    </div>
                                </div>

                                <div className="mt-14">
                                    <button type='submit'
                                        disabled={
                                            formState.isSubmitting
                                        }
                                        className="block w-full rounded-md bg-[#023E89] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        {
                                        formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>
                                    }Update Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className='w-full min-[500px]:hidden max-[500px]:block'
                        onSubmit={
                            handleSubmit(onSubmit)
                    }>
                        <div className='min-[1024px]:w-1/2 max-[1024px]:w-full grid grid-cols-1 gap-5'>
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-semibold leading-6 text-gray-900">Full name</label>
                                <div className="mt-2.5">
                                    {/* <input type="text" placeholder='Jhon' name="firstName" id="first-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                    <input {...fields.firstName}
                                        value={
                                            currentUser ?. fullName.split(' ')[0]
                                        }
                                        type="text"
                                        className={
                                            `form-control ${
                                                errors.firstName ? 'is-invalid' : ''
                                            }`
                                        }/>
                                    <div className="invalid-feedback">
                                        {
                                        errors.firstName ?. message ?. toString()
                                    }</div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last Name</label>
                                <div className="mt-2.5">
                                    {/* <input type="text" placeholder='Doe' name="last-name" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                    <input {...fields.lastName}
                                        value={
                                            currentUser ?. fullName.split(' ')[1]
                                        }
                                        type="text"
                                        className={
                                            `form-control ${
                                                errors.lastName ? 'is-invalid' : ''
                                            }`
                                        }/>
                                    <div className="invalid-feedback">
                                        {
                                        errors.lastName ?. message ?. toString()
                                    }</div>
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">School Email</label>
                                <div className="mt-2.5">
                                    {/* <input type="text" placeholder='JohnDoe@gmail.com' name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                    <input {...fields.schoolEmail}
                                        value={
                                            currentUser ?. schoolEmail
                                        }
                                        type="email"
                                        className={
                                            `form-control ${
                                                errors.schoolEmail ? 'is-invalid' : ''
                                            }`
                                        }/>
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="school-pass" className="block text-sm font-semibold leading-6 text-gray-900">School Passcode</label>
                                <div className="mt-2.5">
                                    {/* <input type="password" placeholder='Jhon' name="school-pass" id="school-pass" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                    <input {...fields.schoolPasscode}
                                        value={
                                            currentUser ?. schoolPasscode
                                        }
                                        type="text"
                                        className={
                                            `form-control ${
                                                errors.schoolPasscode ? 'is-invalid' : ''
                                            }`
                                        }/>
                                    <div className="invalid-feedback">
                                        {
                                        errors.schoolPasscode ?. message ?. toString()
                                    }</div>
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="billing-address" className="block text-sm font-semibold leading-6 text-gray-900">Billing Address</label>
                                <div className="mt-2.5">
                                    {/* <input type="text" placeholder='123 Ez Street.' name="billing-address" id="billing-address" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                    <input {...fields.billingAddress}
                                        value={
                                            currentUser ?. billingAddress
                                        }
                                        type="text"
                                        className={
                                            `form-control ${
                                                errors.billingAddress ? 'is-invalid' : ''
                                            }`
                                        }/>
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="billing-card" className="block text-sm font-semibold leading-6 text-gray-900">Billing Card</label>
                                <div className="mt-2.5">
                                    {/* <input type="password" placeholder='Jhon' name="billing-card" id="billing-card" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                    <input {...fields.billingCard}
                                        value={
                                            currentUser ?. billingCard
                                        }
                                        type="text"
                                        className={
                                            `form-control ${
                                                errors.billingCard ? 'is-invalid' : ''
                                            }`
                                        }/>
                                    <div className="invalid-feedback">
                                        {
                                        errors.billingCard ?. message ?. toString()
                                    }</div>
                                </div>
                            </div>
                            <div className=''>
                                <label htmlFor="personal-email" className="block text-sm font-semibold leading-6 text-gray-900">Personal Email</label>
                                <div className="mt-2.5">
                                    {/* <input type="text" placeholder='JohnDoe@notschool..' name="personal-email" id="personal-email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> */}
                                    <input {...fields.email}
                                        value={
                                            currentUser ?. email
                                        }
                                        type="email"
                                        className={
                                            `form-control ${
                                                errors.email ? 'is-invalid' : ''
                                            }`
                                        }/>
                                    <div className="invalid-feedback">
                                        {
                                        errors.email ?. message ?. toString()
                                    }</div>
                                </div>
                            </div>
                            <div className="">
                                <button type="submit"
                                    disabled={
                                        userService.currentPage ? false : true
                                    }
                                    className="block w-full rounded-md bg-[#023E89] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Profile</button>
                            </div>
                        </div>
                    </form>
                <>
                    <p className='text-[40px] leading-[30px] font-bold mb-16 mt-16 text-black'>Past Orders
                        <span>&nbsp;</span>
                        <span className="bg-[#A8BBD1] min-[600px]:text-[26px] max-[600px]:text-[16px] text-[#023E89] font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-[#A8BBD1] dark:text-[#023E89]">
                            {finishTask.length}
                        </span>
                    </p>
                    {/* <Table/> */}
                    {/* <TableComp /> */}
                    <TableComp users={finishTask}/>
                </>

                </>
            } 
            </>
        );
    } else {
        return <Spinner/>;
    }
}
