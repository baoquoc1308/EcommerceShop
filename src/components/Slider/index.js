import React, { useState, useEffect } from 'react'
import '../Slider/index.scss'
import Slidercomponent from './SliderComponent'
import image1 from '../images/1.jpg'
import image2 from '../images/2.jpg'
import image3 from '../images/4.jpg'

export const Circle = props => {
  return (
    <span
      className={
        // Nếu điều kiện này đúng, lớp CSS 'slider-circle active-dot' được thêm vào; nếu không, chỉ có 'slider-circle'.
        props.id === props.active ? 'slider-circle active-dot' : 'slider-circle'
      }
    ></span>
  )
}

const Slider = () => {
  // State để lưu giữ index của slide hiện tại.
  const [slider, setslider] = useState(1)
  const data = [1, 2, 3]
  const images = [image1, image2, image3]

  const nextSlide = () => {
    // Nếu slide hiện tại là slide cuối cùng, đặt giá trị của slider về 1 để quay lại slide đầu tiên.
    if (slider > data.length - 1) {
      setslider(1)
      // Ngược lại, tăng giá trị của slider lên 1 để chuyển sang slide tiếp theo.
    } else {
      setslider(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    // Nếu slide hiện tại là slide đầu tiên, đặt giá trị của slider về slide cuối cùng.
    if (slider <= 1) {
      setslider(data.length)
      // Ngược lại, giảm giá trị của slider xuống 1 để chuyển đến slide trước đó.
    } else {
      setslider(prev => prev - 1)
    }
  }

  const slide = () => {
    // Nếu slide hiện tại là slide cuối cùng, đặt giá trị của slider về 1 để quay lại slide đầu tiên.
    if (slider > data.length - 1) {
      setslider(1)
      // Ngược lại, tăng giá trị của slider lên 1 để chuyển sang slide tiếp theo.
    } else {
      setslider(prev => prev + 1)
    }
  }

  useEffect(() => {
    // Sử dụng useEffect để tự động chuyển đổi slide sau một khoảng thời gian.
    const interval = setInterval(slide, 4000)

    return () => {
      // trong khi component unmount, xóa interval để tránh memory leaks.
      clearInterval(interval)
    }
    // chạy lại mỗi khi giá trị của slider thay đổi.
  }, [slider])

  return (
    // Dùng hàm map để tạo các slide dựa trên dữ liệu trong mảng data.
    <div className="home-container">
      {data.map((el, i) => (
        // Mỗi slide là một instance của component Slidercomponent.
        <Slidercomponent
          // className được thiết lập để thêm các lớp CSS như slide-1, slide-2,... dựa trên index.
          className={`slide-${i + 1} slide`}
          key={i}
          // style được sử dụng để điều chỉnh vị trí của slide dựa trên giá trị của slider. Mỗi slide sẽ được dịch chuyển theo chiều ngang (translateX) với khoảng cách là 100% của chiều rộng của slide.
          style={{ transform: `translateX(${100 * (i + 1 - slider)}%)` }}
          image={images[i]}
        />
      ))}
      <div className="slider-dots">
        {data.map((el, i) => (
          // Dùng hàm map để tạo các điểm chấm (Circle) dựa trên dữ liệu trong mảng data.
          // Mỗi điểm chấm là một instance của component Circle.
          // key được thiết lập để đảm bảo tính duy nhất khi render.
          <Circle key={i} active={slider} id={i + 1} />
        ))}
      </div>
      <div className="slider-btn">
        <div className="left-btn">
          <button onClick={prevSlide}>{'←'}</button>
        </div>
        <div className="right-btn">
          <button onClick={nextSlide}>{'→'}</button>
        </div>
      </div>
    </div>
  )
}

export default Slider
