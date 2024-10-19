import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Details from './pages/Details'
import Cart from './pages/Cart'
import MainLayout from './layouts/MainLayout'

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    } else{
      navigate('/login')
    }
  }, [navigate])

  function PrivateRoute(isAuth, children) {
    if (!isAuth) {
      navigate('/login');
    }

    return children;
  }


  return (
    <Routes>
      <Route path='/' element={<MainLayout><Home /></MainLayout>}></Route>
      <Route path='/about' element={<MainLayout><About /></MainLayout>}></Route>
      <Route path='/products' element={<MainLayout><Products /></MainLayout>}></Route>
      <Route path='/products:id' element={<MainLayout><Details /></MainLayout>}></Route>
      <Route path='/cart' element={<MainLayout><Cart /></MainLayout>}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>

      <Route path='/orders' element={<PrivateRoute isAuth={!!token}><MainLayout><Orders /></MainLayout></PrivateRoute>}></Route>
      <Route path='/checkout' element={<PrivateRoute isAuth={!!token}><MainLayout><Checkout /></MainLayout></PrivateRoute>}></Route>

      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  )
}

export default App