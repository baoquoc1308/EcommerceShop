import React, { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import cart from '../images/cart.png'
import '../Cart/index.scss'
import { Modal } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QuestionCircleTwoTone } from '@ant-design/icons'
import { formatNumber } from '../../utils'

const Cart = props => {
  props.myFun(false)
  props.myFun2(true)

  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
    useCart()
  const [totalAllProduct, setTotalAllProduct] = useState(0)
  const [productToDelete, setProductToDelete] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken')

  const handleCheckout = order => {
    // Dòng này truy xuất danh sách các đơn hàng được lưu trữ hiện tại từ tệp localStorage. Nó sử dụng localStorage.getItem('storedOrders')để lấy giá trị liên quan đến khóa 'storedOrders'. Nếu có một giá trị, nó sẽ được phân tích cú pháp từ định dạng JSON bằng cách sử dụng JSON.parse(). Nếu không có giá trị hoặc phân tích cú pháp không thành công, một mảng trống []sẽ được gán cho
    let storedOrders = JSON.parse(localStorage.getItem('storedOrders')) || []
    // Nội dung được truyền vào hàm sẽ được thêm vào storedOrdersmảng. Điều này thể hiện việc thêm một đơn hàng mới vào danh sách các đơn hàng đã lưu trước đó.
    storedOrders.push(order)
    // thêm đơn hàng mới vào mảng storedOrders trong localStorage
    localStorage.setItem('storedOrders', JSON.stringify(storedOrders))
    setTimeout(() => {
      navigate('/checkoutform')
    }, 1000)
  }

  const [open, setOpen] = useState(false)

  const handleDeleteProducts = productId => {
    removeItem(productId)
    setOpen(false)
    toast.success('Đã xóa 1 sản phẩm ra khỏi giỏ hàng!', {
      position: 'top-right',
      autoClose: 1500,
    })
  }
  const showDeleteModal = productId => {
    setOpen(true)
    // lưu ID của sản phẩm cần xóa vào state productToDelete
    setProductToDelete(productId)
  }
  // ẩn modal xác nhận xóa sản phẩm
  const hideModal = () => {
    setOpen(false)
  }

  const handleUpdatePlusQuantity = item => {
    if (item.quantity < item.stock) {
      return updateItemQuantity(item.id, item.quantity + 1)
    } else {
      toast.warning('Số lượng mua vượt quá tổng kho!', {
        position: 'top-right',
        autoClose: 1500,
      })
    }
  }

  const handleUpdateMinusQuantity = item => {
    if (item.quantity > 1) {
      return updateItemQuantity(item.id, item.quantity - 1)
    }
  }

  useEffect(() => {
    // window.scrollTo(0, 0)
    if (items?.length > 0) {
      let sum = 0
      // Duyệt qua từng phần tử trong mảng items để tính tổng giá trị.
      items.forEach(item => {
        sum +=
          (item.price * 23000 -
            Math.round((item.price * item?.discountPercentage) / 100) * 23000) *
          item?.quantity
      })
      // Cập nhật state totalAllProduct bằng giá trị tính được từ việc duyệt qua các sản phẩm trong giỏ hàng
      setTotalAllProduct(sum)
    }
    // Kết thúc useEffectvà cung cấp mảng items làm dependency.
    // useEffect sẽ được gọi lại mỗi khi giá trị của items` thay đổi, như vậy, công việc bên trong nó sẽ được thực hiện khi giỏ hàng có sự thay đổi.
  }, [items])

  return isEmpty || token === null ? (
    <div className="grid my-36 md:my-8 align-middle justify-center ">
      <img src={cart} alt="Loading" srcset="" className={''} />
      <h1 className={`mx-auto mt-5 md:mt-0 text-lg`}>
        Your cart is empty
        <Link to="/">
          <button className={` p-2 rounded-sm mx-2`}>Home</button>
        </Link>
      </h1>
    </div>
  ) : (
    <div className="my-32 mb-60">
      <h2 className="title-product">THÔNG TIN SẢN PHẨM</h2>
      {items?.map(item => {
        return (
          <div
            key={item.id}
            className="products-items my-4 mx-4 bg-gray-100 p-5 flex rounded-xl"
          >
            <img
              src={item?.images[0]}
              alt=""
              className="w-24 h-24 rounded-md "
            />

            <div className="flex flex-col">
              <h1 className="mobile mx-3 font-bold text-lg md:hidden">
                {item.title.slice(0, 10)}...
              </h1>
              <h1 className="Desktop mx-3 font-bold text-lg hidden md:block">
                {item.title}
              </h1>

              <p className="mobile ml-3 md:hidden">
                {item.description.slice(0, 30)}...
              </p>
              <p className="desktop ml-3 hidden md:block w-96">
                {item.description.slice(0, 100)}...
              </p>
            </div>
            <div className="flex flex-row">
              <div class="price-total">
                <div class="old-price">
                  <span class="unit-price"> ₫</span>
                  <span class="num-old-price">
                    {formatNumber(item.price * 23000)}
                  </span>
                </div>
                <div> </div>
                <div class="new-price">
                  <span class="unit-price">₫</span>
                  <span class="num-new-price">
                    {formatNumber(
                      item.price * 23000 -
                        Math.round(
                          (item.price * item?.discountPercentage) / 100
                        ) *
                          23000
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row ">
              <button
                onClick={() => handleUpdateMinusQuantity(item)}
                className="plus-minus-quantity my-2 mx-2 bg-white p-1 rounded-md"
              >
                <AiOutlineMinus />
              </button>
              <div className="quantity-products">{item?.quantity}</div>
              <button
                onClick={() => handleUpdatePlusQuantity(item)}
                className="plus-minus-quantity my-2 mx-2 bg-white p-1 rounded-md"
                disabled={item?.quantity > item?.stock ? true : false}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <div class="total-price">
              <span class="unit-total-price">₫</span>
              <span class="num-total-price">
                {formatNumber(
                  (item.price * 23000 -
                    Math.round((item.price * item?.discountPercentage) / 100) *
                      23000) *
                    item?.quantity
                )}
              </span>
            </div>
            <button
              className="btn-remove-product my-2 mx-2"
              onClick={() => showDeleteModal(item.id)}
            >
              <AiOutlineDelete size={15} />
            </button>
            <Modal
              title="Delete Confirmation"
              open={open}
              onOk={() => handleDeleteProducts(productToDelete)}
              onCancel={hideModal}
              okText="Ok"
              cancelText="Cancel"
            >
              <div className="modal-delete">
                <QuestionCircleTwoTone className="modal-delete__icon" />
                <p className="modal-delete__msg">
                  Do you want to delete this order?
                </p>
              </div>
            </Modal>
          </div>
        )
      })}

      <div className={`cartNav bottom-0 w-full px-6 py-2 font-semibold`}>
        <div className="flex ">
          <div className="flex flex-col">
            <h3 className="my-2 text-sm">Order summary</h3>
            <h1 className="my-2 text-xl  font-semibold">Total</h1>
          </div>

          <div className="flex flex-col ml-auto">
            <h3 className="my-2">({totalUniqueItems} products)</h3>
            <h1 className="my-2">₫{formatNumber(totalAllProduct)}</h1>
          </div>
        </div>
        <div className="flex mx-5 my-5">
          <Link to="/checkoutform" className="w-full">
            <button
              className="bg-orange-400 p-2 w-full rounded-2xl text-white mx-auto hover:scale-95"
              onClick={() => handleCheckout(items)}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
