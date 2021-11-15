import { useRouter } from "next/router"
import Image from 'next/image'
import React, {useContext, useEffect} from "react";
import {userContext} from '../../context/userContext'
import Map from '../../components/Map'
import Link from 'next/link'
import { RewindIcon } from '@heroicons/react/outline'
import {IResult} from 'UserDirectory'
import ErrorPage from "../../components/errorPage";


export default function User() {
    const {selectedUser} = useContext(userContext)
    const router = useRouter()
    const username = router.query
   let user:IResult = selectedUser





    return(
        <>
      {user == null ? <ErrorPage/> :
      <div className="relative py-8 bg-gradient-to-r from-blue-400  to-blue-900">
      <div className='flex justify-center pb-2'>
      <a
        type="button"
        className="inline-flex justify-center  p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       <Link href='/' 
        >
       Return
      </Link>
      <RewindIcon className="h-6 w-6" aria-hidden="true" />
      </a>
      </div>
          <div className=" bg-gray-50 lg:block" aria-hidden="true" />
          <div className='xm:mx-4 lg:mx-16 overflow-hidden shadow-lg border-white rounded-2xl bg-gradient-to-r from-black  to-gray-600 bg-opacity-60'>
          <div className=" relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
            <div className="max-w-md px-9 mx-9  sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="lg:flex md:grid sm:grid justify-between ">
                <Image width={200} height={200}
                  className="object-cover object-center rounded-3xl shadow-2xl"
                  src={user.picture.large}
                  alt=""
                />
                <div className='lg:w-1/2'>
                <Map longitude={user.location.coordinates.longitude} latitude={user.location.coordinates.latitude}/>
                </div>
              </div>
            </div>
          </div>
          
              <div className="bg-white shadow mx-8 my-8 overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Username</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.login.username}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.name.title} {user.name.first} {user.name.last}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">DOB : Age</dt>
            <dd className="mt-1 text-sm text-gray-900">{new Date(user.dob.date).toLocaleDateString()} : {user.dob.age}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className=" text-sm text-gray-900">{user.location.street.number}</dd>
            <dd className=" text-sm text-gray-900">{user.location.street.name}</dd>
            <dd className=" text-sm text-gray-900">{user.location.city}</dd>
            <dd className=" text-sm text-gray-900">{user.location.state}</dd>
            <dd className=" text-sm text-gray-900">{user.location.postcode}</dd>
            <dd className=" text-sm text-gray-900">{user.location.country}</dd>


          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
            <dd className="mt-1 text-sm text-gray-900">{user.cell}</dd>
          </div>
        </dl>
      </div>
      </div>
    </div>

   </div>}

        </>
    )
    
    
  }