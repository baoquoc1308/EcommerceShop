import React from 'react'
import { useCart } from 'react-use-cart'
import { useState, useEffect } from 'react'
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from 'react-icons/ai'
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AvatarDropdown from '../Logout/index'
// import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { fetchApi } from '../../api/api'
import '../Navbar/index.scss'

function Navbar(props) {
  // Lấy đối tượng vị trí hiện tại chứa thông tin về URL hiện tại
  const location = useLocation()
  // const [products, setProducts] = useState([])
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false)

  // const handleResponseGetCategoryProducts = data => {
  //   setProducts(data)
  // }

  // const handleError = () => {
  //   toast.error('Something went wrong!', {
  //     position: 'top-right',
  //     autoClose: 1500,
  //   })
  // }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollToTopButton(true)
      } else {
        setShowScrollToTopButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Loại bỏ sự kiện cuộn khi component bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Sử dụng hiệu ứng trơn tru
    })
  }

  //destructuring pathname from location
  const { pathname } = location
  // Sử dụng phương thức split của Javascript để lấy tên đường dẫn trong mảng
  const splitLocation = pathname.split('/')
  const { totalUniqueItems } = useCart()
  // lấy accessToken từ bộ nhớ cục bộ.
  const token = localStorage.getItem('accessToken')
  const [Icon, setIcon] = useState(<AiOutlineMenu size={25} />)
  const [Margin, setMargin] = useState('-mt-40')
  // const [searchInput, setSearchInput] = useState('')
  // chuyển đổi trạng thái Margin và Icon.
  const responsiveMenu = () => {
    if (Margin === '-mt-40') {
      setMargin('mt-0')
      setIcon(<AiOutlineClose size={25} />)
    } else {
      setMargin('-mt-40')
      setIcon(<AiOutlineMenu size={25} />)
    }
  }

  // const handleInputChange = event => {
  //   // Cập nhật giá trị của ô input và gọi API để lấy sản phẩm dựa trên từ khóa tìm kiếm
  //   setSearchInput(event.target.value)
  //   fetchApi(
  //     'GET',
  //     'https://dummyjson.com',
  //     `products/search?q=${event.target.value}`,
  //     handleResponseGetCategoryProducts,
  //     handleError
  //   )
  // }

  return (
    <nav className="flex flex-col fixed  top-0  min-w-full shadow-md z-50">
      <ul className={`flex flex-row p-2.5 z-30 bg-gray-200`}>
        <label htmlFor="" className="mx-3 cursor-pointer">
          <img src={logo} alt="" className="w-10 h-9" onClick={scrollToTop} />
        </label>

        <ul className="hidden  sm:flex ml-8 mt-1 text-lg">
          <NavLink to="/" className="mx-6">
            <li
              className={`hover:border-b-2 border-cyan-600 ${
                splitLocation[1] === '' ? 'border-b-2' : ''
              }`}
            >
              Home{' '}
            </li>
          </NavLink>
          <NavLink to="/collection" className="mx-6">
            <li
              className={`hover:border-b-2 border-cyan-600 active:border-b-2 ${
                splitLocation[1] === 'collection' ? 'border-b-2' : ''
              } `}
            >
              Collection{' '}
            </li>
          </NavLink>
          <NavLink to="/contact" className="mx-6">
            <li
              className={`hover:border-b-2 border-cyan-600 ${
                splitLocation[1] === 'contact' ? 'border-b-2' : ''
              }`}
            >
              Contact{' '}
            </li>
          </NavLink>

          <NavLink to="/checkout" className="mx-6">
            <li
              className={`hover:border-b-2 border-cyan-600 ${
                splitLocation[1] === 'order' ? 'border-b-2' : ''
              }`}
            >
              Order{' '}
            </li>
          </NavLink>
        </ul>

        <li className="ml-auto mx-6 mt-2 relative cursor-pointer">
          <NavLink to="/cart">
            <AiOutlineShoppingCart size={25} />
            <span className="absolute -top-2 ml-5 z-10 bg-orange-300 rounded-full px-1">
              {token !== null ? totalUniqueItems : 0}
            </span>
          </NavLink>
        </li>

        <li
          className="mx-2 mt-2 cursor-pointer"
          onClick={props.toggleMode}
        ></li>
        <li
          className="mx-2 cursor-pointer sm:hidden mt-2"
          onClick={responsiveMenu}
        >
          {Icon}
        </li>
        {!token ? (
          <NavLink to="/login" className="mx-6">
            <li
              className={`hover:border-b-2 border-cyan-600 active:border-b-2 text-lg mt-1${
                splitLocation[1] === 'login' ? 'border-b-2' : ''
              } `}
            >
              Login{' '}
            </li>
          </NavLink>
        ) : (
          <>
            <li
              className={`hover:border-b-2 border-cyan-600 active:border-b-2 ${
                splitLocation[1] === 'login' ? 'border-b-2' : ''
              } `}
            >
              <AvatarDropdown />
            </li>
          </>
        )}
      </ul>

      <ul
        className={`flex flex-col ml-auto space-y-3 bg-slate-100 transition-all w-full p-2.5 z-10 ${Margin} duration-500 sm:hidden text-lg `}
      >
        <NavLink to="/" className="ml-auto font-semibold text-xl">
          <li onClick={responsiveMenu}>Home </li>
        </NavLink>
        <NavLink to="/collection" className="ml-auto font-semibold text-xl">
          <li onClick={responsiveMenu}>Collection </li>
        </NavLink>
        <NavLink to="/contact" className="ml-auto font-semibold text-xl">
          <li onClick={responsiveMenu}>Contact </li>
        </NavLink>
        <NavLink to="/order" className="ml-auto font-semibold text-xl">
          <li onClick={responsiveMenu}>Order </li>
        </NavLink>
        <NavLink to="/login" className="ml-auto font-semibold text-xl">
          <li onClick={responsiveMenu}>Login </li>
        </NavLink>
      </ul>
      {showScrollToTopButton && (
        <div className={`scroll-to-top-button`} onClick={scrollToTop}></div>
      )}
    </nav>
  )
}

export default Navbar
