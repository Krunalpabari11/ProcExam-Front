"use client"
import React from 'react';
import Slider from "react-slick";

// Types
interface TestimonialData {
  profession: string;
  name: string;
  imgSrc: string;
  starimg: string;
  detail: string;
}

const testimonials: TestimonialData[] = [
  {
    profession: 'UX/UI Designer',
    name: 'Andrew Williams',
    imgSrc: '/assets/students/user-1.jpg',
    starimg: '/assets/students/stars.png',
    detail: "I have been a Junior Graphic Designer for more then 10 years. Some things are problem that I had and teach how to solve them. That's why this course is so great!"
  },
  {
    profession: 'UX/UI Designer',
    name: 'Cristian Doru Barin',
    imgSrc: '/assets/students/user-2.jpg',
    starimg: '/assets/students/stars.png',
    detail: "I have been a Junior Graphic Designer for more then 10 years. Some things are problem that I had and teach how to solve them. That's why this course is so great!"
  },
  {
    profession: 'UX/UI Designer',
    name: 'Tanzeel Ur Rehman',
    imgSrc: '/assets/students/user-3.jpg',
    starimg: '/assets/students/stars.png',
    detail: "I have been a Junior Graphic Designer for more then 10 years. Some things are problem that I had and teach how to solve them. That's why this course is so great!"
  },
  {
    profession: 'UX/UI Designer',
    name: 'Andrew Williams',
    imgSrc: '/assets/students/user-1.jpg',
    starimg: '/assets/students/stars.png',
    detail: "I have been a Junior Graphic Designer for more then 10 years. Some things are problem that I had and teach how to solve them. That's why this course is so great!"
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div id="testimonial-section" className="bg-pink-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-64 sm:pt-32 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center pb-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">
            What Our Happy <br /> Students Says
          </h2>
          <button className="bg-transparent hover:bg-purple-600 text-purple-600 font-semibold hover:text-white py-3 px-4 border border-gray-200 hover:border-transparent rounded transition-colors duration-300">
            Give Your Review
          </button>
        </div>

        <p className="text-lg font-medium pb-12">
          Build skills with our courses and mentor from world-class companies.
        </p>

        <div className="testimonial-slider bg-gray-700">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (

              <div key={index}>
                <div className="mx-4">
                  <div className="bg-purple-700   shadow-lg rounded-lg p-8 text-center">
                    <div className="relative inline-block">
                      <img 
                        src={testimonial.imgSrc} 
                        alt={`${testimonial.name}'s profile`}
                        className="h-16 w-16 rounded-full ring-2 ring-white mx-auto object-cover"
                      />
                      <img 
                        src="/assets/students/greenpic.svg" 
                        alt="status indicator" 
                        className="absolute bottom-0 right-0 h-6 w-6"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-4">{testimonial.profession}</p>
                    <h4 className="text-2xl font-semibold text-gray-900 mt-2">{testimonial.name}</h4>
                    <img 
                      src={testimonial.starimg} 
                      alt="Rating" 
                      className="mx-auto my-4 h-6"
                    />
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {testimonial.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;