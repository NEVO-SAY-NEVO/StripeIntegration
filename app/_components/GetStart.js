/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Checkbox, Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import {useUserService, useTaskService} from '_services';

import SelectComp from "./selectComp";

import { Input } from "@nextui-org/react";
import { SlArrowDown } from 'react-icons/sl'
import { ImCross } from 'react-icons/im'

import StripeComp from "./stripeComp/stripeComp";

import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";

import SignIn from './SignIn'
import ContinueGuest from './ContinueGuest'


export default function ModalComp() {

  const userService = useUserService();
  const taskService = useTaskService();

  const currentUser = userService.currentUser;

  console.log('currentUser in Getstart=> ', currentUser)
  const startProcess = userService.startProcess;

  const [nextFlag, setNextFlag] = useState(false);
  const [step, setStep] = useState(0);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [schoolContent, setSchoolContent] = useState({
    schoolEmail: currentUser ? currentUser.schoolEmail : '',
    schoolPasscode: currentUser ? currentUser.schoolPasscode : '',
  })

  const initalTableContent = {
    fullName: currentUser ? currentUser.fullName : 'Guest',
    email: currentUser ? currentUser.email : 'Guest@Guest.com',
    title: 'none',
    homework: '',
    cost: '($0)',
    duedate: '',
    description: '',
    status: 'IDLE',
    paid: false,
    priority: false,
    done: false
  }

  const [tableContent, setTableContent] = useState(initalTableContent)

  const [isSelected, setIsSelected] = React.useState(false); 

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    schoolEmail: register('schoolEmail', { required: 'schoolEmail is required' }),
    schoolPasscode: register('schoolPasscode', { required: 'schoolPasscode is required' }),
  }

  const [secondWarnFlag, setSecondWarnFlag] = useState(false)

  // Email validation
  const [schEmailValue, setSchEmailValue] = React.useState("junior2nextui.org");

  const schEmailValidationState = React.useMemo(() => {
    return schEmailValue == '' ? "invalid" : "valid";
  }, [schEmailValue]);  

  //password validation
  const [schPasscodeValue, setSchPasswordValue] = React.useState(' ');

  const schPasscodeValidationState = React.useMemo(() => {
    return schPasscodeValue == '' ? "invalid" : "valid";
  }, [schPasscodeValue]);

  useEffect(() => {
    console.log('currentUser =>', currentUser);
    console.log('tableContent => ', tableContent);
  }, [tableContent])

  useEffect(() => {
    if(startProcess){
      onOpen();
      userService.setProcess(false);
    }
  }, [startProcess])

  useEffect(() => {
    if(currentUser){
      setStep(1);
      setTableContent({
        ...tableContent,
        fullName: currentUser.fullName,
        email: currentUser.email
      })
    }
  }, [currentUser])

  // const nextFlagHandle = () => {
  //   // setNextFlag(true);
  //   console.log('getStart => ', tableContent);
  //   taskService.addTask(tableContent);
  //   onClose();
  // };

  const setDueDate = (e) => {
    setTableContent({ ...tableContent, duedate: e.target.value })
  }

  const setDescHandle = (e) => {
    setTableContent({ ...tableContent, description: e.target.value })
  }

  useEffect(() => {
    setTableContent({ ...tableContent, priority: isSelected })
  }, [isSelected])

  const nextStepHandle = (user) => {
    console.log('nextStepHandle action => ', user);
    // if(step == 0){
    //   if(schEmailValue && schPasscodeValue){
    //     setStep((step) => ++step); 
    //   } else {
    //       if(!schEmailValue) toast.warning('Please enter the school Email');
    //       if(!schPasscodeValue) toast.warning('Please enter the shcool Passcode');
    //   }
    // } 
    if(step == 1){
      let tempFlag = '';
      Object.keys(tableContent).map((value, index) => {
        if(!tableContent[value] && index < 7) {
          if(value == 'cost' || value == 'title'){
            if(tableContent.homework == 'Essay Assignments ($40)'){
              console.log(`cost or title ${value} => `, tableContent[value]);
              tempFlag += `${value} ,`;
            } 
          } else {
            tempFlag += `${value} ,`;
          }
          
        }
      });
      if(tempFlag){
        toast.warning(`Please enter the ${tempFlag} and etc please.`)
      } else {
        // taskService.addTask(tableContent);
        localStorage.setItem('task', JSON.stringify(tableContent));
        setStep((step) => ++step); 
      }
    }
      // setStep((step) => ++step);    
  }

  const onOpenHanlde = () => {
    setTableContent(initalTableContent);
    currentUser ? setStep(1) : setStep(0);
    onOpen();
  }

  const [value, onChange] = useState(new Date());

  return (
    <>
      <div onClick={onOpenHanlde} className="flex justify-center items-center border rounded-tr-md rounded-bl-md rounded-tl-md border-[#023E89] bg-[#023E89] text-white px-1 py-[18px] cursor-pointer text-[24px] font-light leading-[30px] tracking-[0.96px] hover:bg-[#245C9A] duration-300">Get Started</div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} isDismissable={false} size={screen.width > 500 ? 'md' : 'xs'}>
          <ModalContent>
            {(onClose) => (
              <div className="bg-[#1C2527]">
                <ModalHeader className="flex flex-row gap-1 justify-between">
                  <p className='text-[18px] font-bold text-white'>
                    <span className='text-[#023E89]'>Swift&nbsp;</span>
                    Study
                  </p>
                  <ImCross onClick={onClose} size={'20px'} color='#023E89' className="hover:scale-125 duration-300 cursor-pointer" />
                </ModalHeader>
                <ModalBody>
                  <div className="text-[32px] text-white font-bold">
                    <p className="text-[32px] text-white ">
                      Let us Get <span className="text-[#023E89]">Started!</span>
                    </p>
                    <div className="flex ml-40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="105"
                        height="16"
                        viewBox="0 0 105 16"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_16_3507)">
                          <path
                            d="M78.7218 5.76935C69.6374 4.80208 29.4601 8.95929 21.0681 13.2811C21.0681 13.487 21.1627 13.4993 21.2779 13.487C22.243 13.3841 38.8044 10.2646 50.7971 9.20628C54.6828 8.86329 58.9245 8.60411 62.9237 8.11553C66.9228 7.62685 78.7218 5.76935 78.7218 5.76935Z"
                            fill="#023E89"
                          />
                          <path
                            d="M104.968 2.12555C104.968 2.12555 105.052 2.16673 104.947 2.37254C104.891 2.40012 104.674 2.53716 104.129 2.78412C103.332 3.27805 71.5563 2.17041 53.189 4.0601L0.255756 8.95824C-0.233688 8.99851 0.129875 8.60839 0.129875 8.60839C6.92539 6.4999 13.8929 4.26593 32.3766 2.72244C45.0486 1.28248 68.6326 -0.101414 73.4559 0.00585608C80.6521 0.00585608 95.9771 1.00699 104.968 2.12555Z"
                            fill="#023E89"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_16_3507">
                            <rect width="105" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                      <div className="flex flex-row justify-between items-center mt-10 mb-10 px-3">
                      <div className={`w-[48px] rounded-full bg-[#023E89] hover:opacity-100 duration-300 hover:bg-[#034E9A] text-white text-center cursor-pointer ${step == 0 ? 'scale-125' : 'opacity-30'}`} >
                          1
                      </div>
                      <div className={`h-[4px] flex-grow border-y-2 border-[#023E89]`}></div>
                      <div className={`w-[48px] rounded-full bg-[#023E89] hover:opacity-100 duration-300 hover:bg-[#034E9A] text-white text-center cursor-pointer ${step == 1 ? 'scale-125' : 'opacity-30'}`} >
                          2
                      </div>
                      <div className={`h-[4px] flex-grow border-y-2 border-[#023E89]`}></div>
                      <div className={`w-[48px] rounded-full bg-[#023E89] hover:opacity-100 duration-300 hover:bg-[#034E9A] text-white text-center cursor-pointer ${step == 2 ? 'scale-125' : 'opacity-30'}`} >
                          3
                      </div>
                      </div>

                    { step == 0 ?
                      <div className="mb-4 p-2">
                        
                        <div className="flex min-[360px]:flex-row max-[360px]:flex-col gap-3 mt-5 items-center">
                          <SignIn flag={'GetStarted'}/>
                          <ContinueGuest />
                        </div>
                      </div>
                      : 
                      <></>
                    }
                    {/* {step == 0 ? 
                    <>
                      <div className="mb-4">
                        <Input
                          value={schEmailValue}
                          type="email"
                          label="SchoolEmail"
                          variant="underlined"
                          color={schEmailValidationState === "invalid" ? "danger" : "success"}
                          errorMessage={schEmailValidationState === "invalid" && "Please enter the email"}
                          validationState={schEmailValidationState}
                          onValueChange={setSchEmailValue}
                          className="w-full"
                        />
                        <Input
                          value={schPasscodeValue}
                          type="password"
                          label="SchoolPassCode"
                          variant="underlined"
                          color={schPasscodeValidationState === "invalid" ? "danger" : "success"}
                          errorMessage={schPasscodeValidationState === "invalid" && "Please enter the email"}
                          validationState={schPasscodeValidationState}
                          onValueChange={setSchPasswordValue}
                          className="w-full"
                        />
                      </div>
                      <div
                          className="bg-[#023E89] hover:bg-[#012D78] duration-300 font-bold text-white text-center text-[20px] mt-5 py-2 px-auto w-full rounded-t-md rounded-bl-md cursor-pointer"
                          onClick={nextStepHandle}
                        >
                          Next Step
                      </div>
                        <div className="flex flex-row items-center mb-5 mt-4">
                          <Checkbox defaultSelected color="primary" />
                          <p className="text-[14px] font-extralight text-white">
                            By clicking this you agree to the{" "}
                            <span className="font-bold">Terms of service</span>
                          </p>
                        </div>
                    </>
                    : ''} */}
                    {step == 1 ? 
                      <>
                        <SelectComp 
                          label="Year" 
                          valueList={['', 'Freshmen', 'Sophomore', 'Junior', 'Senior']} 
                          field="year"
                          tableContent={tableContent}
                          setTableContent={setTableContent}
                        />
                        {/* {
                          tableContent.homework == 'Essay Assignments ($40)' ? 
                          <>
                            <p className="text-[10px] text-[#FFF] font-light mt-3">Course #</p>
                            <Input
                              type="text"
                              variant={"underlined"}
                              value={"#Math4253"}
                              className="-mt-1 text-[18px]"
                              color="primary"
                            />
                          </>
                          :
                          <>

                          </>
                        } */}
                        
                        <SelectComp 
                          label="Type of Homework" 
                          valueList={['', 'Business Assignments ($25)', 'Math Homework ($25)', 'Coding Assignments ($30)', 'Science Assignments ($35)', 'Essay Assignments ($40)']} 
                          field="homework"
                          tableContent={tableContent}
                          setTableContent={setTableContent}
                        />
                        {
                          tableContent.homework == 'Essay Assignments ($40)' ? 
                          <>
                            <SelectComp 
                              label="# Of Words" 
                              valueList={['','0-200($17)', '200-500($30)', '500-800($40)', '800+($50)']} 
                              field="cost"
                              tableContent={tableContent}
                              setTableContent={setTableContent}
                            />
                          </>
                          :
                          <>
                          </>
                        }
                        <>
                          <p className="text-[10px] text-[#FFF] font-light mt-3">Assignment Due Date</p>
                          <Input
                            type="date"
                            variant={"underlined"}
                            onChange={setDueDate}
                            min={new Date()}
                          />
                        </>
                        <>
                        <p className="text-[10px] text-[#FFF] font-light mt-3">Description of Assignment</p>
                          <Textarea
                            key={"bordered"}
                            variant={"bordered"}
                            labelPlacement="outside"
                            onChange={setDescHandle}
                            radius={'sm'}
                            color="primary"
                            placeholder="Please explain the entire assignment in the best way possible. Please note any extra work, where to find the assignment, etc"
                            className="col-span-12 md:col-span-6 mb-6 md:mb-0 mt-1 text-white"
                          />
                        </>
                        <div className="flex flex-row items-center mb-5 mt-2">
                          <Checkbox defaultSelected color="primary" isSelected={isSelected} onValueChange={setIsSelected} />
                          <p className="text-[14px] font-extralight text-white">
                            Make me a priority{" "}
                            <span className="font-bold">($20 fee)</span>
                          </p>
                        </div>
                        <>
                          <div
                              className="bg-[#023E89] hover:bg-[#012D78] duration-300 font-bold text-white text-center text-[20px] mt-5 py-2 px-auto w-full rounded-t-md rounded-bl-md cursor-pointer"
                              onClick={nextStepHandle}
                            >
                              continue to payment
                          </div>
                          <p className="text-[12px] font-extralight text-white mt-3 mb-5">
                            By creating an account you agree to the terms & condtions
                          </p>
                        </>
                      </>
                    : ''}
                    {step == 2 ? 
                      <StripeComp data={tableContent}/>
                      // <StripeComp />
                    : ''}
                  </div>
                </ModalBody>
              </div>
            )}
          </ModalContent>
        </Modal>
    </>
  );
}
