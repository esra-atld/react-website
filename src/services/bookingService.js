import baseApi from './baseApi';

/**
 * @typedef  {Object} BeginTransactionRequest
 * @property {Array<string>} offerIds
 * @property {string} currency
 * @property {string} culture
 */

/**
 * @typedef {Object} SetReservationInfoRequest
 * @property {string} transactionId
 * @property {Array<Traveller>} travellers
 * @property {string} reservationNote
 * @property {string} agencyReservationNumber
 */

/**
 * @typedef {Object} Traveller
 * @property {string} travellerId
 * @property {number} type
 * @property {number} title
 * @property {string} name
 * @property {string} surname
 * @property {boolean} isLeader
 * @property {string} leaderEmail
 * @property {Nationality} nationality
 * @property {PassportInfo} passportInfo
 * @property {Address} address
 * @property {Array<Object>} documents
 * @property {Array<Object>} insertFields

 */

/**
 * @typedef {Object} Nationality
 * @property {string} twoLetterCode
 */

/**
 * @typedef {Object} PassportInfo
 * @property {string} expireDate
 * @property {string} issueDate
 * @property {string} citizenshipCountryCode
*/

/**
 * @typedef {Object} Address
 * @property {string} email
 * @property {string} address
 * @property {string} zipCode
 * @property {CityorCountry} city
 * @property {CityorCountry} country
*/

/**
 * @typedef {Object} CityorCountry
 * @property {string} id 
 * @property {string} name
*/

/**
 * @typedef {Object} CommitTransactionRequest
 * @property {string} TransactionId
 */


/**
 * @param {BeginTransactionRequest} requestData 
 */
export const BeginTransaction = async (requestData) => {
    try {
      const data = await baseApi.post('/begintransaction', requestData);
      return data
    } catch (error) {
      console.error('error beginning transaction:', error);
      throw error;
    }
};

/**
 * @param {SetReservationInfoRequest} requestData 
 */
export const SetReservationInfo = async (requestData) => {
    try {
      const data = await baseApi.post('/setreservationinfo', requestData);
      return data
    } catch (error) {
      console.error('Error setting reservation info:', error);
      throw error;
    }
};


/**
 * @param {CommitTransactionRequest} requestData 
 */
export const CommitTransaction = async (requestData) => {
    try {
      const data = await baseApi.post('/committransaction', requestData);
      return data
    } catch (error) {
      console.error('Error commiting transaction:', error);
      throw error;
    }
};
