import React from 'react'
import Hero from '../../components/Home/Hero'
import Features from '../../components/Home/Features'
import Deals from '../../components/Home/Deals'
import BestSellers from '../../components/Home/BestSellers'

const Home = () => {
  return (
    <div>
      <Hero />
      <Features/>
      <Deals/>
      <BestSellers/>
    </div>
  )
}

export default Home