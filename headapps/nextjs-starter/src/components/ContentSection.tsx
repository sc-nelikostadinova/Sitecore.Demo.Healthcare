'use client';

import {
  Text as JssText,
  RichText as JssRichText,
  withDatasourceCheck,
  ComponentRendering,
  ComponentParams,
  RichTextField,
  Field,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { isEnabled } from 'src/helpers/isEnabled';
import BlobAccent from './shapes/BlobAccent';
import CurvedClip from './shapes/CurvedClip';

interface Fields {
  Heading: Field<string>;
  Description: RichTextField;
}

type ContentSectionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DefaultContentSection = ({ fields, params, rendering }: ContentSectionProps): JSX.Element => {
  const id = params?.RenderingIdentifier;

  return (
    <section
      className={`relative py-16 bg-background-secondary dark:bg-background-secondary-dark space-y-8 ${params?.styles}`}
      id={id || undefined}
    >
      {isEnabled(params.CurvedTop) && <CurvedClip pos="top" />}
      {isEnabled(params.CurvedBottom) && <CurvedClip pos="bottom" />}
      {isEnabled(params.BlobAccent) && (
        <BlobAccent size="lg" className="absolute top-0 right-0 lg:right-4 z-0" />
      )}
      <div className="relative container z-10">
        <div className="max-w-4xl">
          <h2>
            <JssText field={fields.Heading} />
          </h2>
          <JssRichText className="text-lg" field={fields.Description} />
        </div>
      </div>
      <Placeholder
        name={`content-section-content-${params?.DynamicPlaceholderId}`}
        rendering={rendering}
      />
    </section>
  );
};

export const Default = withDatasourceCheck()<ContentSectionProps>(DefaultContentSection);
