import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Starting from '../pages/Starting'

function MainRoutes() {
    return (

        <Routes>

            <Route
                path='/'
                element={<Starting />}
            >

            </Route>

            <Route
                path='/home'
                element={<Home></Home>}
            >

            </Route>

        </Routes>



    )
}

export default MainRoutes