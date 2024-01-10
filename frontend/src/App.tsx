import { lazy, useContext } from 'react'
import GlobalContextProvider from './context/GlobalContext'
import { Outlet, useLocation } from 'react-router-dom'
import { GlobalContext } from './context/GlobalContext'
import { AnimatePresence } from 'framer-motion'
import { Cart, Footer, Header } from './features'
const User = lazy(() => import('./features/User/User'))
const AddressManager = lazy(() => import('./features/User/AddressManager'))
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";



export const useGlobalState = () => {
  return useContext(GlobalContext)
}

function App() {
  const location = useLocation()

  const isCheckoutRoute = location.pathname.toLowerCase().includes("/checkout") || location.pathname.toLowerCase().includes("/dashboard-admin")

  return (

    <div className='h-full item-center  w-full flex flex-col relative '>
      <ToastContainer theme='dark' />

      <AnimatePresence>
        <GlobalContextProvider>
          {!isCheckoutRoute && <Header />}
          <Cart />
          <User />
          <AddressManager />
          <Outlet />
          {!isCheckoutRoute && <Footer />}
        </GlobalContextProvider>
      </AnimatePresence>
    </div>
  )
}

export default App
