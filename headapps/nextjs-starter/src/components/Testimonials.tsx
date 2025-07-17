'use client';

import { IGQLImageField, IGQLTextField } from 'src/types/igql';
import {
  Text as JssText,
  NextImage as JssImage,
  withDatasourceCheck,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { isEnabled } from 'src/helpers/isEnabled';
import BlobAccent from './shapes/BlobAccent';

interface Fields {
  data: {
    datasource: {
      children: {
        results: TestimonialFields[];
      };
    };
  };
}

interface TestimonialFields {
  id: string;
  customerImage: IGQLImageField;
  customerName: IGQLTextField;
  customerQuote: IGQLTextField;
}

type TestimonialsProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DefaultTestimonials = ({ fields, params }: TestimonialsProps): JSX.Element => {
  const id = params?.RenderingIdentifier;
  const testimonials = fields?.data?.datasource?.children?.results;

  return (
    <section className={`relative py-16 ${params?.styles}`} id={id || undefined}>
      {isEnabled(params.BlobAccents) && (
        <>
          <BlobAccent size="lg" className="absolute top-0 left-0 lg:left-4 z-0" />
          <BlobAccent shape="circle" className="absolute bottom-0 right-0 lg:right-4 z-0" />
        </>
      )}
      <div className="relative container z-10">
        <div className="grid lg:grid-cols-3 gap-12 mt-16">
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col items-center">
              <div className="relative max-w-sm aspect-square rounded-lg overflow-hidden mx-4 lg:mx-10 z-2">
                <JssImage
                  className="w-full h-full object-cover"
                  field={testimonial.customerImage.jsonValue}
                />
              </div>
              <div className="relative flex flex-col gap-6 grow p-10 pt-20 -mt-10 rounded-lg bg-background-secondary dark:bg-background-secondary-dark shadow-soft z-1">
                <blockquote className="text-lg">
                  <JssText field={testimonial.customerQuote.jsonValue} />
                </blockquote>
                <p className="flex items-center gap-2 mt-auto">
                  <span className="w-7 h-0.5 rounded-full bg-accent"></span>
                  <span className="text-sm font-heading font-bold">
                    <JssText field={testimonial.customerName.jsonValue} />
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<TestimonialsProps>(DefaultTestimonials);
