'use client';

import React from 'react';
import {
  NextImage as JssImage,
  ImageField,
  Field,
  LinkField,
  RichTextField,
  ComponentRendering,
  ComponentParams,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import BlobAccent from './shapes/BlobAccent';
import HeroClip from './shapes/HeroClip';
import { useI18n } from 'next-localization';

interface Fields {
  HeroImage: ImageField;
  PromoTitle: Field<string>;
  PromoText: RichTextField;
  PromoLink: LinkField;
}

type HeroBannerProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const DefaultHeroBanner = (props: HeroBannerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { t } = useI18n();

  return (
    <section className={`relative pb-12 ${props?.params?.styles}`} id={id || undefined}>
      <div className="relative">
        <div className="absolute inset-0 mask-[var(--background-image-hero-clip)] mask-cover z-0">
          <JssImage field={props.fields.HeroImage} className="w-full h-full object-cover" />
        </div>
        <HeroClip />
        <BlobAccent className="absolute bottom-14 left-0 lg:left-4 z-1" />
        <div className="relative container min-h-[80vh] flex flex-col pointer-events-none z-10">
          <div className="flex justify-end items-end mt-auto">
            <div className="relative basis-full lg:basis-1/2 flex justify-center items-end pt-14 pointer-events-auto">
              <BlobAccent
                size="full"
                fill="solid"
                colorScheme="secondary"
                mirrored
                className="relative z-1"
              />
              <BlobAccent
                size="lg"
                className="absolute top-0 left-1/2 -translate-x-1/2 !max-w-3/5 z-2"
              />
              <BlobAccent
                shape="circle"
                size="sm"
                fill="solid"
                colorScheme="tertiary"
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-2"
              />
              <BlobAccent
                shape="circle"
                size="sm"
                className="absolute top-4 right-4 lg:right-16 z-0"
              />
              <div className="absolute w-3/4 sm:w-2/3 xl:w-1/2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-3">
                <form action="" className="flex flex-col gap-4 mt-12 md:ml-12">
                  <input
                    type="text"
                    name="your-name"
                    id="your-name"
                    placeholder={t('your_name') || 'Your Name'}
                    className="form-input"
                  />
                  <input
                    type="email"
                    name="your-email"
                    id="your-email"
                    placeholder={t('your_email') || 'Your Email'}
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="select-doctor"
                    id="select-doctor"
                    placeholder={t('select_doctor') || 'Select a Doctor'}
                    className="form-input"
                  />
                  <input
                    type="text"
                    name="select-date"
                    id="select-date"
                    placeholder={t('select_date') || 'Select a Date'}
                    className="form-input"
                  />

                  <input
                    type="submit"
                    value={t('make_appointment') || 'Make an appointment'}
                    className="btn self-center"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<HeroBannerProps>(DefaultHeroBanner);
