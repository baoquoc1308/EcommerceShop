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
    // Tạo một interval để gọi hàm slide mỗi 4000 milliseconds (4 giây).
    const interval = setInterval(slide, 4000)

    return () => {
      // rong khi component unmount, xóa interval để tránh memory leaks.
      clearInterval(interval)
    }
    // chạy lại mỗi khi giá trị của slider thay đổi.
  }, [slider])

  return (
    <div className="home-container">
      {data.map((el, i) => (
        <Slidercomponent
          className={`slide-${i + 1} slide`}
          key={i}
          style={{ transform: `translateX(${100 * (i + 1 - slider)}%)` }}
          image={images[i]}
        />
      ))}
      <div className="slider-dots">
        {data.map((el, i) => (
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
