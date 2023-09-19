"use client"

import { useEffect } from "react";
import Link from "next/link"
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button,
    User
} from "@nextui-org/react";
import {HiDotsVertical} from 'react-icons/hi'
import {AiOutlinePlus} from 'react-icons/ai'
import {VscThreeBars} from 'react-icons/vsc'

import {useUserService} from '_services';

import SignIn from './SignIn'
import SignUp from './SignUp'


export default function Header() {

    const userService = useUserService();

    const currentUser = userService.currentUser;

    const onLogoutHandle = () => {
        userService.logout();
        localStorage.removeItem('user');
    }

    return (
        <div className='pt-6 bg-[#F9F7F3]'>
            <div className='flex flex-row justify-between py-4 min-[425px]:px-16 max-[425px]: px-5'>
                <Link href={'/'}>
                    <p className='text-[18px] font-bold text-black'>
                        <span className='text-[#023E89]'>Swift&nbsp;</span>
                        Study
                    </p>
                </Link>

                <div className="min-[820px]:block max-[820px]:hidden">
                    <ul className="flex flex-row gap-10">
                        <li className=" text-[14px] text-[#023E89] cursor-pointer">
                            <Link href={'/secure/home'}>Home</Link>
                        </li>
                        <li className=" text-[14px] text-[#333] cursor-pointer">
                            <Link href={'#contact-form'}>Contact</Link>
                        </li>
                        <li className=" text-[14px] text-[#333] cursor-pointer" onClick={() => userService.setProcess(true)}>
                            Start Process
                        </li>
                        <li className=" text-[14px] text-[#333] cursor-pointer">
                            <Link href={'/secure/tableAccount'}>Account</Link>
                        </li>
                    </ul>
                </div>

                <div className="min-[820px]:block max-[820px]:hidden">
                    {currentUser ? 
                    <div className="py-1 px-3 bg-[#F9F7F3] cursor-pointer -mt-3" onClick={onLogoutHandle}>
                        <User name={currentUser?.fullName} description={currentUser?.email}
                            classNames={
                                {
                                    name: "text-default-600",
                                    description: "text-default-500"
                                }
                            }
                            avatarProps={
                                {
                                    size: "sm",
                                    src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                                }
                        }/>
                    </div>
                    :
                    <div className='flex flex-row gap-3'>
                        <SignIn flag={'Header'}/>
                        <SignUp/>
                    </div>
                    }
                    
                </div>

                <div className="min-[820px]:hidden max-[820px]:block">
                { currentUser ? 
                    <Dropdown showArrow radius="sm"
                        classNames={
                            {
                                base: "p-0 border-small border-divider bg-background",
                                arrow: "bg-default-200"
                            }
                    }>
                        <DropdownTrigger>
                            <Button variant={'light'} disableRipple>
                                <VscThreeBars size='30px'/>
                            </Button>
                        </DropdownTrigger>
                        
                            <DropdownMenu aria-label="Custom item styles"
                                disabledKeys={
                                    ["profile"]
                                }
                                className="p-3"
                                itemClasses={
                                    {
                                        base: [
                                            "rounded-md",
                                            "text-default-500",
                                            "transition-opacity",
                                            "data-[hover=true]:text-foreground",
                                            "data-[hover=true]:bg-default-100",
                                            "dark:data-[hover=true]:bg-default-50",
                                            "data-[selectable=true]:focus:bg-default-50",
                                            "data-[pressed=true]:opacity-70",
                                            "data-[focus-visible=true]:ring-default-500",
                                        ]
                                    }
                            }>
                            <DropdownSection aria-label="Profile & Actions" showDivider>
                                <DropdownItem isReadOnly key="profile" className="h-14 gap-2 opacity-100">
                                <User name={currentUser?.fullName} description={currentUser?.email}
                                    classNames={
                                        {
                                            name: "text-default-600",
                                            description: "text-default-500"
                                        }
                                    }
                                    avatarProps={
                                        {
                                            size: "sm",
                                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                                        }
                                    }/>
                                </DropdownItem>
                                
                                <DropdownItem key="dashboard">
                                    <Link href={'/home'}>Home</Link>
                                </DropdownItem>
                                <DropdownItem key="dashboard">
                                    <Link href={'#contact-form'}>Contact</Link>
                                </DropdownItem>
                                <DropdownItem key="dashboard" onClick={() => userService.setProcess(true)}>
                                    <Link href={'/pages/startProcess'}>Start Process</Link>
                                </DropdownItem>
                                <DropdownItem key="dashboard">
                                    <Link href={'/tableAccount'}>Account</Link>
                                </DropdownItem>

                            </DropdownSection>

                            <DropdownSection aria-label="Help & Feedback">
                                <DropdownItem key="logout" onClick={onLogoutHandle}>Log Out</DropdownItem>
                            </DropdownSection>
                            
                            </DropdownMenu>
                        
                    </Dropdown>
                    :
                    <div className="flex flex-row gap-3">
                        <SignIn flag={'Header'}/>
                        <SignUp />
                    </div>
                }
                </div>

            </div>
        </div>
    )
}
