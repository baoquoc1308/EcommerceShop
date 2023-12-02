import React from 'react'
import { useState, useEffect } from 'react'
import ProductItems from '../ProductItems'
import Spinner from '../Spinner'
import { fetchApi } from '../../api/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Select } from 'antd'
import '../Products/index.scss'

function Products(props) {
  props.myFun(true)
  props.myFun2(true)
  // Destructuring phần tử Option từ component Select
  const { Option } = Select
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortOption, setSortOption] = useState(null)
  // hàm xử lý khi nhận được dữ liệu từ API, cập nhật state products với dữ liệu mới.
  const handleResponseGetAllProducts = data => {
    // Sử dụng hàm setProducts để cập nhật giá trị của state products với dữ liệu mới nhận được từ API
    setProducts(data)
  }

  const handleError = data => {
    toast.error(data?.message || 'Something went wrong!', {
      position: 'top-right',
      autoClose: 1500,
    })
  }

  const handleSelectProduct = searchString => {
    // Đặt state loading thành true, để hiển thị trạng thái tải dữ liệu (loading) trước khi gọi API.
    setLoading(true)
    fetchApi(
      'GET',
      'https://dummyjson.com',
      `products/search?q=${searchString}&limit=100`,
      // Hàm xử lý dữ liệu khi API thành công, được truyền vào để xử lý dữ liệu trả về từ API và cập nhật state products.
      handleResponseGetAllProducts,
      // Hàm xử lý lỗi, được truyền vào để xử lý lỗi nếu có.
      handleError
    )
    // Đặt lại state loading thành false sau khi gọi API, để ẩn trạng thái tải dữ liệu.
    setLoading(false)
  }
  // hàm handleSortChange nhận giá trị value (lựa chọn của người dùng về thứ tự sắp xếp).
  const handleSortChange = value => {
    // Sử dụng setSortOption để cập nhật giá trị của state sortOption thành giá trị mới,
    setSortOption(value)
  }
  const sortProducts = () => {
    if (sortOption === 'lowToHigh') {
      // Sắp xếp sản phẩm theo giá tăng dần
      setProducts({
        // Sử dụng hàm sort để sắp xếp mảng sản phẩm. Hàm sort nhận một hàm so sánh làm tham số
        products: products.products.sort((a, b) => a.price - b.price),
      })
    } else if (sortOption === 'highToLow') {
      // Sắp xếp sản phẩm theo giá giảm dần
      setProducts({
        products: products.products.sort((a, b) => b.price - a.price),
      })
    }
  }
  useEffect(() => {
    // tải danh sách sản phẩm khi component được khởi tạo.
    handleSelectProduct('')
  }, [])
  useEffect(() => {
    // gọi hàm sortProducts khi có sự thay đổi trong sortOption hoặc products.
    // Khi người dùng thay đổi lựa chọn sắp xếp hoặc danh sách sản phẩm thay đổi, hàm này sẽ được gọi để cập nhật lại danh sách sản phẩm theo thứ tự mới.
    sortProducts()
  }, [sortOption, products])

  return (
    <div>
      <h1 className="cate">Featured Products</h1>
      <Select
        showSearch
        style={{
          width: 150,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
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
            value: 'bag',
            label: 'Bag',
          },
          {
            value: 'glasses',
            label: 'Glasses',
          },
        ]}
        // Khi giá trị của trường chọn thay đổi, hàm này sẽ được gọi với đối số là sự kiện (e), và sau đó nó gọi hàm handleSelectProduct với đối số là giá trị của sự kiện.
        onChange={e => handleSelectProduct(e)}
      />
      <Select
        style={{ width: 150, marginLeft: 10 }}
        placeholder="Sort By"
        onChange={handleSortChange}
      >
        <Option value="lowToHigh">Giá tăng dần</Option>
        <Option value="highToLow">Giá giảm dần</Option>
      </Select>
      <hr className="hr-separator" />

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
