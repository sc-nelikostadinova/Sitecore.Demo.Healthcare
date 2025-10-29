// Below are built-in components that are available in the app, it's recommended to keep them as is
import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';
// end of built-in components

// Components imported from the app itself
import * as Title from 'src/components/Title';
import * as ThemeSwitcher from 'src/components/ThemeSwitcher';
import * as Testimonials from 'src/components/Testimonials';
import * as SitecoreStyles from 'src/components/SitecoreStyles';
import * as RowSplitter from 'src/components/RowSplitter';
import * as RichText from 'src/components/RichText';
import * as Promo from 'src/components/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/PageContent';
import * as Navigation from 'src/components/Navigation';
import * as LinkList from 'src/components/LinkList';
import * as Image from 'src/components/Image';
import * as HeroBanner from 'src/components/HeroBanner';
import * as Header from 'src/components/Header';
import * as Footer from 'src/components/Footer';
import * as Features from 'src/components/Features';
import * as FEAASScripts from 'src/components/FEAASScripts';
import * as DoctorsListing from 'src/components/DoctorsListing';
import * as DoctorDetails from 'src/components/DoctorDetails';
import * as ContentSection from 'src/components/ContentSection';
import * as ContentBlock from 'src/components/ContentBlock';
import * as Container from 'src/components/Container';
import * as ColumnSplitter from 'src/components/ColumnSplitter';
import * as CdpPageView from 'src/components/CdpPageView';
import * as HeroClip from 'src/components/shapes/HeroClip';
import * as CurvedClip from 'src/components/shapes/CurvedClip';
import * as BlobAccent from 'src/components/shapes/BlobAccent';


// Components must be registered within the map to match the string key with component name in Sitecore
export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', Title],
  ['ThemeSwitcher', ThemeSwitcher],
  ['Testimonials', Testimonials],
  ['SitecoreStyles', SitecoreStyles],
  ['RowSplitter', RowSplitter],
  ['RichText', RichText],
  ['Promo', Promo],
  ['PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder],
  ['PageContent', PageContent],
  ['Navigation', Navigation],
  ['LinkList', LinkList],
  ['Image', Image],
  ['HeroBanner', HeroBanner],
  ['Header', Header],
  ['Footer', Footer],
  ['Features', Features],
  ['FEAASScripts', FEAASScripts],
  ['DoctorsListing', DoctorsListing],
  ['DoctorDetails', DoctorDetails],
  ['ContentSection', ContentSection],
  ['ContentBlock', ContentBlock],
  ['Container', Container],
  ['ColumnSplitter', ColumnSplitter],
  ['CdpPageView', CdpPageView],
  ['HeroClip', HeroClip],
  ['CurvedClip', CurvedClip],
  ['BlobAccent', BlobAccent],
]);

export default componentMap;
