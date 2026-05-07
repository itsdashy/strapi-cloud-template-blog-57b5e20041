'use strict';

/**
 * options-extra router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::options-extra.options-extra');