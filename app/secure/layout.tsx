"use client"

import {Alert, Nav} from '_components';
import Header2 from '_components/Header2';

import {NextUIProvider} from "@nextui-org/react";

export default Layout;

function Layout({children} : {
    children : React.ReactNode
}) { 

    return (
        <NextUIProvider>
            <div className="app-container bg-[#FAF8F4] max-w-[1600px] min-h-[100vh]">
                {/* <Nav /> */}
                <Alert/>
                <div className='flex flex-row w-full'>
                    <Header2/>
                    <div className='w-full p-16 bg-[#FAF8F4]'>
                        <div className="container">
                            {children} 
                        </div>
                    </div>
                </div>
            </div>
        </NextUIProvider>
    );
}
