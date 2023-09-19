import React, {useState} from 'react'
import {SlArrowDown} from 'react-icons/sl'

interface selectCompProp {
    label: string,
    field?: string,
    valueList: string[],
    tableContent: object
    setTableContent: (value: any) => {}
}

const SelectComp: React.FC < selectCompProp > = ({label, field, valueList, tableContent, setTableContent}) => {

    const [displayFlag, setDisplayFlag] = useState(false);
    const [selectedValue, setValue] = useState(valueList[0]);

    const onListHandle = (value: string) => {

        setValue(value);

        if(field){
            setTableContent({ ...tableContent, [field]: value  });
        } else {
            setTableContent(value);
        }
        
    }

    return (
        <div className="mt-3 w-full relative cursor-pointer bg-[#1C2527]" onClick={() => setDisplayFlag((displayFlag) => !displayFlag)}>
            <p className="my-1 text-white text-[10px] font-light ">
                {label}</p>
            <div className="group flex flex-row justify-between items-center w-full border-1 border-[#023E89] hover:border-white duration-300 py-2 px-3 rounded-md">
                <p className="text-white text-[16px] font-light ">
                    {selectedValue}
                </p>
                <SlArrowDown size='18px' className="text-[#023E89] group-hover:text-white duration-300"/>
            </div>
            <div className={`absolute w-full flex flex-col gap-1 mt-1 z-50 text-[16px] bg-[#1C2527] border-1 border-[#023E89] p-1 ${displayFlag ? '' : 'hidden'}`}>
                {
                valueList.map((value, index) => 
                <p className="py-1 px-3 hover:text-[18px] duration-300 border-b-1 border-b-gray-500 cursor-pointer"
                   key={index}
                   onClick={() => onListHandle(value)}
                >
                   {value}
                </p>)
            } </div>
        </div>
    )
}

export default SelectComp
