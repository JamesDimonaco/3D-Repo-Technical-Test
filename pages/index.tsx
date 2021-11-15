import Head from 'next/head'
import axios from "axios";
import React, {useEffect, useState, useContext} from 'react';
import { userContext } from '../context/userContext';
import Pagination from '../components/Pagination';
import Link from 'next/link'
const crypto = require('crypto');


export default function Home() {
  const { setSelectedUser} = useContext(userContext)
  const [people, setPeople] = useState(null)
  const [pageNumber, setPageNumber] = useState(null)

  let seed:string

useEffect(() => {
  if (typeof window !== 'undefined') {      
     if(localStorage.getItem('seed') == null){
        seed = crypto.randomBytes(8).toString('hex')
     }else {
      seed = localStorage.getItem('seed')
     }
} 
if (localStorage.getItem('page') == null){  
  getUsers(1)
  setPageNumber(1)
}else {
  getUsers(parseInt(localStorage.getItem('page')))
  setPageNumber(parseInt(localStorage.getItem('page')))

}


}, [])


  const getUsers = async (pageNum:number) => {
    const res = await axios.get(`/api/getUsers?seed=${seed}&page=${pageNum}`)
    setPeople(res.data.users) 
  }
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-t from-purple-600 to-purple-900">
      <Head>
        <title>3D Repo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {people == null ? <div className=" pt-10 flex justify-center items-center">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
</div> : 
      <main className="">
      <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24 bg-gray-600 rounded-lg shadow-lg bg-opacity-40">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">The People</h2>
          </div>
          <ul
            role="list"
            className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
          >

            {people.map((person) => (
              <Link href={`/users/${person.login.username}`}>
              <li onClick={() => setSelectedUser(person)} key={person.login.uuid}>
                <div className="py-2 space-y-4 hover:cursor-pointer hover:shadow hover:bg-gray-700">
                  <img className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src={person.picture.large} alt="" />
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <h3>{person.name.title} {person.name.first} {person.name.last}</h3>
                      <p className="text-gray-400 text-xs">{person.login.username}</p>
                    </div>
                  </div>
                </div>
              </li>
              </Link>
            ))}
          </ul>
        </div>

        <nav
        className=" px-4 py-3 flex items-center justify-between  sm:px-6"
        aria-label="Pagination"
      >
    <div className="hidden sm:block">
        <p className="text-sm text-white">
          Page number <span className="font-medium text-white">{pageNumber}</span> {' '}
        </p>
      </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            onClick={() => {
              const pageNum:any = pageNumber - 1;
              localStorage.setItem('page', pageNum)
              setPageNumber(pageNum)
               getUsers(pageNum)
             }}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
             const pageNum:any = pageNumber + 1;
             localStorage.setItem('page', pageNum)
             setPageNumber(pageNum)
              getUsers(pageNum)
            }}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </nav>
      </div>    
  </main>}

      </div>
    </>
  )
}


