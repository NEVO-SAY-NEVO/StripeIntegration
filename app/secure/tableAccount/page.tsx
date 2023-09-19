"use client"

import { redirect } from 'next/navigation';
import React from 'react'

import {useUserService} from '_services';

export default function TableAccount() {

    const userService = useUserService();

    userService.setCurrentPage('tableAccount');

    redirect('/secure');

  return (
    <div>TableAccount</div>
  )
}