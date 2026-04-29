import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginGoogleMapsTonikConfig extends Schema.SingleType {
  collectionName: 'google_maps_tonik_configs';
  info: {
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'Google Maps Tonik Config';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    googleMapsKey: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::google-maps-tonik.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::google-maps-tonik.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginGoogleMapsConfig extends Schema.SingleType {
  collectionName: 'google_maps_configs';
  info: {
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'Google Maps Config';
  };
  options: {
    populateCreatorFields: false;
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    googleMapsKey: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::google-maps.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::google-maps.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutItemAboutItem extends Schema.CollectionType {
  collectionName: 'about_items';
  info: {
    singularName: 'about-item';
    pluralName: 'about-items';
    displayName: 'About-item';
    name: 'about-item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::about-item.about-item', 'title'>;
    menutitle: Attribute.String;
    order: Attribute.Integer;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-item.about-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about-item.about-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuySchemeBuyScheme extends Schema.CollectionType {
  collectionName: 'buy_schemes';
  info: {
    singularName: 'buy-scheme';
    pluralName: 'buy-schemes';
    displayName: 'Buy-scheme';
    name: 'buy-scheme';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    seourl: Attribute.UID<'api::buy-scheme.buy-scheme', 'title'>;
    plotavailabilitytext: Attribute.String;
    Seo: Attribute.Component<'shared.seo'>;
    order: Attribute.Integer;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    carouselimage: Attribute.Media<'images' | 'files' | 'videos'>;
    carouseltext: Attribute.RichText;
    title: Attribute.String;
    carouselimagecontain: Attribute.Boolean;
    zoopla: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::buy-scheme.buy-scheme',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::buy-scheme.buy-scheme',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBuyingGuideBuyingGuide extends Schema.CollectionType {
  collectionName: 'buying_guides';
  info: {
    singularName: 'buying-guide';
    pluralName: 'buying-guides';
    displayName: 'Buying-guide';
    name: 'buying-guide';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    seourl: Attribute.UID<'api::buying-guide.buying-guide', 'title'>;
    Seo: Attribute.Component<'shared.seo'>;
    order: Attribute.Integer;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    title: Attribute.String;
    carouselimage: Attribute.Media<'images'>;
    carouseltext: Attribute.RichText;
    carouselimagecontain: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::buying-guide.buying-guide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::buying-guide.buying-guide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCareerItemCareerItem extends Schema.CollectionType {
  collectionName: 'career_items';
  info: {
    singularName: 'career-item';
    pluralName: 'career-items';
    displayName: 'Career-item';
    name: 'career-item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::career-item.career-item', 'title'>;
    dateclosing: Attribute.Date;
    office: Attribute.Relation<
      'api::career-item.career-item',
      'oneToOne',
      'api::region.region'
    >;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    Seo: Attribute.Component<'shared.seo'>;
    live: Attribute.Boolean;
    dateadded: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::career-item.career-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::career-item.career-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsentPopupConsentPopup extends Schema.CollectionType {
  collectionName: 'consent_popups';
  info: {
    singularName: 'consent-popup';
    pluralName: 'consent-popups';
    displayName: 'Consent-popup';
    name: 'consent-popup';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    uid: Attribute.UID;
    show: Attribute.DateTime;
    hide: Attribute.DateTime;
    shortmessage: Attribute.RichText;
    longmessage: Attribute.RichText;
    live: Attribute.Boolean;
    cookiename: Attribute.UID<'api::consent-popup.consent-popup', 'title'>;
    description: Attribute.RichText;
    cookieexpiry: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consent-popup.consent-popup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consent-popup.consent-popup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactItemContactItem extends Schema.CollectionType {
  collectionName: 'contact_items';
  info: {
    singularName: 'contact-item';
    pluralName: 'contact-items';
    displayName: 'Contact-item';
    name: 'contact-item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::contact-item.contact-item', 'title'>;
    menutitle: Attribute.String;
    order: Attribute.Integer;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-item.contact-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-item.contact-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountyCounty extends Schema.CollectionType {
  collectionName: 'counties';
  info: {
    singularName: 'county';
    pluralName: 'counties';
    displayName: 'County';
    name: 'county';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    seourl: Attribute.UID<'api::county.county', 'name'>;
    lat: Attribute.Float;
    lng: Attribute.Float;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::county.county',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::county.county',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomerSupportItemCustomerSupportItem
  extends Schema.CollectionType {
  collectionName: 'customer_support_items';
  info: {
    singularName: 'customer-support-item';
    pluralName: 'customer-support-items';
    displayName: 'Customer-support-item';
    name: 'customer-support-item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<
      'api::customer-support-item.customer-support-item',
      'title'
    >;
    menutitle: Attribute.String;
    order: Attribute.Integer;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customer-support-item.customer-support-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customer-support-item.customer-support-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevelopmentDevelopment extends Schema.CollectionType {
  collectionName: 'developments';
  info: {
    singularName: 'development';
    pluralName: 'developments';
    displayName: 'Development';
    name: 'development';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.RichText;
    office: Attribute.Relation<
      'api::development.development',
      'oneToOne',
      'api::region.region'
    >;
    city: Attribute.String;
    postcode: Attribute.String;
    addressline1: Attribute.String;
    addressline2: Attribute.String;
    images: Attribute.Media<'images' | 'videos', true>;
    mondayopening: Attribute.Time;
    mondayclosing: Attribute.Time;
    tuesdayopening: Attribute.Time;
    tuesdayclosing: Attribute.Time;
    wednesdayopening: Attribute.Time;
    wednesdayclosing: Attribute.Time;
    thursdayopening: Attribute.Time;
    thursdayclosing: Attribute.Time;
    fridayopening: Attribute.Time;
    fridayclosing: Attribute.Time;
    saturdayopening: Attribute.Time;
    saturdayclosing: Attribute.Time;
    sundayopening: Attribute.Time;
    sundayclosing: Attribute.Time;
    telephone: Attribute.String;
    seourl: Attribute.UID<'api::development.development', 'name'> &
      Attribute.Required;
    seo: Attribute.Component<'shared.seo'>;
    specificationstext: Attribute.RichText;
    forthcoming: Attribute.Boolean;
    lat: Attribute.Float;
    lng: Attribute.Float;
    email: Attribute.Email;
    conversionid: Attribute.String;
    locationkeys: Attribute.String;
    lastfew: Attribute.Boolean;
    contactbuilder: Attribute.Integer;
    active: Attribute.Boolean;
    homeofweek: Attribute.Boolean;
    plots: Attribute.Relation<
      'api::development.development',
      'oneToMany',
      'api::plot.plot'
    >;
    featuredtext: Attribute.Text;
    siteplanimage: Attribute.Media<'images'>;
    siteplanpdf: Attribute.Media<'files'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    aboutthearea: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    contentbottom: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    brochure: Attribute.Media<'files'>;
    developmenthighlights: Attribute.Component<
      'components.specificationicon',
      true
    >;
    housetypehighlights: Attribute.Component<
      'components.specificationicon',
      true
    >;
    housetypespecificationssheet: Attribute.Media<'files'>;
    herotext: Attribute.RichText;
    shortdescription: Attribute.Text;
    county_: Attribute.Relation<
      'api::development.development',
      'oneToOne',
      'api::county.county'
    >;
    label_: Attribute.Relation<
      'api::development.development',
      'oneToOne',
      'api::development-label.development-label'
    >;
    disableenquire: Attribute.Boolean;
    coinsid: Attribute.String;
    coins: Attribute.Integer;
    whatthreewords: Attribute.String;
    event: Attribute.Component<'shared.event'>;
    termsandconditions: Attribute.Component<'shared.terms-and-conditions'>;
    interactivemap: Attribute.Media<'images'>;
    zooplaid: Attribute.String;
    homewisedev: Attribute.Boolean;
    homewiseplots: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::development.development',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::development.development',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevelopmentLabelDevelopmentLabel
  extends Schema.CollectionType {
  collectionName: 'development_labels';
  info: {
    singularName: 'development-label';
    pluralName: 'development-labels';
    displayName: 'Development-label';
    name: 'development-label';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    color: Attribute.Enumeration<
      [
        'Dark_Blue_text_on_White',
        'White_text_on_Dark_Blue',
        'White_text_on_Teal',
        'White_text_on_Yellow',
        'Dark_Blue_text_on_Light_Grey'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::development-label.development-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::development-label.development-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFloorFloor extends Schema.CollectionType {
  collectionName: 'floors';
  info: {
    singularName: 'floor';
    pluralName: 'floors';
    displayName: 'Floor';
    name: 'floor';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    live: Attribute.Boolean;
    order: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::floor.floor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::floor.floor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomePageHomePage extends Schema.CollectionType {
  collectionName: 'home_pages';
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'Home-page';
    name: 'home-page';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    Seo: Attribute.Component<'shared.seo'>;
    hero: Attribute.Component<'components.heroitem', true>;
    iconlist: Attribute.Component<'components.icon-list-item', true>;
    quote: Attribute.Component<'components.quote'>;
    title: Attribute.String;
    seourl: Attribute.UID<'api::home-page.home-page', 'title'>;
    menutitle: Attribute.String;
    order: Attribute.Integer;
    live: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationPageLocationPage extends Schema.CollectionType {
  collectionName: 'location_pages';
  info: {
    singularName: 'location-page';
    pluralName: 'location-pages';
    displayName: 'Location-page';
    name: 'location-page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::location-page.location-page', 'title'>;
    menutitle: Attribute.String;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    order: Attribute.Integer;
    live: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location-page.location-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::location-page.location-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewsItemNewsItem extends Schema.CollectionType {
  collectionName: 'news_items';
  info: {
    singularName: 'news-item';
    pluralName: 'news-items';
    displayName: 'News-item';
    name: 'news-item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::news-item.news-item', 'title'>;
    date: Attribute.Date;
    office: Attribute.Relation<
      'api::news-item.news-item',
      'oneToOne',
      'api::region.region'
    >;
    shortdescription: Attribute.RichText;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    Seo: Attribute.Component<'shared.seo'>;
    live: Attribute.Boolean;
    carouselimage: Attribute.Media<'images' | 'files' | 'videos'>;
    carouseltext: Attribute.RichText;
    carouselimagecontain: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::news-item.news-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::news-item.news-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOptionsExtraOptionsExtra extends Schema.CollectionType {
  collectionName: 'options_extras';
  info: {
    singularName: 'options-extra';
    pluralName: 'options-extras';
    displayName: 'Options-extra';
    name: 'options-extra';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::options-extra.options-extra', 'title'>;
    menutitle: Attribute.String;
    order: Attribute.Integer;
    Seo: Attribute.Component<'shared.seo'>;
    carouselimage: Attribute.Media<'images' | 'files' | 'videos'>;
    carouseltext: Attribute.RichText;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    carouselimagecontain: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::options-extra.options-extra',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::options-extra.options-extra',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlotPlot extends Schema.CollectionType {
  collectionName: 'plots';
  info: {
    singularName: 'plot';
    pluralName: 'plots';
    displayName: 'Plot';
    name: 'plot';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    development: Attribute.Relation<
      'api::plot.plot',
      'manyToOne',
      'api::development.development'
    >;
    number: Attribute.Integer;
    price: Attribute.Decimal;
    homeoftheweek: Attribute.Boolean;
    partexchange: Attribute.Boolean;
    property: Attribute.Relation<
      'api::plot.plot',
      'oneToOne',
      'api::property.property'
    >;
    bannerincentive: Attribute.String;
    incentive1: Attribute.String;
    incentive2: Attribute.String;
    incentive3: Attribute.String;
    incentive4: Attribute.String;
    incentive5: Attribute.String;
    calltoaction: Attribute.String;
    availability: Attribute.Enumeration<
      ['none', 'comingsoon', 'forsale', 'reserved', 'sold']
    > &
      Attribute.DefaultTo<'none'>;
    dealofthemonth: Attribute.Boolean;
    movemaker: Attribute.Boolean;
    featuredhomeoftheweek: Attribute.Boolean;
    helptobuy: Attribute.Boolean;
    homereach: Attribute.Boolean;
    homeoftheweekoffer: Attribute.String;
    override: Attribute.DynamicZone<
      [
        'components.name',
        'components.short-description',
        'components.images',
        'components.bedrooms',
        'components.bathrooms',
        'components.garages'
      ]
    >;
    showhome: Attribute.Boolean;
    buy_schemes: Attribute.Relation<
      'api::plot.plot',
      'oneToMany',
      'api::buy-scheme.buy-scheme'
    >;
    plot_type: Attribute.Relation<
      'api::plot.plot',
      'oneToOne',
      'api::plot-type.plot-type'
    >;
    live: Attribute.Boolean;
    label_: Attribute.Relation<
      'api::plot.plot',
      'oneToOne',
      'api::plot-label.plot-label'
    >;
    hold: Attribute.Enumeration<['Freehold', 'Leasehold']> & Attribute.Required;
    featuredplot: Attribute.Boolean;
    featuredplotlabel: Attribute.String;
    maplocation: Attribute.JSON &
      Attribute.CustomField<'plugin::google-maps-tonik.location-picker'>;
    zoopla: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::plot.plot', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::plot.plot', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPlotLabelPlotLabel extends Schema.CollectionType {
  collectionName: 'plot_labels';
  info: {
    singularName: 'plot-label';
    pluralName: 'plot-labels';
    displayName: 'Plot-label';
    name: 'plot-label';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    color: Attribute.Enumeration<
      [
        'Dark_Blue_text_on_White',
        'White_text_on_Dark_Blue',
        'White_text_on_Red',
        'White_text_on_Teal',
        'White_text_on_Yellow',
        'Dark_Blue_text_on_Light_Grey'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::plot-label.plot-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::plot-label.plot-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlotTypePlotType extends Schema.CollectionType {
  collectionName: 'plot_types';
  info: {
    singularName: 'plot-type';
    pluralName: 'plot-types';
    displayName: 'Plot-type';
    name: 'plot-type';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    live: Attribute.Boolean;
    zoopla: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::plot-type.plot-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::plot-type.plot-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPromoPagePromoPage extends Schema.CollectionType {
  collectionName: 'promo_pages';
  info: {
    singularName: 'promo-page';
    pluralName: 'promo-pages';
    displayName: 'Promo-page';
    name: 'promo-page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::promo-page.promo-page', 'title'>;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    live: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::promo-page.promo-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::promo-page.promo-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPropertyProperty extends Schema.CollectionType {
  collectionName: 'properties';
  info: {
    singularName: 'property';
    pluralName: 'properties';
    displayName: 'Property';
    name: 'property';
    description: '';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    bedrooms: Attribute.Integer & Attribute.DefaultTo<0>;
    shortdescription: Attribute.RichText;
    bathrooms: Attribute.Integer & Attribute.DefaultTo<0>;
    seourl: Attribute.UID<'api::property.property', 'name'>;
    images: Attribute.Media<'images', true>;
    showhome: Attribute.DynamicZone<
      [
        'components.images',
        'components.text',
        'components.videos',
        'components.link-items'
      ]
    >;
    description: Attribute.RichText;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      ['components.text', 'components.videos', 'components.link-items']
    >;
    live: Attribute.Boolean;
    showoptionsextras: Attribute.Boolean;
    housetypespecificationssheet: Attribute.Media<
      'images' | 'files' | 'videos'
    >;
    housetypehighlights: Attribute.Component<
      'components.specificationicon',
      true
    >;
    floorplans: Attribute.Component<'components.floorhouse', true>;
    garages: Attribute.Integer & Attribute.DefaultTo<0>;
    displayname: Attribute.String;
    termsandconditions: Attribute.Component<'shared.terms-and-conditions'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::property.property',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::property.property',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReasonsToBuyAWainHomeReasonsToBuyAWainHome
  extends Schema.CollectionType {
  collectionName: 'reasons_to_buy_a_wain_homes';
  info: {
    singularName: 'reasons-to-buy-a-wain-home';
    pluralName: 'reasons-to-buy-a-wain-homes';
    displayName: 'Reasons-to-buy-a-wain-home';
    name: 'reasons-to-buy-a-wain-home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<
      'api::reasons-to-buy-a-wain-home.reasons-to-buy-a-wain-home',
      'title'
    >;
    menutitle: Attribute.String;
    Seo: Attribute.Component<'shared.seo'>;
    carouselimage: Attribute.Media<'images' | 'files' | 'videos'>;
    carouseltext: Attribute.RichText;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    order: Attribute.Integer;
    live: Attribute.Boolean;
    carouselbigtext: Attribute.RichText;
    carouseltitle: Attribute.String;
    carousellink: Attribute.Component<'components.link'>;
    carouselbigtextcolor: Attribute.Enumeration<['blue', 'white', 'pink']>;
    carouselimagecontain: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::reasons-to-buy-a-wain-home.reasons-to-buy-a-wain-home',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::reasons-to-buy-a-wain-home.reasons-to-buy-a-wain-home',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRegionRegion extends Schema.CollectionType {
  collectionName: 'regions';
  info: {
    singularName: 'region';
    pluralName: 'regions';
    displayName: 'Region';
    name: 'region';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    seourl: Attribute.UID<'api::region.region', 'name'>;
    city: Attribute.String;
    postcode: Attribute.String;
    addressline1: Attribute.String;
    addressline2: Attribute.String;
    telephone: Attribute.String;
    email: Attribute.Email;
    mondayopening: Attribute.Time;
    mondayclosing: Attribute.Time;
    tuesdayopening: Attribute.Time;
    tuesdayclosing: Attribute.Time;
    wednesdayopening: Attribute.Time;
    wednesdayclosing: Attribute.Time;
    thursdayopening: Attribute.Time;
    thursdayclosing: Attribute.Time;
    fridayopening: Attribute.Time;
    fridayclosing: Attribute.Time;
    saturdayopening: Attribute.Time;
    saturdayclosing: Attribute.Time;
    sundayopening: Attribute.Time;
    sundayclosing: Attribute.Time;
    showfirst: Attribute.Boolean;
    live: Attribute.Boolean;
    county_: Attribute.Relation<
      'api::region.region',
      'oneToOne',
      'api::county.county'
    >;
    latitude_search_map: Attribute.Float;
    longitude_search_map: Attribute.Float;
    coinsofficeid: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::region.region',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::region.region',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRichtextRichtext extends Schema.SingleType {
  collectionName: 'richtexts';
  info: {
    singularName: 'richtext';
    pluralName: 'richtexts';
    displayName: 'Richtext';
    name: 'richtext';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    richtext: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::richtext.richtext',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::richtext.richtext',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSearchPageSearchPage extends Schema.CollectionType {
  collectionName: 'search_pages';
  info: {
    singularName: 'search-page';
    pluralName: 'search-pages';
    displayName: 'Search-page';
    name: 'search-page';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::search-page.search-page', 'title'>;
    menutitle: Attribute.String;
    order: Attribute.Integer;
    live: Attribute.Boolean;
    Seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::search-page.search-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::search-page.search-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWaysToBuyItemWaysToBuyItem extends Schema.CollectionType {
  collectionName: 'ways_to_buy_items';
  info: {
    singularName: 'ways-to-buy-item';
    pluralName: 'ways-to-buy-items';
    displayName: 'Ways-to-buy-item';
    name: 'ways-to-buy-item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<'api::ways-to-buy-item.ways-to-buy-item', 'title'>;
    menutitle: Attribute.String;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    order: Attribute.Integer;
    live: Attribute.Boolean;
    carouselimage: Attribute.Media<'images' | 'files' | 'videos'>;
    carouseltext: Attribute.RichText;
    carouselimagecontain: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ways-to-buy-item.ways-to-buy-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ways-to-buy-item.ways-to-buy-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebsiteVariableWebsiteVariable
  extends Schema.CollectionType {
  collectionName: 'website_variables';
  info: {
    singularName: 'website-variable';
    pluralName: 'website-variables';
    displayName: 'Website-variable';
    name: 'website-variable';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    uid: Attribute.UID<'api::website-variable.website-variable', 'name'>;
    value: Attribute.Text;
    datemodified: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::website-variable.website-variable',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::website-variable.website-variable',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhyAWainHomeItemWhyAWainHomeItem
  extends Schema.CollectionType {
  collectionName: 'why_a_wain_home_items';
  info: {
    singularName: 'why-a-wain-home-item';
    pluralName: 'why-a-wain-home-items';
    displayName: 'Why-a-wain-home-item';
    name: 'why-a-wain-home-item';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seourl: Attribute.UID<
      'api::why-a-wain-home-item.why-a-wain-home-item',
      'title'
    >;
    menutitle: Attribute.String;
    Seo: Attribute.Component<'shared.seo'>;
    content: Attribute.DynamicZone<
      [
        'components.text',
        'components.imageonly',
        'components.images',
        'components.textimagehr',
        'components.icon-list',
        'components.carousel',
        'components.quote',
        'components.videos',
        'components.insertid',
        'components.link-items',
        'components.buttonitems',
        'components.quote-carousel'
      ]
    >;
    order: Attribute.Integer;
    live: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::why-a-wain-home-item.why-a-wain-home-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::why-a-wain-home-item.why-a-wain-home-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::google-maps-tonik.config': PluginGoogleMapsTonikConfig;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::google-maps.config': PluginGoogleMapsConfig;
      'api::about-item.about-item': ApiAboutItemAboutItem;
      'api::buy-scheme.buy-scheme': ApiBuySchemeBuyScheme;
      'api::buying-guide.buying-guide': ApiBuyingGuideBuyingGuide;
      'api::career-item.career-item': ApiCareerItemCareerItem;
      'api::consent-popup.consent-popup': ApiConsentPopupConsentPopup;
      'api::contact-item.contact-item': ApiContactItemContactItem;
      'api::county.county': ApiCountyCounty;
      'api::customer-support-item.customer-support-item': ApiCustomerSupportItemCustomerSupportItem;
      'api::development.development': ApiDevelopmentDevelopment;
      'api::development-label.development-label': ApiDevelopmentLabelDevelopmentLabel;
      'api::floor.floor': ApiFloorFloor;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::location-page.location-page': ApiLocationPageLocationPage;
      'api::news-item.news-item': ApiNewsItemNewsItem;
      'api::options-extra.options-extra': ApiOptionsExtraOptionsExtra;
      'api::plot.plot': ApiPlotPlot;
      'api::plot-label.plot-label': ApiPlotLabelPlotLabel;
      'api::plot-type.plot-type': ApiPlotTypePlotType;
      'api::promo-page.promo-page': ApiPromoPagePromoPage;
      'api::property.property': ApiPropertyProperty;
      'api::reasons-to-buy-a-wain-home.reasons-to-buy-a-wain-home': ApiReasonsToBuyAWainHomeReasonsToBuyAWainHome;
      'api::region.region': ApiRegionRegion;
      'api::richtext.richtext': ApiRichtextRichtext;
      'api::search-page.search-page': ApiSearchPageSearchPage;
      'api::ways-to-buy-item.ways-to-buy-item': ApiWaysToBuyItemWaysToBuyItem;
      'api::website-variable.website-variable': ApiWebsiteVariableWebsiteVariable;
      'api::why-a-wain-home-item.why-a-wain-home-item': ApiWhyAWainHomeItemWhyAWainHomeItem;
    }
  }
}
