"use client"

import { redirect } from 'next/navigation';
import React from 'react'

import {useUserService} from '_services';
import Table from '_components/table';

export default function Home() {

    const userService = useUserService();

    userService.setCurrentPage('home');

    redirect('/secure');
    

  return (
    <div>
        Home
    </div>
  )
}