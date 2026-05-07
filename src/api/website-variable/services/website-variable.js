'use strict';

/**
 * website-variable service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::website-variable.website-variable');