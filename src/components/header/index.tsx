import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../icons/home';
import { Menu,  Transition } from '@headlessui/react'

export default function Header() {
  console.log("derp")
  const links = [
    {
      to: "/chart",
      name: "Chart"
    }
  ]

  return (
    <div className="w-full bg-white px-6 overflow-visible">
      <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex-1 lg:flex-none">
          <Link to="/" className="flex">
            {/* house icon svg */}
            <HomeIcon height="2em" width="2em" viewBox="0 0 256 256" />
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          {/* <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
          <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium  focus:outline-none ">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {links.map((link) => (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={link.to}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {link.name}
                    </Link>
                  )}
                </Menu.Item>
              ))
              }
              {/* <Menu.Item disabled>
                <span className="opacity-75">Invite a friend (coming soon!)</span>
              </Menu.Item> */}
            </Menu.Items>
          
        </Transition>
      </Menu>
          
        </div>
        <nav className="hidden md:flex space-x-10">
          {links.map((link) => (
            <Link to={link.to} className="text-base font-medium text-gray-500 hover:text-gray-900">
              {link.name}
            </Link>
          ))}
          
        </nav>
        <div className="flex-none md:flex md:w-full md:flex-1">
        </div>
      </div>
    </div>
  )
}