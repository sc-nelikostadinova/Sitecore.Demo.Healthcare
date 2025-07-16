import React from 'react';
import {
  Text as JssText,
  NextImage as JssImage,
  Field,
  ImageField,
  RichTextField,
  RichText as JssRichText,
  withSitecoreContext,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface Doctor {
  FullName: Field<string>;
  JobTitle: Field<string>;
  Photo: ImageField;
  Bio: RichTextField;
}

type DoctorDetailsProps = {
  sitecoreContext: SitecoreContextValue;
  params: { [key: string]: string };
  fields: Doctor;
};

const DefaultDoctorDetails = (props: DoctorDetailsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <section className={`relative py-16 ${props.params.styles}`} id={id || undefined}>
      <div className="container grid gap-8 lg:grid-cols-3">
        <div className="relative aspect-square rounded-lg overflow-hidden placeholder-pattern-background shadow-soft">
          <JssImage field={props.fields?.Photo} className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-2 xl:p-8">
          <h1 className="mb-3">
            <JssText field={props.fields?.FullName} />
          </h1>
          <h5 className="mb-8 text-accent">
            <JssText field={props.fields?.JobTitle} />
          </h5>
          <div className="text-lg">
            <JssRichText field={props.fields?.Bio} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Default = withSitecoreContext()<DoctorDetailsProps>(DefaultDoctorDetails);
