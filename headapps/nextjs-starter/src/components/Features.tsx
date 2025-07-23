'use client';

import { IGQLImageField, IGQLRichTextField, IGQLTextField } from 'src/types/igql';
import {
  Text as JssText,
  RichText as JssRichText,
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
        results: FeatureFields[];
      };
      heading: IGQLTextField;
      body: IGQLRichTextField;
    };
  };
}

interface FeatureFields {
  id: string;
  featureHeading: IGQLTextField;
  featureDescription: IGQLTextField;
  featureIcon: IGQLImageField;
  featureIconDark: IGQLImageField;
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureItem = ({
  feature,
  useAccentColor,
  layout = 'vertical',
}: {
  feature: FeatureFields;
  useAccentColor: boolean;
  layout: 'vertical' | 'horizontal';
}) => {
  const borderStyles = `border-2 rounded-lg ${
    useAccentColor ? 'border-accent' : 'border-foreground dark:border-foreground-dark'
  }`;

  return (
    <li
      key={feature?.id}
      className={`flex flex-col gap-6 ${
        layout === 'horizontal' ? 'lg:flex-row lg:items-center' : ''
      }`}
    >
      <div
        className={`flex justify-center items-center shrink-0 w-20 h-20 lg:w-26 lg:h-26 p-3 ${borderStyles}`}
      >
        <JssImage
          field={feature?.featureIcon?.jsonValue}
          className={`w-full h-full object-contain ${!useAccentColor ? 'dark:hidden' : ''}`}
        />
        {!useAccentColor && (
          <JssImage
            field={feature?.featureIconDark?.jsonValue}
            className="w-full h-full object-contain hidden dark:block"
          />
        )}
      </div>
      <div>
        <h5>
          <JssText field={feature?.featureHeading?.jsonValue} />
        </h5>
        <p className="text-lg">
          <JssText field={feature?.featureDescription?.jsonValue} />
        </p>
      </div>
    </li>
  );
};

const DefaultFeatures = ({ fields, params }: FeaturesProps): JSX.Element => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;

  return (
    <section className={`relative py-16 ${params?.styles}`} id={id || undefined}>
      {isEnabled(params.BlobAccent) && <BlobAccent className="absolute top-16 right-4 z-0" />}
      <div className="relative container z-10">
        <div className="max-w-4xl">
          <h2>
            <JssText field={fields?.data?.datasource?.heading?.jsonValue} />
          </h2>
          <JssRichText className="text-lg" field={fields?.data?.datasource?.body?.jsonValue} />
        </div>
        <ul className="grid lg:grid-cols-3 gap-12 mt-16">
          {features?.map((feature) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              useAccentColor={isEnabled(params.useAccentColor)}
              layout="vertical"
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

const SimpleFeatures = ({ fields, params }: FeaturesProps): JSX.Element => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;

  return (
    <div className={`relative ${params?.styles}`} id={id || undefined}>
      <ul className="grid gap-6">
        {features?.map((feature) => (
          <FeatureItem
            key={feature.id}
            feature={feature}
            useAccentColor={isEnabled(params.useAccentColor)}
            layout="horizontal"
          />
        ))}
      </ul>
    </div>
  );
};

export const Default = withDatasourceCheck()<FeaturesProps>(DefaultFeatures);
export const Simple = withDatasourceCheck()<FeaturesProps>(SimpleFeatures);
