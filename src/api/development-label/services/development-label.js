'use strict';

/**
 * development-label service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::development-label.development-label');