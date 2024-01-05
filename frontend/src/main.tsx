import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'
import Routes from './routes/index.tsx'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(

    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
)
