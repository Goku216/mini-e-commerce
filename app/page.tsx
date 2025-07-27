import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ProductListing } from '@/components/product-listing'
import React from 'react'

const page = () => {
  return (
    <section>
      <Navbar/>
      <ProductListing/>
      <Footer/>
    </section>
  )
}

export default page
