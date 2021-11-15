import 'tailwindcss/tailwind.css'
import {userContext} from '../context/userContext'
import {useState} from 'react'
// import IResult from 'UserDirectory'


function MyApp({ Component, pageProps }) {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
  <> 
  <userContext.Provider value={{selectedUser, setSelectedUser}}>
  <Component {...pageProps} /> 
  </userContext.Provider>

  </>
  )
}

export default MyApp
