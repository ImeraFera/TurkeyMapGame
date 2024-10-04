import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './components/PageContainer'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'
import { useSelector } from 'react-redux'

function App() {



  return (
    <>
      <Router>
        <PageContainer>
          <MainRoutes></MainRoutes>
        </PageContainer>
      </Router>
    </>
  )
}

export default App
