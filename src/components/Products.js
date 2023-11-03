import React from 'react'
import { useState , useEffect } from 'react';
import ProductItems from './ProductItems';
import Spinner from './Spinner';
import { fetchApi } from '../api/api';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Products(props) {

  props.myFun(true);
  props.myFun2(true);

 const [products, setProducts] = useState([]);
 
 const [loading, setLoading] = useState(false)

  const handleResponseGetAllProducts = (data) => {
    setProducts(data)
  }

  const handleError = (data) => {
    toast.error(data?.message || 'Something went wrong!', {
      position: "top-right",
      autoClose: 1500,
    })
  }

  const handleGetAllDataProducts = () => {
    setLoading(true)
    fetchApi("GET", 'https://dummyjson.com', "products", handleResponseGetAllProducts, handleError)
    setLoading(false)
  }

  useEffect(() => {
    handleGetAllDataProducts()
  }, [])

  return (
    
    <div>
      <h1 className={`text-3xl sm:text-5xl sm:text-center border-b-4 border-orange-400 font-bold inline-block mx-4 md:mx-6 mt-20 text-center ${props.mode==='dark'?'text-white':'text-black'} `}>Featured Products</h1>
      
     {loading?<Spinner/>:
     
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-14 gap-x-4 my-14 md:my-20 sm:mx-7 -z-10 mx-4">

       {products?.products?.map((element)=>{
        return (
          <ProductItems key={element.id} id={element.id} title ={element.title} price={element.price} category={element.category} description={element.description} image={element?.images[0]} mode={props.mode} addToCart={props.addToCart} item={element}/>
        )
       })}
    </div>}
    </div> 
  )
}

export default Products;