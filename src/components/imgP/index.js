import React, { useState } from "react";
import Slider from "react-slick";
import "./index.scss";

const Article = ({ data }) => {
  return (
    <figure className="snip1584">
      <img src={data} alt={"title"} />
    </figure>
  );
};

export const News = ({ data }) => {
  const [sliderSettings] = useState({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  const newsTemplate =
    data?.length > 0 ? (
      data?.map((item, index) => {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        );
      })
    ) : (
      <p>Please add some cards</p>
    );

  return (
    <div className="news">
      <Slider autoplay {...sliderSettings}>
        {newsTemplate}
      </Slider>
    </div>
  );
};
