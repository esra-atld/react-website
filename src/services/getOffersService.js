import baseApi from './baseApi';

/**
 * @typedef {Object} GetOffersRequestDto
 * @property {string} searchId
 * @property {string} offerId
 * @property {string} productId
 * @property {number} productType
 * @property {string} currency
 * @property {string} culture
 * @property {boolean} getRoomInfo
 */

/**
 * @typedef {Object} GetOfferDetailsRequestDto
 * @property {Array<string>} offerIds
 * @property {string} currency
 * @property {boolean} getProductInfo
 */

/**
 * @typedef {Object} GetOfferDetailsResponseDto
 * @property {OfferDetailsBodyDto} [body]
 * @property {Header} [header]
 */

/**
 * @typedef {Object} OfferDetailsBodyDto
 * @property {Array<OfferDetailsDto>} offerDetails
 */

/**
 * @typedef {import('./types').OfferDetailsDto} OfferDetailsDto
*/

/**
 * @typedef {import('./types').Price} Price
*/


/**
 * @typedef {Object} GetOffersResponseDto
 * @property {OfferInfoResponseBody} [body]
 * @property {HeaderDto} [header]
 */

/**
 * @typedef {Object} OfferInfoResponseBody
 * @property {Array<OfferDto>} offers
 * @property {Information} Information
 * @property {string} productId
 */
/**
 * @typedef {Object} Information
 * @property {number} total
 */

/**
 * @typedef {import('./types').OfferDto} OfferDto
 */

/**
 * @typedef {import('./types').HeaderDto} HeaderDto
 */


/**
 * Fetches prices for hotels based on the provided query.
 * @param {GetOffersRequestDto} requestData - 
 * @returns {Promise<GetOffersResponseDto>}
 */

export const getOffers = async (requestData) => {
    try {
      /** @type {GetOffersResponseDto} */
      return await baseApi.post('/getoffers', requestData);
  
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
      throw error;
    }
};

/**
 * Fetches prices for hotels based on the provided query.
 * @param {GetOfferDetailsRequestDto} requestData - 
 * @returns {Promise<GetOfferDetailsResponseDto>}
 */
export const getOfferDetails = async (requestData) => {
    try {
      /** @type {GetOfferDetailsResponseDto} */
      return await baseApi.post('/getofferdetails', requestData);
  
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
      throw error;
    }
};
