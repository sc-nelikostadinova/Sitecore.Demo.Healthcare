import React from 'react';
import {
  NextImage as JssImage,
  Link as JssLink,
  ImageField,
  LinkField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Fields {
  LogoLight: ImageField;
  LogoDark: ImageField;
  PhoneLink: LinkField;
  MailLink: LinkField;
}

type HeaderProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <section className={`relative py-8 ${props.params.styles}`} id={id ? id : undefined}>
      <div className="container flex items-center gap-2 lg:gap-4">
        <div className="max-w-50 lg:max-w-full mr-auto">
          <Link href={'/'}>
            <JssImage
              field={props.fields.LogoLight}
              width={345}
              height={45}
              className="dark:hidden"
              priority
            />
            <JssImage
              field={props.fields.LogoDark}
              width={345}
              height={45}
              className="hidden dark:block"
              priority
            />
          </Link>
        </div>
        <div className="order-last lg:order-0 lg:mr-4 xl:mr-8">
          <Placeholder
            name={`header-nav-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="mx-2 lg:mx-0">
          <Placeholder
            name={`header-theme-switcher-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="flex items-center gap-2">
          <JssLink
            field={props.fields.MailLink}
            className="flex justify-center items-center w-6 h-6"
          >
            <FontAwesomeIcon icon={faEnvelope} width={16} height={16} />
          </JssLink>
          <JssLink
            field={props.fields.PhoneLink}
            className="flex justify-center items-center w-6 h-6"
          >
            <FontAwesomeIcon icon={faPhone} width={14} height={14} />
          </JssLink>
        </div>
      </div>
    </section>
  );
};
