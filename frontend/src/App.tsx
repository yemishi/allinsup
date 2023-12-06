import { useEffect, useContext, } from 'react'
import GlobalContextProvider from './context/GlobalContext'
import { GlobalContext } from './context/GlobalContext'

import Header from "./components/Header"
import Routes from "./routes/index"



export const useGlobalState = () => {
  return useContext(GlobalContext)
}
function App() {
  useEffect(() => {

  })

  return (


    <GlobalContextProvider>
      <Header />
      <Routes />
    </GlobalContextProvider>
  )
}

export default App
