import React, {useState} from 'react'
import {useTaskService} from '_services';

import {SlArrowDown} from 'react-icons/sl'

// interface updateValueProp {
//     id: string,
//     status: string,
//     done: string,
// }

interface selectCompProp {
    field?: string,
    valueList: string[],
    updateValue: object
    setUpdateValue: (value: any) => void
    user: any
}

const StatusSelectComp: React.FC < selectCompProp > = ({field, valueList, updateValue, setUpdateValue}) => {

    const [displayFlag, setDisplayFlag] = useState(false);
    const [selectedValue, setValue] = useState(valueList[0]);

    const onListHandle = (value: string) => {

        setValue(value);

        if(field){
            setUpdateValue({ ...updateValue, [field]: value  });
        } else {
            setUpdateValue(value);
        }

        console.log('status select comp =>', updateValue);
        
    }

    return (
        <div className="w-full relative cursor-pointer bg-[#1C2527]" onClick={() => setDisplayFlag((displayFlag) => !displayFlag)}>
            <div className="group flex flex-row justify-between items-center w-full border-1 border-[#023E89] hover:border-white duration-300 py-2 px-3 rounded-md">
                <p className="text-[16px] font-light text-white">
                    {selectedValue}
                </p>
                <SlArrowDown size='12px' className="text-[#023E89] group-hover:text-white duration-300"/>
            </div>
            <div className={`absolute w-full flex flex-col gap-1 mt-1 z-50 text-[12px] bg-[#1C2527] border-1 border-[#023E89] p-1 ${displayFlag ? '' : 'hidden'}`}>
                {
                valueList.map((value, index) => 
                <p className="py-1 px-3 hover:text-[12px] duration-300 border-b-1 border-b-gray-500 cursor-pointer text-white"
                   key={index}
                   onClick={() => onListHandle(value)}
                >
                   {value}
                </p>)
            } </div>
        </div>
    )
}

export default StatusSelectComp
