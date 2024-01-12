import { lazy, useContext } from 'react'
import GlobalContextProvider from './context/GlobalContext'
import { useLocation } from 'react-router-dom'
import { GlobalContext } from './context/GlobalContext'
import { BurgerMenu, Cart, Footer, Header } from './features'
const User = lazy(() => import('./features/User/User'))
const AddressManager = lazy(() => import('./features/User/AddressManager'))
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import RoutesConfig from './routes/routesConfig'



export const useGlobalState = () => {
  return useContext(GlobalContext)
}

function App() {
  const location = useLocation()

  const isCheckoutRoute = location.pathname.toLowerCase().includes("/checkout") || location.pathname.toLowerCase().includes("/dashboard-admin")

  return (


    <div className='max-w-[1523px] w-full item-center ml-auto mr-auto h-full flex flex-col '>
      <ToastContainer theme='dark' />

      <GlobalContextProvider>
        {!isCheckoutRoute && <Header />}
        <BurgerMenu />
        <Cart />
        <RoutesConfig />
        <User />
        <AddressManager />
        {!isCheckoutRoute && <Footer />}
      </GlobalContextProvider>
    </div>



  )
}

export default App
