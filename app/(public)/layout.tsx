"use client"

import {redirect} from 'next/navigation';

import {auth} from '_helpers/server';
import {Alert} from '_components';
import Header from '_components/Header'

import {NextUIProvider} from "@nextui-org/react";

export default Layout;

function Layout({children} : {
    children : React.ReactNode
}) {
    // if logged in redirect to home page
    // if (auth.isAuthenticated()) {
    //     redirect('/');
    // }

    // return (
    //     <NextUIProvider>
    //         <div className='max-w-[1600px] ml-auto mr-auto'>
    //             <Alert/>
    //             <Header/>
    //             <div className="">
    //                 {children} </div>
    //         </div>
    //     </NextUIProvider>
    // );

    return (
        <html lang="en">
            <body>
                <div className='max-w-[1600px] ml-auto mr-auto'>
                    <Alert/>
                    <Header/>
                    <div className="">
                        {children} 
                    </div>
                </div>
            </body>
        </html>
    )
}
