import { Hero } from '../components/homePage/Hero'
import { LightUpYourSpace } from '../components/homePage/LightUpYourSpace'
import { FeaturedCollections } from '../components/homePage/FeaturedCollections'
import { Subscription } from '../components/homePage/Subscription'


export const Home = () => {

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <LightUpYourSpace />
      <Subscription />
    </>
  )
}