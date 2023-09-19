'use client';

import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

import { useForm } from 'react-hook-form';

import { useUserService } from '_services';
import { FaRegistered } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { toast } from "react-toastify";
import SelectComp from "./selectComp";

export default function ModalComp() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const userService = useUserService();

  const currentUser = userService.currentUser;

  const isActionEnded = userService.isActionEnded;

  useEffect(() => {
    console.log('isActionEnded is Changed');
    if(isActionEnded){
      userService.setActionFlag(false);
      onClose();
    }
  },[isActionEnded])

    //schoolEmail validation
    const [schoolEmail, setschoolEmail] = React.useState('');

    const schoolEmailValidationState = React.useMemo(() => {
      return schoolEmail == '' ? "invalid" : "valid";
    }, [schoolEmail]);

    //schoolEmail validation
    const [schoolPasscode, setschoolPasscode] = React.useState('');

    const schoolPasscodeValidationState = React.useMemo(() => {
      if(!schoolPasscode) return 'invalid';
      // else if(schoolPasscode.length < 6) return 'short';
    }, [schoolPasscode]);

    //select Comp
    const [schoolName, setschoolName] = React.useState('');

    const schoolNameValidationState = React.useMemo(() => {
      return schoolName == '' ? "invalid" : "valid";
    }, [schoolName]);

    //submit
    const registerClickHandle = async() => {
      if(schoolEmailValidationState == 'invalid' ||
        schoolPasscodeValidationState == 'short' ||
        schoolPasscodeValidationState == 'invalid' ||
        schoolNameValidationState == 'invalid'){
            toast.warning('Please enter all info');
            return
      } else {
        
        await userService.registerAsGuest({
          schoolEmail: schoolEmail,
          schoolPasscode: schoolPasscode,
          schoolName: schoolName
        });
        onClose();
      }
      
    }

  return (
    <>      
        <div
            className="bg-[#023E89] hover:bg-[#012D78] duration-300 font-bold text-white text-center text-[20px] py-2 px-auto min-[360px]:w-2/3 max-[360px]:w-full  rounded-t-md rounded-bl-md cursor-pointer"
            onClick={onOpen}
        >
            Continue as guest
        </div>
      {/* <div 
        onClick={onOpen} 
        className={`flex justify-center items-center 
        cursor-pointer ${currentUser ? 'invisible' : ''} min-[820px]:hidden max-[820px]:block`}>
          <FaRegistered size={'30px'} color="blue" />
      </div> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} size="sm">
        <ModalContent>
          {(onClose) => (
            <div className="bg-[#1C2527] pb-3">
              <ModalHeader className="flex flex-row gap-1 justify-between">
                <p className='text-[18px] font-bold text-white'>
                  <span className='text-[#023E89]'>Swift&nbsp;</span>
                  Study
                </p>
                <ImCross onClick={onClose} size={'20px'} color='#023E89' className="hover:scale-125 duration-300 cursor-pointer" />
              </ModalHeader>
              <ModalBody>
                <div className="text-[32px] text-white font-bold mb-4">
                  <p>Continue As</p>
                  <p className="-mt-2">Guest</p>
                </div>
                <div className="text-white">

                  <Input
                    value={schoolEmail}
                    type="email"
                    label="School Email"
                    variant="underlined"
                    color={(schoolEmailValidationState === "invalid" || schoolEmailValidationState === "short" ) ? "danger" : "success"}
                    errorMessage={schoolEmailValidationState === "invalid" && "Please enter the schoolEmail"}
                    validationState={schoolEmailValidationState}
                    onValueChange={setschoolEmail}
                    className="w-full"
                  />

                  <Input
                    value={schoolPasscode}
                    type="password"
                    label="School Pascode"
                    variant="underlined"
                    color={schoolPasscodeValidationState === "invalid" ? "danger" : "success"}
                    errorMessage={(schoolPasscodeValidationState === "invalid" && "Please enter the email") || (schoolPasscodeValidationState === "short" && "Password must be at least 6 length")}
                    validationState={schoolPasscodeValidationState}
                    onValueChange={setschoolPasscode}
                    className="w-full"
                  />

                  <SelectComp 
                    label="SchoolName" 
                    valueList={['', 'University of Arkansas', 'Arizona State University']} 
                    tableContent={schoolName}
                    setTableContent={setschoolName}
                  />

                  <p className="text-[12px] mt-3 pl-1 font-light">By creating an account you agree to the terms & condtions</p>

                  <div
                      className="bg-[#023E89] hover:bg-[#012D78] duration-300 font-bold text-white text-center text-[20px] mt-5 py-2 px-auto w-full rounded-t-md rounded-bl-md cursor-pointer"
                      onClick={registerClickHandle}
                    >
                      Continue as Guest
                  </div>
                </div>

              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
