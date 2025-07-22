import baseApi from './baseApi';

/**
 * @typedef {Object} Currency
 * @property {string} code 
 * @property {string} internationalCode 
 * @property {string} iconText 
 * @property {string} name 
 */

/**
 * @typedef {import('./types').HeaderDto} HeaderDto
 */

/**
 * @typedef {Object} GetCurrenciesResponseDto
 * @property {{ currencies: Currency[], default: string }} body
 * @property {HeaderDto} header
 */

/**
 * Fetches the list of currencies from the backend.
 * @returns {Promise<Currency[]>} A promise that resolves to an array of nationalities.
 */

export const getCurrencies = async () => {
    /** @type {{ body: { currencies: Currency[] }, header: any }} */
    const response = await baseApi.post('/getcurrencies');
    return response.body?.currencies || [];
};