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
import heroimg from './../static/imgs/hero-img.png';
import { Link } from 'react-router-dom';

export default function Ads() {
  return (
    <div className="mt-[2rem]">
      <div className="flex justify-between gap-4 items-center">
        <div className=" text-6xl font-sans font-black flex-1">
          <span className="block">The Best way for your Learning</span>
          <Link
            to="#"
            role="button"
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2  border rounded-full"
          >
            Create Event
          </Link>
        </div>

        <div className="h-[600px] flex-1 ">
          <img
            src={heroimg}
            alt="book-ad-3"
            className="h-full w-full object-contain scale-x-[-1]"
          />
        </div>
      </div>
    </div>
  );
}
// <div className="col-span-2 overflow-hidden">
//             <img
//               src={img3}
//               alt="book-ad-2"
//               className="object-cover h-full w-full"
//             />
//           </div>
//           <div className="...">
//             <img
//               src={img2}
//               alt="book-ad-2"
//               className="object-cover h-full w-full"
//             />
//           </div>
//           <div className="...">
//             <img
//               src={img2}
//               alt="book-ad-2"
//               className="object-cover h-full w-full"
//             />
//           </div>
{
  /* <Swiper
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
            className="mySwiper h-[600px]"
          >
            <img src={image} alt="" className="w-full" />
            <SwiperSlide className="mb-10  h-full overflow-hidden rounded-xs bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
              <img
                src={img2}
                alt="book-ad-2"
                className="object-cover h-full w-full"
              />
            </SwiperSlide>
            <img src={image} alt="" className="w-full" />
            <SwiperSlide className="mb-10  h-full overflow-hidden rounded-xs bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
              <img
                src={img3}
                alt="book-ad-3"
                className="object-cover h-full w-full"
              />
            </SwiperSlide>
            <img src={image} alt="" className="w-full" />
          </Swiper> */
}
