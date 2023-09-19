'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAlertService } from '_services';
import {ImCross} from 'react-icons/im'

export { Alert };

function Alert() {
    const pathname = usePathname();
    const alertService = useAlertService();
    const alert = alertService.alert;
    
    useEffect(() => {
        // clear alert on location change
        alertService.clear();
    }, [pathname]);

    if (!alert) return null;

    return (
        <div className='w-full flex justify-center '>
            <div className="absolute z-50 top-1">
                <div onClick={alertService.clear} className={`flex items-center alert alert-dismissible ${alert.type} border-l-4 border-l-green-950 gap-3 cursor-pointer`}>
                    {alert.message}
                </div>
            </div>
        </div>
    );
}
