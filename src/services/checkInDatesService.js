import baseApi from './baseApi';
/**
 * @typedef {Object} GetCheckInDatesRequestDto
 * @property {number} ProductType - The type of product (e.g., 1 for flight, 2 for hotel).
 * @property {boolean} IncludeSubLocations - Whether to include sub-locations in the search.
 * @property {string} Product - The product identifier (e.g., "flight", "hotel").   
 * @property {Array<{Id: string, Type: number}>} ArrivalLocations - An array of arrival locations with their IDs and types.
 */

/**
 * @typedef {Object} GetCheckInDatesResponseDto
 * @property {Array<string>} Dates
 * @property {HeaderDto} [header] 
*/

/**
 * @typedef {import('./types').HeaderDto} HeaderDto
 */

/** 
* Fetches available check-in dates for a given product type and locations.
* @param {GetCheckInDatesRequestDto} requestDto - The request data transfer object.
* @returns {Promise<GetCheckInDatesResponseDto>} - A promise that resolves to the response data transfer object.
*/

export const getCheckInDates = async (requestDto) => {
    try {
        const response = await baseApi.post('/getcheckindates', requestDto);
        /** @type {GetCheckInDatesResponseDto} */
        return {
            Dates: response.body?.dates || [],
            header: response.header
        };
    } catch (error) {
        console.error('Error fetching check-in dates:', error);
        return { Dates: [], header: { success: false, messages: [{ text: 'Failed to fetch check-in dates' }] } };
    }
}