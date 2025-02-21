import React, { useEffect } from 'react'
import Hero from '../../components/Home/Hero'
import Features from '../../components/Home/Features'
import Deals from '../../components/Home/Deals'
import BestSellers from '../../components/Home/BestSellers'
import FeaturedProducts from '../../components/Home/FeaturedProducts'
import ShopByCategory from '../../components/Home/ShopByCategory'
import Features2 from '../../components/Home/Features2'

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <Features/>
      <Deals/>
      <BestSellers/>
      <FeaturedProducts/>
      <ShopByCategory/>
      <Features2/>
    </div>
  )
}

export default Home