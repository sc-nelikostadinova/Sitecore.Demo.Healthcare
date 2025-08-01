import React, { useState } from 'react';
import {
  Link,
  LinkField,
  Text,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Fields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children: Array<Fields>;
  Styles: string[];
}

type NavigationProps = {
  params?: { [key: string]: string };
  fields: Fields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  relativeLevel: number;
};

const getNavigationText = function (props: NavigationProps): JSX.Element | string {
  let text;

  if (props.fields.NavigationTitle) {
    text = <Text field={props.fields.NavigationTitle} />;
  } else if (props.fields.Title) {
    text = <Text field={props.fields.Title} />;
  } else {
    text = props.fields.DisplayName;
  }

  return text;
};

const getLinkField = (props: NavigationProps): LinkField => ({
  value: {
    href: props.fields.Href,
    title: getLinkTitle(props),
    querystring: props.fields.Querystring,
  },
});

export const Default = (props: NavigationProps): JSX.Element => {
  const [isOpenMenu, openMenu] = useState(false);
  const { sitecoreContext } = useSitecoreContext();
  const styles =
    props.params != null
      ? `${props.params.GridParameters ?? ''} ${props?.params?.Styles ?? ''}`.trimEnd()
      : '';
  const id = props.params != null ? props.params.RenderingIdentifier : null;

  if (!Object.values(props.fields).length) {
    return (
      <div className={`component navigation ${styles}`} id={id ? id : undefined}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (event?: React.MouseEvent<HTMLElement>, flag?: boolean): void => {
    if (event && sitecoreContext?.pageEditing) {
      event.preventDefault();
    }

    if (flag !== undefined) {
      return openMenu(flag);
    }

    openMenu(!isOpenMenu);
  };

  const list = Object.values(props.fields)
    .filter((element) => element)
    .map((element: Fields, key: number) => (
      <NavigationList
        key={`${key}${element.Id}`}
        fields={element}
        handleClick={(event: React.MouseEvent<HTMLElement>) => handleToggleMenu(event, false)}
        relativeLevel={1}
      />
    ));

  return (
    <div className={`component navigation text-lg font-heading ${styles}`} id={id ? id : undefined}>
      <div
        className="lg:hidden flex justify-center items-center w-6 h-6 cursor-pointer z-50"
        onClick={() => handleToggleMenu()}
      >
        <FontAwesomeIcon icon={isOpenMenu ? faTimes : faBars} width={16} height={16} />
      </div>

      <div className="component-content">
        <nav
          className={`${
            isOpenMenu ? 'flex' : 'hidden'
          } absolute top-full left-0 right-0 bg-background dark:bg-background-dark
          lg:static lg:flex z-100`}
        >
          <ul className={`container flex flex-col lg:flex-row gap-x-8 xl:gap-x-14 pb-8 lg:pb-0`}>
            {list}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const NavigationList = (props: NavigationProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const [active, setActive] = useState(false);
  const classNameList = `${props?.fields?.Styles.concat('rel-level' + props.relativeLevel).join(
    ' '
  )}`;

  const isRootItem = props.fields.Styles.includes('level0');

  let children: JSX.Element[] = [];
  if (props.fields.Children && props.fields.Children.length) {
    children = props.fields.Children.map((element: Fields, index: number) => (
      <NavigationList
        key={`${index}${element.Id}`}
        fields={element}
        handleClick={props.handleClick}
        relativeLevel={props.relativeLevel + 1}
      />
    ));
  }

  return (
    <li
      className={`${classNameList}
        relative flex flex-col ${isRootItem ? 'lg:flex-row' : ''}
        gap-x-8 xl:gap-x-14 gap-y-4 ${active ? 'active' : ''} uppercase
      `}
      key={props.fields.Id}
      tabIndex={0}
    >
      <div className="flex items-center gap-1">
        <Link
          field={getLinkField(props)}
          editable={sitecoreContext.pageEditing}
          onClick={props.handleClick}
          className="whitespace-nowrap"
        >
          {getNavigationText(props)}
        </Link>
        {children.length > 0 && !isRootItem ? (
          <div
            className="w-6 h-6 flex justify-center items-center"
            onClick={() => setActive((a) => !a)}
          >
            <FontAwesomeIcon
              icon={active ? faChevronUp : faChevronDown}
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {children.length > 0 ? (
        <ul
          className={`flex flex-col gap-x-8 xl:gap-x-14 gap-y-4 ${
            isRootItem
              ? 'lg:flex-row'
              : `lg:absolute top-full -left-4 pl-4 lg:p-4 bg-background dark:bg-background-dark ${
                  active ? 'block' : 'hidden'
                } z-100`
          }`}
        >
          {children}
        </ul>
      ) : null}
    </li>
  );
};

const getLinkTitle = (props: NavigationProps): string | undefined => {
  let title;
  if (props.fields.NavigationTitle?.value) {
    title = props.fields.NavigationTitle.value.toString();
  } else if (props.fields.Title?.value) {
    title = props.fields.Title.value.toString();
  } else {
    title = props.fields.DisplayName;
  }

  return title;
};
