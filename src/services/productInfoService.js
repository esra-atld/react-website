import baseApi from './baseApi';
import("./priceSearchService")


/**
 * @typedef {Object} ProductInfoRequestDto
 * @property {number} productType
 * @property {number} ownerProvider
 * @property {string} product
 * @property {string} culture
 */


/**
 * @typedef {Object} Country
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} State
 * @property {string} id
 * @property {string} name
 */
/**
 * @typedef {Object} City
 * @property {string} id
 * @property {string} name
 */
/**
 * @typedef {Object} Hotel
 * @property {string} internationalName
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} RecommendedCity
 * @property {number} type
 * @property {GeoLocation} geoLocation
 * @property {Country} country
 * @property {State} state
 * @property {City} city
 * @property {Hotel} hotel
 * @property {number} provider
 * @property {GiataInfo} giataInfo
*/

/**
 * @typedef {Object} SearchRecommendedResponseDto
 * @property {Array<RecommendedCity>} items
*/

/** 
 * @typedef {Object} ProductInfoResponseDto
 * @property {ProductInfoResponseBody} [body]
 * @property {HeaderDto} [header]
*/

/**
 * @typedef {Object} ProductInfoResponseBody
 * @property {HotelDto} hotel
 */

/**
 * @typedef {Object} HotelDto
 * @property {Array<Seasons>} seasons
 * @property {AddressDto} address
 * @property {GeoLocation} geoLocation
 * @property {number} stars
 * @property {string} thumbnailFull
 * @property {string} name
 * 
 */

/**
 * @typedef {Object} GeoLocation
 * @property {string} longitude
 * @property {string} latitude
 */

/**
 * @typedef {Object} Seasons
 * @property {Array<FacilityCategories>} facilityCategories
*/

/**
 * @typedef {Object} FacilityCategories
 * @property {Array<Facilities>} facilities
*/

/**
 * @typedef {Object} Facilities
 * @property {string} id
 * @property {string} name
 * @property {boolean} isPriced
 */


 /**
 * @typedef {Object} AddressDto
 * @property {Object} city
 * @property {Array<string>} addressLines
 * @property {GeoLocation} geoLocation
 */


/**
 * Fetches prices for hotels based on the provided query.
 * @param {string} recommendedCity - 
 * @returns {Promise<SearchRecommendedResponseDto>}
 */

export async function searchRecommended(recommendedCity) {
  try {
    
    /** @type {SearchRecommendedResponseDto} */
    const response = await fetch(`http://localhost:5045/api/searchrecommendedcities?recommendedCity=${recommendedCity}`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); 
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Message: ${errorData.message || 'No specific error message.'}`);
    }

    const data = await response.json();
    return data || [];

  } catch (error) {
    console.error('Error fetching recommended cities:', error);
    throw error;
  }
}


/**
 * Fetches prices for hotels based on the provided query.
 * @param {ProductInfoRequestDto} requestData - 
 * @returns {Promise<ProductInfoResponseDto>}
 */
export async function getProductInfo(requestData) {
  try {
    /** @type {ProductInfoResponseDto} */
    const response = await baseApi.post('/getproductinfo', requestData);
    return response || {};
  } catch (error) {
    console.error('Error fetching product info:', error);
    throw error;
  }
}