import { useEffect, useContext, } from 'react'
import GlobalContextProvider from './context/GlobalContext'
import { GlobalContext } from './context/GlobalContext'
import { Cart, Header } from './components'
import Routes from "./routes/index"



export const useGlobalState = () => {
  return useContext(GlobalContext)
}
function App() {
  useEffect(() => {

  })

  return (


    <div className='h-full item-center p-0 m-0 w-full flex flex-col relative '>
      <GlobalContextProvider>
        <Header />
        <Cart />
        <Routes />
      </GlobalContextProvider>
    </div>
  )
}

export default App
