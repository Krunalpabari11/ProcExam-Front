import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import CompanyRegister from "./CompanyRegister";
import StudentRegister from "./StudentRegister";
import Contactus from "./Contactus";
import StudentSignin from './StudentSignin';
import CompanySignin from './CompanySignin';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Courses', href: '#courses-section', current: false },
  { name: 'Mentors', href: '#mentors-section', current: false },
  { name: 'Testimonial', href: '#testimonial-section', current: false },
  { name: 'Join', href: '#join-section', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const toggleSignInDropdown = () => {
    setIsSignInOpen(!isSignInOpen);
    setIsRegisterOpen(false); 
  };

  const toggleRegisterDropdown = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsSignInOpen(false); 
  };

  return (
    <Disclosure as="nav" className="bg-lightpink navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">

              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-30px w-30px lg:hidden"
                  src={'/assets/logo/Logo.svg'}
                  alt="Courses-Logo"
                />
                <img
                  className="hidden h-48px w-48px lg:block"
                  src={'/assets/logo/Logo.svg'}
                  alt="Courses-Logo"
                />
              </div>

              <div className="hidden sm:ml-14 md:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'text-purple' : 'hover:text-purple',
                        'px-3 py-4 text-15px font-medium space-links'
                      )}
                      aria-current={item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Contactus />
                </div>
              </div>
            </div>

            <div className="relative mr-4">
              <button
                onClick={toggleSignInDropdown}
                className="hover:text-purple font-medium py-2 px-4 rounded"
              >
                Sign In
              </button>
              {isSignInOpen && (
                <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    <CompanySignin />
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    <StudentSignin />
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleRegisterDropdown}
                className="bg-purple hover:bg-purple hover:text-white text-white font-medium py-2 px-4 rounded"
              >
                Register
              </button>
              {isRegisterOpen && (
                <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    <CompanyRegister />
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    <StudentRegister />
                  </button>
                </div>
              )}
            </div>

            <div className='block md:hidden'>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
            </div>

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
}

export default Navbar;
