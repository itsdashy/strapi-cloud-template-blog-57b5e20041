import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsBathrooms extends Schema.Component {
  collectionName: 'components_property_bathrooms';
  info: {
    icon: 'bath';
    displayName: 'Bathrooms';
  };
  attributes: {
    bathrooms: Attribute.Integer;
  };
}

export interface ComponentsBedrooms extends Schema.Component {
  collectionName: 'components_property_bedrooms';
  info: {
    icon: 'bed';
    displayName: 'Bedrooms';
  };
  attributes: {
    bedrooms: Attribute.Integer;
  };
}

export interface ComponentsButton extends Schema.Component {
  collectionName: 'components_components_buttons';
  info: {
    icon: 'stop';
    displayName: 'Button';
  };
  attributes: {
    buttontitle: Attribute.String;
    buttonhref: Attribute.String;
  };
}

export interface ComponentsButtonitems extends Schema.Component {
  collectionName: 'components_components_buttonitems';
  info: {
    icon: 'audio-description';
    description: '';
    displayName: 'Buttons';
  };
  attributes: {
    buttonitems: Attribute.Component<'components.button', true>;
    buttonhr: Attribute.Boolean;
  };
}

export interface ComponentsCarousel extends Schema.Component {
  collectionName: 'components_components_carousels';
  info: {
    icon: 'clone';
    description: '';
    displayName: 'Carousel';
  };
  attributes: {
    title: Attribute.String;
    textimage: Attribute.Component<'components.textimage', true>;
  };
}

export interface ComponentsDescription extends Schema.Component {
  collectionName: 'components_property_descriptions';
  info: {
    icon: 'align-justify';
    displayName: 'Description';
  };
  attributes: {
    description: Attribute.RichText;
  };
}

export interface ComponentsFloorhouse extends Schema.Component {
  collectionName: 'components_components_floorhouses';
  info: {
    icon: 'layer-group';
    description: '';
    displayName: 'floor info';
  };
  attributes: {
    floorimage: Attribute.Media<'images' | 'files' | 'videos'>;
    floor: Attribute.Relation<
      'components.floorhouse',
      'oneToOne',
      'api::floor.floor'
    >;
    floormeasurements: Attribute.Component<'components.floormeasurement', true>;
  };
}

export interface ComponentsFloormeasurement extends Schema.Component {
  collectionName: 'components_components_floormeasurements';
  info: {
    icon: 'ruler';
    description: '';
    displayName: 'floor measurement';
  };
  attributes: {
    title: Attribute.String;
    mm: Attribute.String;
    inches: Attribute.String;
  };
}

export interface ComponentsGarages extends Schema.Component {
  collectionName: 'components_components_garages';
  info: {
    icon: 'car';
    description: '';
    displayName: 'Garages';
  };
  attributes: {
    garages: Attribute.Integer;
  };
}

export interface ComponentsHeroitem extends Schema.Component {
  collectionName: 'components_components_heroitems';
  info: {
    icon: 'square';
    description: '';
    displayName: 'hero item';
  };
  attributes: {
    textcolor: Attribute.Enumeration<['white', 'blue']>;
    backgroundimage: Attribute.Media<'images' | 'files' | 'videos'>;
    textimage: Attribute.Media<'images' | 'files' | 'videos'>;
    heroitemtype: Attribute.Enumeration<['image', 'promo', 'video']>;
    promo_page: Attribute.Relation<
      'components.heroitem',
      'oneToOne',
      'api::promo-page.promo-page'
    >;
    video: Attribute.Component<'components.videoitem'>;
    herotext: Attribute.RichText;
    live: Attribute.Boolean;
  };
}

export interface ComponentsIconListItem extends Schema.Component {
  collectionName: 'components_components_icon_list_items';
  info: {
    icon: 'list-alt';
    description: '';
    displayName: 'Icon list item';
  };
  attributes: {
    icon: Attribute.Media<'images' | 'files' | 'videos'>;
    name: Attribute.String;
    value: Attribute.String;
  };
}

export interface ComponentsIconList extends Schema.Component {
  collectionName: 'components_components_icon_lists';
  info: {
    icon: 'list';
    description: '';
    displayName: 'Icon list';
  };
  attributes: {
    iconlistitems: Attribute.Component<'components.icon-list-item', true>;
    iconsshowleft: Attribute.Boolean;
    showsidebyside: Attribute.Boolean;
    iconlisthr: Attribute.Boolean;
  };
}

export interface ComponentsImageonly extends Schema.Component {
  collectionName: 'components_components_imageonlies';
  info: {
    icon: 'image';
    description: '';
    displayName: 'Image';
  };
  attributes: {
    imageonly: Attribute.Media<'images' | 'files' | 'videos'>;
    imageonlyhr: Attribute.Boolean;
  };
}

export interface ComponentsImages extends Schema.Component {
  collectionName: 'components_components_images';
  info: {
    icon: 'images';
    description: '';
    displayName: 'Images';
  };
  attributes: {
    images: Attribute.Media<'images', true>;
    imageshr: Attribute.Boolean;
    imagescarousel: Attribute.Boolean;
  };
}

export interface ComponentsInsertid extends Schema.Component {
  collectionName: 'components_components_insertids';
  info: {
    icon: 'cube';
    description: '';
    displayName: 'Predefined module';
  };
  attributes: {
    insertid: Attribute.String;
  };
}

export interface ComponentsLinkItems extends Schema.Component {
  collectionName: 'components_components_link_items';
  info: {
    icon: 'link';
    description: '';
    displayName: 'Links';
  };
  attributes: {
    linkitems: Attribute.Component<'components.link', true>;
    linkhr: Attribute.Boolean;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    icon: 'globe-americas';
    description: '';
    displayName: 'Link';
  };
  attributes: {
    linktitle: Attribute.String;
    linkurl: Attribute.String;
    linknewwindow: Attribute.Boolean;
    is360video: Attribute.Boolean;
  };
}

export interface ComponentsName extends Schema.Component {
  collectionName: 'components_property_names';
  info: {
    icon: 'ad';
    displayName: 'Name';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface ComponentsQuoteCarousel extends Schema.Component {
  collectionName: 'components_components_quote_carousels';
  info: {
    displayName: 'Quote Carousel';
    icon: 'quote';
    description: '';
  };
  attributes: {
    quotes: Attribute.Component<'components.quote', true>;
    title: Attribute.String;
  };
}

export interface ComponentsQuote extends Schema.Component {
  collectionName: 'components_components_quotes';
  info: {
    icon: 'quote-right';
    description: '';
    displayName: 'Quote';
  };
  attributes: {
    quote: Attribute.Text;
    quoter: Attribute.String;
    quoterdescription: Attribute.String;
    quotehr: Attribute.Boolean;
    quoteimage: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface ComponentsShortDescription extends Schema.Component {
  collectionName: 'components_property_short_descriptions';
  info: {
    icon: 'align-center';
    description: '';
    displayName: 'Short Description';
  };
  attributes: {
    shortdescription: Attribute.RichText;
  };
}

export interface ComponentsShortdescription extends Schema.Component {
  collectionName: 'components_property_shortdescriptions';
  info: {
    icon: 'align-left';
    displayName: 'shortdescription';
  };
  attributes: {
    shortdescription: Attribute.Text;
  };
}

export interface ComponentsSpecificationicon extends Schema.Component {
  collectionName: 'components_components_specificationicons';
  info: {
    icon: 'list-ul';
    description: '';
    displayName: 'specification';
  };
  attributes: {
    specificationiconimage: Attribute.Media<'images'>;
    specificationiconname: Attribute.String;
  };
}

export interface ComponentsText extends Schema.Component {
  collectionName: 'components_components_texts';
  info: {
    icon: 'bars';
    description: '';
    displayName: 'Title / Text';
  };
  attributes: {
    textonlyhr: Attribute.Boolean;
    textonlytitle: Attribute.String;
    textonlytext: Attribute.RichText;
    textonlylargetitle: Attribute.Boolean;
  };
}

export interface ComponentsTextimage extends Schema.Component {
  collectionName: 'components_components_textimages';
  info: {
    icon: 'align-right';
    description: '';
    displayName: 'Text & image';
  };
  attributes: {
    image: Attribute.Media<'images'>;
    text: Attribute.RichText;
  };
}

export interface ComponentsTextimagehr extends Schema.Component {
  collectionName: 'components_components_textimagehrs';
  info: {
    icon: 'address-card';
    description: '';
    displayName: 'Image & Text';
  };
  attributes: {
    imagehr: Attribute.Media<'images' | 'files' | 'videos'>;
    texthr: Attribute.RichText;
    appendhr: Attribute.Boolean;
    titlehr: Attribute.String;
  };
}

export interface ComponentsVideoitem extends Schema.Component {
  collectionName: 'components_components_videoitems';
  info: {
    icon: 'file-video';
    description: '';
    displayName: 'video item';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.RichText;
    file: Attribute.Media<'videos'>;
  };
}

export interface ComponentsVideos extends Schema.Component {
  collectionName: 'components_components_videos';
  info: {
    icon: 'video';
    description: '';
    displayName: 'Videos';
  };
  attributes: {
    videos: Attribute.Media<'videos', true>;
    videoshr: Attribute.Boolean;
  };
}

export interface SharedEvent extends Schema.Component {
  collectionName: 'components_shared_events';
  info: {
    icon: 'calendar-day';
    description: '';
    displayName: 'event';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.RichText;
    show: Attribute.Boolean;
    hideenquire: Attribute.Boolean;
    titlesection: Attribute.String;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    icon: 'globe';
    description: '';
    displayName: 'seo';
  };
  attributes: {
    metatitle: Attribute.String;
    metadescription: Attribute.Text;
    metakeys: Attribute.Text;
  };
}

export interface SharedTermsAndConditions extends Schema.Component {
  collectionName: 'components_shared_terms_and_conditions';
  info: {
    displayName: 'Terms and conditions';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.RichText;
    show: Attribute.Boolean;
    titlesection: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.bathrooms': ComponentsBathrooms;
      'components.bedrooms': ComponentsBedrooms;
      'components.button': ComponentsButton;
      'components.buttonitems': ComponentsButtonitems;
      'components.carousel': ComponentsCarousel;
      'components.description': ComponentsDescription;
      'components.floorhouse': ComponentsFloorhouse;
      'components.floormeasurement': ComponentsFloormeasurement;
      'components.garages': ComponentsGarages;
      'components.heroitem': ComponentsHeroitem;
      'components.icon-list-item': ComponentsIconListItem;
      'components.icon-list': ComponentsIconList;
      'components.imageonly': ComponentsImageonly;
      'components.images': ComponentsImages;
      'components.insertid': ComponentsInsertid;
      'components.link-items': ComponentsLinkItems;
      'components.link': ComponentsLink;
      'components.name': ComponentsName;
      'components.quote-carousel': ComponentsQuoteCarousel;
      'components.quote': ComponentsQuote;
      'components.short-description': ComponentsShortDescription;
      'components.shortdescription': ComponentsShortdescription;
      'components.specificationicon': ComponentsSpecificationicon;
      'components.text': ComponentsText;
      'components.textimage': ComponentsTextimage;
      'components.textimagehr': ComponentsTextimagehr;
      'components.videoitem': ComponentsVideoitem;
      'components.videos': ComponentsVideos;
      'shared.event': SharedEvent;
      'shared.seo': SharedSeo;
      'shared.terms-and-conditions': SharedTermsAndConditions;
    }
  }
}
