import React from 'react';
import Link from 'next/link';
import { Text as JssText, NextImage as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { Doctor } from './DoctorDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

type DoctorsListingProps = {
  params: { [key: string]: string };
  fields: {
    items: {
      id: string;
      url: string;
      fields: Doctor;
    }[];
  };
};

const DoctorCard = ({ url, fields }: { url: string; fields: Doctor }): JSX.Element | null => {
  return (
    <Link
      href={url}
      className="block rounded-lg bg-background-secondary dark:bg-background-secondary-dark shadow-soft overflow-hidden"
    >
      <div className="aspect-square placeholder-pattern-background">
        <JssImage field={fields.Photo} className="w-full h-full object-cover rounded-t-lg" />
      </div>
      <div className="p-7 text-center">
        <h5>
          <JssText field={fields.FullName} />
        </h5>
        <p className="text-lg lg:text-xl text-accent">
          <JssText field={fields.JobTitle} />
        </p>
      </div>
    </Link>
  );
};

export const Default = (props: DoctorsListingProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const doctors = props.fields.items.filter((item) => item.fields?.FullName);

  return (
    <section className={`relative py-16 ${props.params.styles}`} id={id || undefined}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-3">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} url={doc.url} fields={doc.fields} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Slider = (props: DoctorsListingProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const doctors = props.fields.items.filter((item) => item.fields?.FullName);

  return (
    <section
      className={`relative py-8 overflow-hidden ${props.params.styles}`}
      id={id || undefined}
    >
      <div className="relative container space-y-8">
        <div className="slider-btn-wrapper">
          <button className="slider-btn slider-btn-prev">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="slider-btn slider-btn-next">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={48}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          navigation={{
            prevEl: '.slider-btn-prev',
            nextEl: '.slider-btn-next',
          }}
          pagination={{
            clickable: true,
            el: '.slider-pagination-wrapper',
            type: 'bullets',
            bulletElement: 'button',
            bulletClass: 'slider-pagination-btn',
            bulletActiveClass: 'active',
          }}
          className="!overflow-visible"
        >
          {doctors.map((doc) => {
            return (
              <SwiperSlide key={doc.id}>
                <DoctorCard url={doc.url} fields={doc.fields} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="slider-pagination-wrapper"></div>
      </div>
    </section>
  );
};
