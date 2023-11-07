import React from 'react'
import { useState, useEffect } from 'react'
import ProductItems from './ProductItems'
import Spinner from './Spinner'
import { fetchApi } from '../api/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCart } from 'react-use-cart'
import { Select } from 'antd'

function Products(props) {
  props.myFun2(true)

  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(false)

  const handleResponseGetAllProducts = data => {
    setProducts(data)
  }

  const handleError = data => {
    toast.error(data?.message || 'Something went wrong!', {
      position: 'top-right',
      autoClose: 1500,
    })
  }

  const handleSelectProduct = searchString => {
    setLoading(true)
    fetchApi(
      'GET',
      'https://dummyjson.com',
      `products/search?q=${searchString}&limit=100`,
      handleResponseGetAllProducts,
      handleError
    )
    setLoading(false)
  }

  useEffect(() => {
    handleSelectProduct('')
  }, [])

  return (
    <div>
      <h1
        className={`text-3xl sm:text-5xl sm:text-center border-b-4 border-orange-400 font-bold inline-block mx-4 md:mx-6 mt-20 text-center `}
      >
        Featured Products
      </h1>
      <>
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={[
            {
              value: '',
              label: 'All products',
            },
            {
              value: 'shoes',
              label: 'Shoes',
            },
            {
              value: 'watch',
              label: 'Watch',
            },
            {
              value: 'womens',
              label: 'Womens',
            },
            {
              value: 'man',
              label: 'Man',
            },
            {
              value: '5',
              label: 'Resolved',
            },
            {
              value: '6',
              label: 'Cancelled',
            },
          ]}
          // 'https://dummyjson.com/products/search?q=phone'
          // ``
          onChange={e => handleSelectProduct(e)}
        />
      </>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-14 gap-x-4 my-14 md:my-20 sm:mx-7 -z-10 mx-4">
          {products?.products?.map(element => {
            return (
              <ProductItems
                key={element.id}
                id={element.id}
                title={element.title}
                price={element.price}
                category={element.category}
                description={element.description}
                image={element?.images[0]}
                mode={props.mode}
                addToCart={props.addToCart}
                item={element}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Products
