import { RouterProvider } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { router } from "./routes/routes"

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <NavBar />
        <div className='max-w-7xl mx-auto pt-20 px-6'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
