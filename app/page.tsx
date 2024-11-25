'use client'
import Banner from './components/Banner/Banner';
import Companies from './components/Companies/Companies';
import Tabs from './components/Courses/Courses';
import Mentor from './components/Mentor/Mentor';
import Students from './components/Students/Students';
import Newsletter from './components/Newsletter/Newsletter';
import DropDownOptions from './components/BelowBanner/DropDownOptions';
import { AppContext } from './lib/AppContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
const { loggedIn } = useContext(AppContext);
const router=useRouter();
  useEffect(()=>{
    if(loggedIn){
      router.push('/company')
    }
  },[loggedIn])
  return (
    <>
      <Banner text={"Advanced Your Carrer With Us"}/>
      <DropDownOptions/>
      <Tabs />
      <Mentor />
      {/* <Students /> */}
      <Newsletter />
    </>
  )
}
