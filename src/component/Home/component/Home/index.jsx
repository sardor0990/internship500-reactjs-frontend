import React from 'react'
import HeadSection from './HeadSection'
import Card from './Card'
import Footer from '../../Footer'
import Navbar from '../Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
       <HeadSection/> 
       <Card/>
       <Footer/>
    </div>
  )
}

export default Home