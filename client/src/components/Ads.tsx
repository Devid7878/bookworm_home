// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img2 from './../static/imgs/book-image-2.jpg';
import img3 from './../static/imgs/book-image-3.jpg';

export default function Ads() {
  return (
    <div className="mx-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* <img src={image} alt="" className="w-full" /> */}
        <SwiperSlide className="mb-10 py-4 overflow-hidden rounded-xs bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
          <img src={img2} alt="book-ad-2" />
        </SwiperSlide>
        {/* <img src={image} alt="" className="w-full" /> */}
        <SwiperSlide className="mb-10 py-4 overflow-hidden rounded-xs bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
          <img src={img3} alt="book-ad-3" />
        </SwiperSlide>
        {/* <img src={image} alt="" className="w-full" /> */}
      </Swiper>
    </div>
  );
}
