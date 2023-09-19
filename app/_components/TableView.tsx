import React, { useState } from 'react'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import StatusSelectComp from './statusSelectComp';

import { useTaskService } from '_services';

interface IUser {
  fullName: string,
  email: string,
  homework: string,
  cost: string,
  duedate: Date,
  description: string,
  status: string,
  paid: string,
  priority: string,
  done: string,
  createdAt: Date,
  id: string
}
interface TableViewProp {
  data: IUser
}

const TableView:React.FC<TableViewProp> = ({data}) => {

  console.log('table data => ', data)

  const taskService = useTaskService();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialOption = {
    id: data.id,
    status: data.status,
    done: data.done
  }

  const [updateTask, setUpdateTask] = useState(initialOption)

  const updateTaskHandle = () => {
    taskService.updateTask(updateTask);
    onClose();
  }

  return (
    <div>
      <div onClick={onOpen} className="flex justify-center items-center text-black cursor-pointer">Detail</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          
            {(onClose) => (
              <div className="bg-[#1C2527]">
                <ModalHeader className="flex flex-col gap-1">
                  <p className="text-[18px] font-bold text-white">
                    <span className="text-[#023E89]">Swift&nbsp;</span>
                    Study
                  </p>
                </ModalHeader>
                <ModalBody>
                  <div className='w-full flex flex-col gap-1 text-white mt-2'>
                    <div className='w-full flex flex-row'>
                      <div className='w-1/3'>
                        fullName: 
                      </div>
                      <div className='w-2/3'>
                        { data.fullName }
                      </div>
                    </div>
                    <div className='w-full flex flex-row'>
                      <div className='w-1/3'>
                        email: 
                      </div>
                      <div className='w-2/3'>
                        { data.email }
                      </div>
                    </div>
                    <div className='w-full flex flex-row'>
                      <div className='w-1/3'>
                        homework: 
                      </div>
                      <div className='w-2/3'>
                        { data.homework }
                      </div>
                    </div>
                    <div className='w-full flex flex-row'>
                      <div className='w-1/3'>
                        cost: 
                      </div>
                      <div className='w-2/3'>
                        { data.cost }
                      </div>
                    </div>
                    <div className='w-full flex flex-row'>
                      <div className='w-1/3'>
                        duedate: 
                      </div>
                      <div className='w-2/3'>
                        { data.duedate.toString().split('T')[0] }
                      </div>
                    </div>
                    <div className='w-full flex flex-col'>
                        <p>description: </p> 
                        <p className='px-2'>
                          { data.description }
                        </p>
                    </div>
                    <div className='w-full flex flex-row items-center'>
                      <div className='w-1/3'>
                        Status: 
                      </div>
                      <div className='w-2/3'>
                        {/* { data.status } */}
                        <StatusSelectComp 
                          valueList={['', 'NA', 'IDLE', 'FIN']}
                          field='status'
                          updateValue = {updateTask}
                          setUpdateValue={setUpdateTask}
                          user={data}
                        />
                      </div>
                    </div>
                    <div className='w-full flex flex-row items-center'>
                      <div className='w-1/3'>
                        Done: 
                      </div>
                      <div className='w-2/3'>
                        <StatusSelectComp 
                          valueList={['', 'true', 'false']}
                          field='done'
                          updateValue = {updateTask}
                          setUpdateValue={setUpdateTask}
                          user={data}
                        />
                      </div>
                    </div>



                  </div>
                 
                  <div color="primary" className="bg-primary-500 w-full my-4 py-1 text-center rounded-md hover:bg-primary-300 duration-300 cursor-pointer" onClick={updateTaskHandle}>
                    <p className="text-[16px] text-white font-bold">
                      Close
                    </p>
                  </div>
                </ModalBody>
                </div>
            )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TableView;
