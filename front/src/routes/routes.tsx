import { createBrowserRouter } from "react-router-dom"
import { HomeSection } from "../pages/HomeSection"
import { ClientsSection } from "../pages/ClientsSection"
import { AboutSection } from "../pages/AboutSection"
import { PageNotFound } from "../pages/PageNotFound"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeSection />,
    errorElement: <PageNotFound />
  },
  {
    path: '/clientes',
    element: <ClientsSection />
  },
  {
    path: '/sobre',
    element: <AboutSection />
  }
])
