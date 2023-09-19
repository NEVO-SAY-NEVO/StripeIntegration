'use client';

import React, {useEffect, useState, useRef} from 'react'

import { useForm } from 'react-hook-form';

import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {useUserService, useAlertService, useTaskService} from '_services';

import {PiStudentFill} from 'react-icons/pi'
import {ImBooks} from 'react-icons/im'
import Image from 'next/image'
import GetStarted from '_components/GetStart'
import {ToastContainer, toast} from 'react-toastify';

import emailjs from "@emailjs/browser";

import 'react-toastify/dist/ReactToastify.css';

export default Login;

function Login() {

    const userService = useUserService();
    const taskService = useTaskService();

    const currentURL = window.location.href;

    const {setCurrentPage, currentPage, setCurrentUser} = userService;

    const router = useRouter();

    useEffect(() => {
        console.log('currentURL =>', currentURL.split('redirect_status=')[1]);
        if (currentURL.split('redirect_status=')[1] == 'succeeded') {
            const tableContent = localStorage.getItem('task');
            console.log('tableContent after pay =>', tableContent)
            localStorage.removeItem('task');
            toast.success('Payment is successfully!');
            if (tableContent) taskService.addTask(JSON.parse(tableContent))
            router.push('/');
        }
    }, [currentURL])

    const initialMsg = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }
    const [ msg, setMsg ] = useState(initialMsg);

    useEffect(() => {
        setCurrentPage('main');
    }, [currentPage])

    useEffect(() => {
        let temp = localStorage.getItem('user');
        if (temp) 
            setCurrentUser(JSON.parse(temp));
    }, [])

    // Contact Message

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const fields = {
        name: register('name', { required: 'Full Name is required' }),
        email: register('email', { required: 'Email is required' }),
        subject: register('subject', { required: 'Subject is required' }),
        message: register('message', { required: 'Message is required' }),
    }

    async function onSubmit(user: any) {
        await userService.sendMsg(user);
    }

    // End

    return (
        <div className='bg-[#F9F7F3] text-[#333]'>
            <ToastContainer/>
            <div className='w-full justify-between flex flex-row pt-10 relative'>
                <div className='absolute left-0 z-20 flex flex-col w-full min-[680px]:px-16 max-[680px]:px-5 justify-center'>
                    <div className='max-[1160px]:block min-[1160px]:hidden mx-auto'>
                        <Image src="/assets/dashboard1.png"
                            width={300}
                            height={745}
                            alt="Picture of the author"/>
                    </div>
                    <div className='min-[680px]:text-[80px] max-[680px]:text-[40px] flex flex-col w-full mb-10 max-[1160px]:text-center'>
                        <p className=' text-[#333] min-[1160px]:font-normal max-[1160px]:font-bold'>Don’t stress</p>
                        <div className='flex flex-col min-[680px]:-mt-5 '>
                            <p className=' text-[#333] font-bold'>Hire The best</p>
                            <div className='flex min-[680px]:-mt-5 max-[680px]:-mt-2 min-[680px]:ml-[380px] max-[680px]:ml-[160px] max-[680px]:hidden'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="105" height="16" viewBox="0 0 105 16" fill="none">
                                    <g clipPath="url(#clip0_16_3507)">
                                        <path d="M78.7218 5.76935C69.6374 4.80208 29.4601 8.95929 21.0681 13.2811C21.0681 13.487 21.1627 13.4993 21.2779 13.487C22.243 13.3841 38.8044 10.2646 50.7971 9.20628C54.6828 8.86329 58.9245 8.60411 62.9237 8.11553C66.9228 7.62685 78.7218 5.76935 78.7218 5.76935Z" fill="#023E89"/>
                                        <path d="M104.968 2.12555C104.968 2.12555 105.052 2.16673 104.947 2.37254C104.891 2.40012 104.674 2.53716 104.129 2.78412C103.332 3.27805 71.5563 2.17041 53.189 4.0601L0.255756 8.95824C-0.233688 8.99851 0.129875 8.60839 0.129875 8.60839C6.92539 6.4999 13.8929 4.26593 32.3766 2.72244C45.0486 1.28248 68.6326 -0.101414 73.4559 0.00585608C80.6521 0.00585608 95.9771 1.00699 104.968 2.12555Z" fill="#023E89"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_16_3507">
                                            <rect width="105" height="16" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <p className=' text-[#333] min-[1160px]:font-normal max-[1160px]:font-bold min-[680px]:-mt-5'>Study, Swiftly.</p>
                    </div>
                    <p className='text-[24px] text-[#61605F] font-light leading-[30px] mb-10  min-[680px]:w-3/4 max-[680px]:w-full min-[1160px]:w-[550px] max-[1160px]:w-2/3 max-[1160px]:mx-auto tracking-[0.96px]'>
                        Empowering students with academic support, our company offers expertly crafted homework solutions tailored to
                        <span className='text-[#023E89] font-bold'>&nbsp;enhance learning and success</span>.
                    </p>
                    <div className='w-full grid px-1 min-[680px]:w-3/4 max-[680px]:w-full min-[680px]:grid-cols-2 max-[680px]:grid-rows-2 gap-10 mb-8 min-[680px]:pr-28 max-[680px]:px-0 min-[1160px]:w-2/6 max-[1160px]:w-2/3 max-[1160px]:mx-auto  text-[24px]'>
                        <GetStarted/> {/* <div className="flex justify-center items-center border rounded-tr-md rounded-bl-md border-[#023E89] bg-[#023E89] text-white px-10 py-[18px] cursor-pointer">Get Started</div> */}
                        <div className="flex justify-center items-center border-1 border-[#023E89] rounded-tr-md rounded-bl-md rounded-tl-md  bg-white  px-0 cursor-pointer text-[#023E89] text-[24px] font-light leading-[30px] tracking-[0.96px] hover:border-white duration-300">
                            <Link href={'#contact-form'}>Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex min-[680px]:flex-row max-[680px]:flex-col gap-10 min-[1160px]:w-2/6 min-[680px]:w-3/4 max-[680px]:w-full max-[1160px]:w-2/3 max-[1160px]:mx-auto'>

                        <div className='flex flex-col gap-2 min-[680px]:w-1/2 max-[680px]:w-full py-3 px-3 bg-[#EFEFEF] shadow-[0_11px_56px_0px_rgba(0,0,0,0.08)] rounded-[6px]'>
                            <div className='flex flex-row items-center gap-1'>
                                <PiStudentFill size='38px'
                                    color={'#023E89'}/>
                                <p className='text-[#333] text-[16px] font-bold'>5,000+ Students</p>
                            </div>
                            <p className='text-[14px] font-normal text-black'>trust us for academic excellence.</p>
                        </div>

                        <div className='flex flex-col gap-2 min-[680px]:w-1/2 max-[680px]:w-full py-3 px-3 bg-[#EFEFEF] shadow-[0_11px_56px_0px_rgba(0,0,0,0.08)] rounded-[6px]'>
                            <div className='flex flex-row items-center gap-1'>
                                <ImBooks size='38px'
                                    color={'#023E89'}/>
                                <p className=' text-[16px] text-black font-bold'>30,000+ Students</p>
                            </div>
                            <p className='text-[14px] pr-10 font-normal text-black'>successful student projects and counting
                            </p>
                        </div>


                    </div>
                </div>
                <div className='absolute right-0 z-10 flex items-start justify-end transition-all max-[1160px]:hidden min-[1160px]:block'>
                    <div className='px-16'>
                        <Image src="/assets/dashboard1.png"
                            width={742}
                            height={745}
                            alt="Picture of the author"/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col max-[380px]:mt-[1500px] max-[550px]:mt-[1300px] min-[550px]:px-16 max-[550px]:px-5 min-[1160px]:mt-[800px] max-[1160px]:mt-[1200px]'>

                <div className='w-full justify-center min-[670px]:text-[70px] max-[670px]:text-[30px] max-[670px]:leading-[55px] min-[670px]:leading-[80px] font-normal text-[#333] mb-5 max-[1160px]:text-center'>
                    Start packing,<br/>
                    Here’s our
                    <br/>
                    Streamlined Process.
                </div>

                <div className='w-full justify-center min-[900px]:mt-[60px] max-[900px]:mt-[40px] min-[670px]:max-[900px]:mt-[30px] max-[670px]:mt-[10px]'>
                    <div className='py-20 max-[670px]:py-1 border-b-[3px] border-b-[#D9D9D9]'>
                        <div className='flex flex-row items-center min-[1200px]:gap-48 max-[1200px]:gap-x-32 max-[850px]:gap-20 relative '>
                            <div className='flex min-[768px]:w-1/3 min-[768px]:block max-[768px]:hidden items-center justify-center'>
                                <Image src="/assets/dash1.png"
                                    width={395}
                                    height={373}
                                    alt="Picture of the author"/>
                            </div>
                            <div className='flex flex-col min-[768px]:w-2/3 min-[768px]:pl-28 max-[768px]: px-0'>
                                <p className='text-[40px] font-normal mb-6 text-black'>first input your year</p>
                                <p className='text-[24px] text-[rgba(51, 51, 51, 0.77)] font-light leading-[30px] mb-10 min-[1200px]:pr-40 max-[1200px]:pr-0  tracking-[0.96px]'>
                                    Empowering students with academic support, our company offers expertly crafted homework solutions tailored to
                                    <span className='text-[rgba(51, 51, 51, 0.77)] font-bold'>&nbsp;
                                                                                                                    enhance learning and success</span>.
                                </p>
                            </div>
                            <div className='absolute w-full z-10  min-[768px]:block max-[768px]:hidden'>
                                <p className='text-[331px] text-center text-[#023E89] opacity-25'>1</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-20 max-[670px]:py-1 border-b-[3px] border-b-[#D9D9D9]'>
                        <div className='flex flex-row items-center min-[1200px]:gap-48 max-[1200px]:gap-x-32 max-[850px]:gap-20 relative'>
                            <div className='flex min-[768px]:w-1/3 min-[768px]:block max-[768px]:hidden items-center justify-center'>
                                <Image src="/assets/dash2.png"
                                    width={395}
                                    height={373}
                                    alt="Picture of the author"/>
                            </div>
                            <div className='flex flex-col min-[768px]:w-2/3 min-[768px]:pl-28 max-[768px]: px-0'>
                                <p className='text-[40px] font-normal mb-6 text-black'>Second, Enter your school details</p>
                                <p className='text-[24px] text-[rgba(51, 51, 51, 0.77)] font-light leading-[30px] mb-10 min-[1200px]:pr-40 max-[1200px]:pr-0  tracking-[0.96px]'>
                                    Empowering students with academic support, our company offers expertly crafted homework solutions tailored to
                                    <span className='text-[rgba(51, 51, 51, 0.77)] font-bold'>&nbsp;
                                                                                                                                                            enhance learning and success</span>.
                                </p>
                            </div>
                            <div className='absolute w-full z-10  min-[768px]:block max-[768px]:hidden'>
                                <p className='text-[331px] text-center text-[#023E89] opacity-25'>2</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-20 max-[670px]:py-1 border-b-[3px] border-b-[#D9D9D9]'>
                        <div className='flex flex-row items-center min-[1200px]:gap-48 max-[1200px]:gap-x-32 max-[850px]:gap-20 relative'>
                            <div className='flex min-[768px]:w-1/3 min-[768px]:block max-[768px]:hidden items-center justify-center'>
                                <Image src="/assets/dash3.png"
                                    width={395}
                                    height={373}
                                    alt="Picture of the author"/>
                            </div>
                            <div className='flex flex-col min-[768px]:w-2/3 min-[768px]:pl-28 max-[768px]: px-0'>
                                <p className='text-[40px] font-normal mb-6 text-black'>Third, Your personal Info</p>
                                <p className='text-[24px] text-[rgba(51, 51, 51, 0.77)] font-light leading-[30px] mb-10 min-[1200px]:pr-40 max-[1200px]:pr-0  tracking-[0.96px]'>
                                    Empowering students with academic support, our company offers expertly crafted homework solutions tailored to
                                    <span className='text-[rgba(51, 51, 51, 0.77)] font-bold'>&nbsp;
                                                                                                                                                            enhance learning and success</span>.
                                </p>
                            </div>
                            <div className='absolute w-full z-10  min-[768px]:block max-[768px]:hidden'>
                                <p className='text-[331px] text-center text-[#023E89] opacity-25'>3</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-20 max-[670px]:py-1 border-b-[3px] border-b-[#D9D9D9]'>
                        <div className='flex flex-row items-center min-[1200px]:gap-48 max-[1200px]:gap-x-32 max-[850px]:gap-20 relative '>
                            <div className='flex min-[768px]:w-1/3 min-[768px]:block max-[768px]:hidden items-center justify-center'>
                                <Image src="/assets/dash4.png"
                                    width={395}
                                    height={373}
                                    alt="Picture of the author"/>
                            </div>
                            <div className='flex flex-col min-[768px]:w-2/3 min-[768px]:pl-28 max-[768px]: px-0'>
                                <p className='text-[40px] font-normal mb-6 text-black'>Lastly, Enter your assignment & Info.</p>
                                <p className='text-[24px] text-[rgba(51, 51, 51, 0.77)] font-light leading-[30px] mb-10 min-[1200px]:pr-40 max-[1200px]:pr-0  tracking-[0.96px]'>
                                    Empowering students with academic support, our company offers expertly crafted homework solutions tailored to
                                    <span className='text-[rgba(51, 51, 51, 0.77)] font-bold'>&nbsp;
                                                                                                                                                            enhance learning and success</span>.
                                </p>
                            </div>
                            <div className='absolute w-full z-10  min-[768px]:block max-[768px]:hidden'>
                                <p className='text-[331px] text-center text-[#023E89] opacity-25'>4</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row mt-[40px]'>
                    <div className='min-[830px]:w-6/12 min-[830px]:block max-[830px]:hidden'></div>
                    <div className='flex flex-col min-[830px]:w-6/12 max-[830px]:w-full justify-center'>

                        <p className='text-black xl:text-[80px] max-xl:text-[60px] text-center'>Get in
                            <span className='text-[#023E89]'>&nbsp;touch</span>
                        </p>
                        <div className='flex flex-row ml-5'>
                            <div className='w-3/5'></div>
                            <div className='flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="105" height="16" viewBox="0 0 105 16" fill="none">
                                    <g clipPath="url(#clip0_16_3507)">
                                        <path d="M78.7218 5.76935C69.6374 4.80208 29.4601 8.95929 21.0681 13.2811C21.0681 13.487 21.1627 13.4993 21.2779 13.487C22.243 13.3841 38.8044 10.2646 50.7971 9.20628C54.6828 8.86329 58.9245 8.60411 62.9237 8.11553C66.9228 7.62685 78.7218 5.76935 78.7218 5.76935Z" fill="#023E89"/>
                                        <path d="M104.968 2.12555C104.968 2.12555 105.052 2.16673 104.947 2.37254C104.891 2.40012 104.674 2.53716 104.129 2.78412C103.332 3.27805 71.5563 2.17041 53.189 4.0601L0.255756 8.95824C-0.233688 8.99851 0.129875 8.60839 0.129875 8.60839C6.92539 6.4999 13.8929 4.26593 32.3766 2.72244C45.0486 1.28248 68.6326 -0.101414 73.4559 0.00585608C80.6521 0.00585608 95.9771 1.00699 104.968 2.12555Z" fill="#023E89"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_16_3507">
                                            <rect width="105" height="16" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='grid min-[830px]:grid-cols-2 max-[830px]:grid-cols-1 gap-10 -mt-10 justify-between mb-10' id='contact-form'>
                    <div className='justify-center min-[830px]:block max-[830px]:hidden'>
                        <Image src="/assets/dashboard1.png"
                            width={1000}
                            height={443}
                            alt="Picture of the author"/>
                    </div>
                    <div className='min-[450px]:w-full max-[450px]:w-5/6 mx-auto text-left'>
                        {/* <form className='mt-10'
                            onSubmit={handleSubmit}
                            id="contact-form"
                            action="php/mail.php"
                            method="post"
                        >
                            <div>
                                <label htmlFor="full-name" className="block text-sm text-[#777675] font-semibold leading-6">Full name</label>
                                <div className="mt-2.5">
                                    <input type="text" placeholder='Jhon' name="name" id="full-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
                                </div>
                            </div>
                            <div className=' mt-6'>
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-[#777675]">Email</label>
                                <div className="mt-2.5">
                                    <input type="text" placeholder='JhonDoe@gmail.com' name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
                                </div>
                            </div>
                            <div className=' mt-6'>
                                <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-[#777675]">Subject</label>
                                <div className="mt-2.5">
                                    <input type="text" placeholder='Math' name="subject" id="subject" className="block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
                                </div>
                            </div>
                            <div className="sm:col-span-2 mt-7">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-[#777675]">Message</label>
                                <div className="mt-2.5">
                                    <textarea name="message" id="message" placeholder='Message here'
                                        rows={4}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required></textarea>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button type="submit"
                                    disabled={
                                        state.submitting
                                    }
                                    className="block w-full rounded-md bg-[#023E89] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send Message</button>
                            </div>
                        </form> */}
                        <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
                            <div className="mb-3">
                                <label className="form-label my-1">Full Name</label>
                                <input {...fields.name} type="text" className={`form-control ${errors.name ? 'is-invalid' : ''} block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#EFEFEF]`} />
                                <div className="invalid-feedback">{errors.name?.message?.toString()}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label  my-1">Email</label>
                                <input {...fields.email} type="email" className={`form-control ${errors.email ? 'is-invalid' : ''} block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#EFEFEF]`} />
                                <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label  my-1">Subject</label>
                                <input {...fields.subject} type="text" className={`form-control ${errors.subject ? 'is-invalid' : ''} block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#EFEFEF]`} />
                                <div className="invalid-feedback">{errors.subject?.message?.toString()}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label  my-1">Message</label>
                                <textarea {...fields.message} className={`form-control ${errors.message ? 'is-invalid' : ''} block w-full rounded-md border-0 px-3.5 py-2 text-[#777675] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#EFEFEF] h-[197px]`} />
                                <div className="invalid-feedback">{errors.message?.message?.toString()}</div>
                            </div>
                            <div className="mt-10">
                                <button className="block w-full rounded-md bg-[#023E89] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
