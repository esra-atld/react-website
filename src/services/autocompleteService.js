// services/autocompleteService.js
import baseApi from './baseApi';
/**
 * @typedef {Object} GetArrivalAutocompleteRequestDto
 * @property {number} ProductType - The type of product (e.g., 1 for flight, 2 for hotel).
 * @property {string} Query - The search query string.
 * @property {string} Culture - The culture code (e.g., "en-US", "tr-TR").
 */

/**
 * @typedef {Object} BackendGeoLocation
 * @property {string} [Longitude]
 * @property {string} [Latitude]
 */

/**
 * @typedef {Object} BackendLocationInfo
 * @property {string} [Id]
 * @property {string} [Name]
 */

/**
 * @typedef {Object} BackendHotelInfo
 * @property {string} [InternationalName]
 * @property {string} [Id]
 * @property {string} [Name]
 */

/**
 * @typedef {Object} BackendGiataInfo
 * @property {string} [HotelId]
 * @property {string} [DestinationId]
 */

/**
 * @typedef {Object} BackendSearchItem
 * @property {number} type - 1 for city/destination, 2 for hotel. 
 * @property {BackendGeoLocation} [geolocation] 
 * @property {BackendLocationInfo} [country] 
 * @property {BackendLocationInfo} [state] 
 * @property {BackendLocationInfo} [city] 
 * @property {BackendHotelInfo} [hotel] 
 * @property {number} provider 
 * @property {BackendGiataInfo} [giataInfo] 
 */

/**
 * @typedef {Object} BackendSearchResponseBody
 * @property {BackendSearchItem[]} [items] 
 */

/**
 * @typedef {import('./types').HeaderDto} HeaderDto
 */

/**
 * @typedef {Object} GetArrivalAutocompleteResponseDto
 * @property {BackendSearchResponseBody} [body] 
 * @property {HeaderDto} [header] 
 */


/**
 * Fetches autocomplete suggestions for arrivals based on the provided query.
 * @param {GetArrivalAutocompleteRequestDto} requestData - The request payload for the autocomplete API.
 * @returns {Promise<BackendSearchItem[]>} A promise that resolves to an array of BackendSearchItem, or an empty array if no items are found or an error occurs.
 */
export const getArrivalAutocomplete = async (requestData) => {
    try {
      /** @type {GetArrivalAutocompleteResponseDto} */
      const data = await baseApi.post('/getarrivalautocomplete', requestData);
  
      return data.body?.items || [];
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
      throw error;
    }
};

