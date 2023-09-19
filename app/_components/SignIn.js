"use client"

import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

import {useForm} from 'react-hook-form';

import {useUserService} from '_services';

import { IoMdLogIn } from 'react-icons/io'
import { ImCross } from 'react-icons/im'


export default function ModalComp({flag}) {
  
  console.log('SignIn Flag => ', flag)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const userService = useUserService();

  const currentUser = userService.currentUser;

    // get functions to build form with useForm() hook
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;

    const fields = {
        email: register('email', {required: 'Email is required'}),
        password: register('password', {required: 'Password is required'})
    };

    async function onSubmit({email, password}) {
        await userService.login(email, password);
    }

  // Email validation
  const [emailValue, setEmailValue] = React.useState("junior2nextui.org");

  const emailValidationState = React.useMemo(() => {
    return emailValue == '' ? "invalid" : "valid";
  }, [emailValue]);  

  //password validation
  const [passwordValue, setPasswordValue] = React.useState('');

  const passwordValidationState = React.useMemo(() => {
    return passwordValue == '' ? "invalid" : "valid";
  }, [passwordValue]);

  //submit
  const loginClickHandle = async() => {
    if(passwordValidationState == 'invalid' || emailValidationState == 'invalid'){
      return
    } else {
        await userService.login(emailValue, passwordValue);
    }
  }

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Sign Up</Button> */}
      {flag == 'Header' 
        ? <>
            <div 
              onClick={onOpen} 
              className={`flex flex-row justify-center items-center border-1 rounded-tr-[4px] 
              rounded-bl-[4px] border-[#023E89] bg-white py-2 px-4 cursor-pointer
              text-[#023E89] hover:border-white duration-300 ${currentUser ? 'invisible' : ''} min-[820px]:block max-[820px]:hidden 
              font-normal text-[14px] text-[#333]`}>
                Sign In
            </div>
            <div 
              onClick={onOpen} 
              className={`flex justify-center items-center 
              cursor-pointer text-[#023E89] ${currentUser ? 'invisible' : ''}
              min-[820px]:hidden max-[820px]:block`}>
                <IoMdLogIn size={'30px'} color="blue" />
            </div>
          </>
        :
          <></>
      }
      {flag == 'GetStarted'
        ?
        <div
            className="bg-[#ac23a5]  hover:bg-[#ff7ade] duration-300 font-bold text-white text-center text-[20px] py-2 px-auto min-[360px]:w-1/3 max-[360px]:w-full rounded-t-md rounded-bl-md cursor-pointer"
            onClick={onOpen}
        >
          Login
        </div>
        :
        <></>
      }
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} size="sm">
        <ModalContent>
          {(onClose) => (
            <div className="bg-[#1C2527] pb-4">
              <ModalHeader className="flex flex-row gap-1 justify-between">
                <p className='text-[18px] font-bold text-white'>
                  <span className='text-[#023E89]'>Swift&nbsp;</span>
                  Study
                </p>
                <ImCross onClick={onClose} size={'20px'} color='#023E89' className="hover:scale-125 duration-300 cursor-pointer" />
              </ModalHeader>
              <ModalBody>
                <div className="text-[32px] text-white font-bold">
                  <div className="font-bold mt-3.5 mb-3 leading-tight">
                    <p>Login to</p>
                    <p>Account</p>
                  </div>
                    <div className="mb-4">
                      <Input
                        value={emailValue}
                        type="email"
                        label="Email"
                        variant="underlined"
                        color={emailValidationState === "invalid" ? "danger" : "success"}
                        errorMessage={emailValidationState === "invalid" && "Please enter the email"}
                        validationState={emailValidationState}
                        onValueChange={setEmailValue}
                        className="w-full !border-b-0"
                        classNames={{
                          mainWrapper: "!border-none"
                        }}
                      />
                      <Input
                        value={passwordValue}
                        type="password"
                        label="Password"
                        variant="underlined"
                        color={passwordValidationState === "invalid" ? "danger" : "success"}
                        errorMessage={passwordValidationState === "invalid" && "Please enter the password"}
                        validationState={passwordValidationState}
                        onValueChange={setPasswordValue}
                        className="w-full"
                      />
                    </div>
                    <div
                      className="bg-[#023E89] hover:bg-[#012D78] duration-300 font-bold text-white text-center text-[20px] mt-5 py-2 px-auto w-full rounded-t-md rounded-bl-md cursor-pointer"
                      onClick={loginClickHandle}
                    >
                      Login
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
