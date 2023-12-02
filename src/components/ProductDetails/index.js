import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { fetchApi } from '../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../ProductDetails/index.scss'
import { Spin, Rate } from 'antd'
import { News } from '../imgP'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { formatNumber } from '../../utils'

function ProductDetails(props) {
  props.myFun(false)
  props.myFun2(true)

  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { addItem } = useCart()
  // lấy giá trị của accessToken từ localStorage để kiểm tra xem người dùng đã đăng nhập hay chưa.
  const token = localStorage.getItem('accessToken')
  // cung cấp thông tin về địa chỉ URL hiện tại
  const location = useLocation()
  // lấy giá trị của thuộc tính from từ đối tượng location.state
  const { from } = location.state

  const [productsSuggestion, setProductsSuggestion] = useState([])
  // Kiểm tra xem productsSuggestion có tồn tại và có thuộc tính products không. Nếu có, nó sẽ trả về mảng sản phẩm, ngược lại sẽ là undefined.
  const newProductsSuggestion = productsSuggestion?.products?.filter(item => {
    // Nếu mảng sản phẩm tồn tại, filter nó sẽ lọc các sản phẩm dựa trên điều kiện. Điều kiện là chỉ giữ lại các sản phẩm có id khác với products?.id.
    return item?.id !== products?.id
  })

  const handleResponseGetProductsSuggestion = data => {
    // cập nhật state productsSuggestion với dữ liệu mới.
    setProductsSuggestion(data)
  }

  const handleGetCategoryProducts = () => {
    fetchApi(
      'GET',
      'https://dummyjson.com',
      `products/category/${products?.category}`,
      // Sau khi nhận được dữ liệu từ yêu cầu, nó gọi hàm handleResponseGetProductsSuggestion để xử lý dữ liệu.
      handleResponseGetProductsSuggestion,
      handleError
    )
  }
  // Hàm này được gọi khi có phản hồi từ yêu cầu API thành công
  const handleResponseGetProductDetails = data => {
    // cập nhật state products với dữ liệu mới (setProducts(data)).
    setProducts(data)
    // Đặt loading về false để hiển thị rằng dữ liệu đã được tải thành công.
    setLoading(false)
  }
  const handleError = data => {
    toast.error(data?.message || 'Something went wrong!', {
      position: 'top-right',
      autoClose: 1500,
    })
  }

  const handleGetProductDetails = () => {
    fetchApi(
      'GET',
      'https://dummyjson.com',
      // from là một giá trị được trích xuất từ location.state trước đó và đại diện cho một ID sản phẩm cụ thể.
      `products/${from}`,
      // Khi có phản hồi từ yêu cầu API thành công, hàm này được gọi để xử lý dữ liệu.
      // Dữ liệu từ phản hồi được sử dụng để cập nhật state products và setLoading(false) để chỉ định rằng dữ liệu đã được tải xong.
      handleResponseGetProductDetails,
      handleError
    )
    // hiển thị một hiệu ứng loading hoặc thông báo cho người dùng biết rằng dữ liệu đang được tải.
    setLoading(true)
  }
  const notifySuccess = () => {
    addItem(products)
    toast('Product added to cart', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 500,
    })
  }

  const notifyError = () => {
    setTimeout(() => {
      navigate('/login')
    }, 500)
    toast.error('Please login account user!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  const handleAddItem = () => {
    token !== null ? notifySuccess() : notifyError()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    // thực hiện việc lấy chi tiết sản phẩm
    handleGetProductDetails()
    // Kiểm tra nếu products tồn tại và có ít nhất một sản phẩm (products?.length > 0), thì gọi hàm handleGetCategoryProducts()
    products?.length > 0 && handleGetCategoryProducts()
  }, [])

  useEffect(() => {
    // Nếu products?.category không phải là null hoặc undefined và products?.category là một giá trị truthy (có nghĩa là nó không phải là giá trị null, undefined, false, 0, NaN, hoặc một chuỗi rỗng), thì handleGetCategoryProducts sé được thực hiện
    products?.category && handleGetCategoryProducts()
    // useEffect sẽ được gọi lại khi giá trị trong products?.category thay đổi.
    // Nếu products?.category thay đổi giá trị, useEffect sẽ chạy lại hàm bên trong nó.
  }, [products?.category])
  // Khởi tạo giá trị ban đầu cho oldId bằng cách lấy phần tử cuối cùng trong mảng được tạo bằng cách tách chuỗi location.pathname với ký tự '/'.
  // Hiện tại oldId = id trên URL của sản phẩm được xem chi tiết, ví dụ: location.pathname.split('/').pop() = 5 -> oldId = 5
  const [oldId, setOldId] = useState(location.pathname.split('/').pop())
  // isReloaded = true thì màn hình window reload lại để hiển thị sản phẩm theo id được cập nhật trên url
  // isReloaded = false thì ko reload lại màn hình window
  const [isReloaded, setIsReloaded] = useState(false)
  useEffect(() => {
    // so sánh 2 id (oldId lúc đầu và oldId sau khi click vào sản phẩm tương tự trong trang chi tiết) nếu oldId(sau khi cập nhật, ví dụ: = 4) khác với oldId ban đầu (=5)
    // thì chúng ta cho reload lại màn hình, để call api productDetails cho id mới dòng 128
    if (oldId !== location.pathname.split('/').pop()) {
      setOldId(location.pathname.split('/').pop())
      window.location.reload()
      setIsReloaded(true)
    }
    // sau đó để ngừng thì cần cho isReload = false nếu như chúng ta ko click sản phẩm tương tự
    // lúc đó oldId đã được cập nhật là oldId = 4, còn "location.pathname.split('/').pop()" lúc này trên URL cũng = 4
    // thì sẽ ko cần reload lại trang nữa
    if (oldId === location.pathname.split('/').pop()) {
      setIsReloaded(false)
    }
    // // đảm bảo rằng useEffect sẽ được kích hoạt và thực hiện các hành động liên quan khi có sự thay đổi trong location.pathname hoặc isReloaded
  }, [location.pathname, isReloaded])

  useEffect(() => {
    // cập nhật giá trị của state variable oldId với giá trị mới của ID trong URL (lấy từ location.pathname).
    setOldId(location.pathname.split('/').pop())
  }, [])

  return (
    <div className=" lg:my-20 mx-8">
      <div
        className={`p-3 flex flex-col  transition-all mt-0 mx-auto md:w-96 lg:w-full justify-center`}
      >
        {!loading ? (
          <div className="product flex flex-col lg:flex-row">
            <div className="img lg:mx-4">
              <div class="discountPercentage_details">
                <div class="number-discount">
                  <span class="percent">
                    {Math.round(products?.discountPercentage)}%
                  </span>
                </div>
              </div>
              <img
                src={products?.images?.[0]}
                alt="Loading"
                className="image-products mx-auto bg-white shadow-lg rounded-2xl p-8"
              />
              <>
                <News data={products?.images} />
              </>
            </div>
            <div className="desc lg:mx-4">
              <p className="title font-semibold text-3xl my-7">
                {products?.title}
              </p>
              <p className="my-1 box-border">{products?.description}</p>

              <div class="price-total">
                <div class="old-price">
                  <span class="unit-price"> ₫</span>
                  <span class="num-old-price">
                    {formatNumber(products?.price * 23000)}
                  </span>
                </div>
                <div class="new-price">
                  <span class="unit-price">₫</span>
                  <span class="num-new-price">
                    {formatNumber(
                      products?.price * 23000 -
                        Math.round(
                          (products?.price * products?.discountPercentage) / 100
                        ) *
                          23000
                    )}
                  </span>
                </div>
              </div>
              <p className="stock"> Còn {products.stock} sản phẩm</p>
              <Rate disabled defaultValue={products?.rating} />
              <button
                className="bg-orange-400 text-white text-center  rounded-xl my-1 py-2 hover:scale-95"
                id="add"
                onClick={handleAddItem}
              >
                Buy Now
              </button>
              <ToastContainer autoClose={1500} />
            </div>
            <div className="desc lg:mx-4">
              <p>Gợi ý</p>

              {newProductsSuggestion?.map(element => {
                return (
                  <div className="product bg-white rounded-lg p-2 mx-11 md:mx-0">
                    <Link
                      to={`/productDetails/${element.id}`}
                      state={{ from: element?.id }}
                    >
                      <div>
                        <img
                          src={element?.images[0]}
                          alt="Loading"
                          className="w-20 h-30 mx-auto"
                        />
                      </div>

                      <p className="title font-semibold text-xs my-1">
                        {element.title.slice(0, 25)}...
                      </p>
                      <div class="price-total">
                        <div class="new-price">
                          <span class="unit-price">₫</span>
                          <span class="num-new-prices">
                            {formatNumber(
                              element.price * 23000 -
                                Math.round(
                                  (element.price *
                                    element?.discountPercentage) /
                                    100
                                ) *
                                  23000
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <Spin tip="Loading"></Spin>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
