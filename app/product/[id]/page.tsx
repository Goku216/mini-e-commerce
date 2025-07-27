import Navbar from '@/components/navbar'
import ProductOverview from '@/components/product-overview'
import React from 'react'

type Props = {
  params: { id: string }
}

const page =async ({params}:Props) => {
     const {id} =await params
  return (
    <div>
      <Navbar/>
      <ProductOverview id={id} />
    </div>
  )
}

export default page
