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
 * @property {number} type - 1 for city/destination, 2 for hotel. (Corrected casing)
 * @property {BackendGeoLocation} [geolocation] (Corrected casing)
 * @property {BackendLocationInfo} [country] (Corrected casing)
 * @property {BackendLocationInfo} [state] (Corrected casing)
 * @property {BackendLocationInfo} [city] (Corrected casing)
 * @property {BackendHotelInfo} [hotel] (Corrected casing)
 * @property {number} provider (Corrected casing)
 * @property {BackendGiataInfo} [giataInfo] (Corrected casing)
 */

/**
 * @typedef {Object} BackendSearchResponseBody
 * @property {BackendSearchItem[]} [items] (Corrected casing)
 */

/**
 * @typedef {Object} HeaderDto
 * @property {string} [requestId]
 * @property {boolean} [success]
 * @property {string} [responseTime]
 * @property {Array<Object>} [messages] // You can define this more strictly if needed
 */

/**
 * @typedef {Object} GetArrivalAutocompleteResponseDto
 * @property {BackendSearchResponseBody} [body] (Corrected casing)
 * @property {HeaderDto} [header] (Corrected casing)
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

