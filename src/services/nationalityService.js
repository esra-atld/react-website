// services/nationalityService.js
import baseApi from './baseApi';
/**
 * @typedef {Object} Nationality
 * @property {string} id - The nationality's ISO code (e.g., "TR").
 * @property {string} name - The full name of the country (e.g., "Turkey").
 * @property {string} isdCode - International dialing code (e.g., "90").
 * @property {string} threeLetterCode - Three-letter ISO code (e.g., "TUR").
 */

/**
 * @typedef {Object} HeaderDto
 * @property {string} [requestId]
 * @property {boolean} [success]
 * @property {string} [responseTime]
 * @property {Array<Object>} [messages]
 */

/**
 * @typedef {Object} GetNationalitiesResponseDto
 * @property {{ nationalities: Nationality[], default: string }} body
 * @property {HeaderDto} header
 */

/**
 * Fetches the list of nationalities from the backend.
 * @returns {Promise<Nationality[]>} A promise that resolves to an array of nationalities.
 */
export const getNationalities = async () => {
    /** @type {{ body: { nationalities: Nationality[] }, header: any }} */
    const response = await baseApi.post('/getnationalities');
    return response.body?.nationalities || [];
};
  