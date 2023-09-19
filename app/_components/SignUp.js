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

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();

    // FullName validation
    const [fullNameValue, setFullNameValue] = React.useState("Jhon Doe");

    const fullNameValidationState = React.useMemo(() => {
      return fullNameValue == '' ? "invalid" : "valid";
    }, [fullNameValue]);

    // Email validation
    const [emailValue, setEmailValue] = React.useState("junior2nextui.org");

    const emailValidationState = React.useMemo(() => {
      return emailValue == '' ? "invalid" : "valid";
    }, [emailValue]);  

    //password validation
    const [passwordValue, setPasswordValue] = React.useState('');

    const passwordValidationState = React.useMemo(() => {
      if(!passwordValue) return 'invalid';
      else if(passwordValue.length < 6) return 'short';
    }, [passwordValue]);

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
      if(passwordValidationState == 'invalid' || 
        passwordValidationState == 'short' ||
        emailValidationState == 'invalid' || 
        fullNameValidationState == 'invalid' ||
        schoolEmailValidationState == 'invalid' ||
        schoolPasscodeValidationState == 'short' ||
        schoolPasscodeValidationState == 'invalid' ||
        schoolNameValidationState == 'invalid'){
        toast.warning('Please enter all info');
        return
      } else {
        await userService.register({
          fullName: fullNameValue,
          email: emailValue,
          password: passwordValue,
          schoolEmail: schoolEmail,
          schoolPasscode: schoolPasscode,
          schoolName: schoolName
        });
      }
      
    }

  return (
    <>      
      <div 
        onClick={onOpen} 
        className={`flex justify-center items-center border rounded-tr-[4px] 
        rounded-bl-[4px] border-[#023E89] bg-[#023E89] text-white py-2 px-4 
        cursor-pointer ${currentUser ? 'invisible' : ''} min-[820px]:block max-[820px]:hidden
        font-normal text-[14px] text-[#FFF] hover:bg-[#245C9A] duration-300
        `}>
          Sign Up
      </div>
      <div 
        onClick={onOpen} 
        className={`flex justify-center items-center 
        cursor-pointer ${currentUser ? 'invisible' : ''} min-[820px]:hidden max-[820px]:block`}>
          <FaRegistered size={'30px'} color="blue" />
      </div>
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
                  <p>Register An</p>
                  <p className="-mt-2">Account</p>
                </div>
                <div className="text-white">
                  <Input
                    value={fullNameValue}
                    type="text"
                    label="FullName"
                    variant="underlined"
                    color={fullNameValidationState === "invalid" ? "danger" : "success"}
                    errorMessage={fullNameValidationState === "invalid" && "Please enter the email"}
                    validationState={fullNameValidationState}
                    onValueChange={setFullNameValue}
                    className="w-full"
                  />

                  <Input
                    value={emailValue}
                    type="email"
                    label="Email"
                    variant="underlined"
                    color={emailValidationState === "invalid" ? "danger" : "success"}
                    errorMessage={emailValidationState === "invalid" && "Please enter the email"}
                    validationState={emailValidationState}
                    onValueChange={setEmailValue}
                    className="w-full mt-1"
                  />

                  <Input
                    value={passwordValue}
                    type="password"
                    label="Password"
                    variant="underlined"
                    color={passwordValidationState === "invalid" ? "danger" : "success"}
                    errorMessage={(passwordValidationState === "invalid" && "Please enter the email") || (passwordValidationState === "short" && "Password must be at least 6 length")}
                    validationState={passwordValidationState}
                    onValueChange={setPasswordValue}
                    className="w-full mt-1"
                  />

                  <SelectComp 
                    label="SchoolName" 
                    valueList={['', 'University of Arkansas', 'Arizona State University']} 
                    tableContent={schoolName}
                    setTableContent={setschoolName}
                  />

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

                  <p className="text-[12px] mt-3 pl-1 font-light">By creating an account you agree to the terms & condtions</p>

                  <div
                      className="bg-[#023E89] hover:bg-[#012D78] duration-300 font-bold text-white text-center text-[20px] mt-5 py-2 px-auto w-full rounded-t-md rounded-bl-md cursor-pointer"
                      onClick={registerClickHandle}
                    >
                      Register
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
