import React, { useState, Suspense, useEffect } from 'react'
import { createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import configApi from './services/api/config'
import Layout from './layouts/main'



const Bootstrap = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    configApi.fetch().then((conf: any) => {
      // @ts-ignore
      global.config = conf
      setLoaded(true)
    })
  }, [])
  if (loaded) {
    const App = React.lazy(() => import('./views/index'))
    const Chart = React.lazy(() => import('./views/chart'))
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<App />}/>
            <Route path="/chart" element={<Chart />}>
            </Route>
        </Route>
      )
    )
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        </Suspense>
      
    )
  }
  return null
}

export default Bootstrap
