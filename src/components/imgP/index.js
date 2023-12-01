import React, { useState } from 'react'
import Slider from 'react-slick'
import './index.scss'

const Article = ({ data }) => {
  return (
    <figure className="snip1584">
      <img src={data} alt={'title'} />
    </figure>
  )
}

export const News = ({ data }) => {
  // lưu trữ cấu hình của trình chiếu tin tức
  const [sliderSettings] = useState({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  })
  // lưu trữ JSX, hiển thị danh sách tin tức
  const newsTemplate =
    data?.length > 0 ? (
      // sử dụng để lặp qua từng phần tử trong mảng. Mỗi phần tử được đại diện bởi biến item và index là chỉ số tương ứng của phần tử đó trong mảng.
      data?.map((item, index) => {
        return (
          // hiển thị mỗi mục tin tức trong một Article.
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    ) : (
      <p>Please add some cards</p>
    )

  return (
    <div className="news">
      <Slider autoplay {...sliderSettings}>
        {newsTemplate}
      </Slider>
    </div>
  )
}
