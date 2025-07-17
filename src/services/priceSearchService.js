import baseApi from './baseApi';
/**
 * @typedef {Object} RoomCriteriaDto
 * @property {number} adult
 * @property {number[]} childAges
 */

/**
 * @typedef {Object} ArrivalLocationDto
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} PriceSearchRequestDto
 * @property {boolean} checkAllotment
 * @property {boolean} checkStopSale
 * @property {boolean} getOnlyDiscountedPrice
 * @property {boolean} getOnlyBestOffers
 * @property {number} productType
 * @property {ArrivalLocationDto[]} arrivalLocations
 * @property {string[]} [products]
 * @property {RoomCriteriaDto[]} roomCriteria
 * @property {string} nationality
 * @property {string} checkIn // ISO date string
 * @property {number} night
 * @property {string} currency
 * @property {string} culture
 */



/**
 * @typedef {Object} Traveller
 * @property {number} type
 * @property {number} age
 * @property {string} nationality
 */

/**
 * @typedef {Object} Price
 * @property {number} oldAmount
 * @property {number} percent
 * @property {number} amount
 * @property {string} currency
 */

/**
 * @typedef {Object} SpoItem
 * @property {number} productType
 * @property {Price} price
 */

/**
 * @typedef {Object} Spo
 * @property {Price} price
 * @property {SpoItem[]} items
 */

/**
 * @typedef {Object} BoardDto
 * @property {string} [id]
 * @property {string} [name]
 */

/**
 * @typedef {Object} RoomDto
 * @property {number} partNo
 * @property {string} roomId
 * @property {string} roomName
 * @property {any[]} [roomGroups]
 * @property {string} accomId
 * @property {string} accomName
 * @property {string} boardId
 * @property {string} boardName
 * @property {BoardDto[]} boardGroups
 * @property {number} allotment
 * @property {number} stopSaleGuaranteed
 * @property {number} stopSaleStandart
 * @property {Spo} spo
 * @property {Price} price
 * @property {Traveller[]} travellers
 * @property {boolean} visiblePL
 */

/**
 * @typedef {Object} CancellationPolicyDto
 * @property {string} roomNumber
 * @property {string} dueDate
 * @property {Price} price
 * @property {number} provider
 */

/**
 * @typedef {Object} OfferDto
 * @property {number} night
 * @property {boolean} isAvailable
 * @property {number} availability
 * @property {RoomDto[]} rooms
 * @property {boolean} isRefundable
 * @property {boolean} isChannelManager
 * @property {string} expiresOn
 * @property {string} offerId
 * @property {string} checkIn
 * @property {Price} price
 * @property {boolean} ownOffer
 * @property {number} provider
 * @property {boolean} availabilityChecked
 * @property {CancellationPolicyDto[]} cancellationPolicies
 * @property {boolean} thirdPartyOwnOffer
 */

/**
 * @typedef {Object} BadgeDto
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} DescriptionDto
 * @property {string} text
 */

/**
 * @typedef {Object} HotelCategory
 * @property {string} id
 * @property {string} name
 * @property {string} code
 */

/**
 * @typedef {Object} FacilitiesDto
 * @property {boolean} isPriced
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} ThemeDto
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} GeoLocation
 * @property {string} latitude
 * @property {string} longitude
 */

/**
 * @typedef {Object} LocationDto
 * @property {string} name
 * @property {string} latitude
 * @property {string} longitude
 * @property {string} countryId
 * @property {number} provider
 * @property {boolean} isTopRegion
 * @property {boolean} ownLocation
 * @property {string} id
 */

/**
 * @typedef {Object} CountryDto
 * @property {string} internationalCode
 * @property {string} name
 * @property {number} provider
 * @property {boolean} isTopRegion
 * @property {boolean} ownLocation
 */

/**
 * @typedef {Object} CityDto
 * @property {string} name
 * @property {string} latitude
 * @property {string} longitude
 * @property {number} provider
 * @property {boolean} isTopRegion
 * @property {boolean} ownLocation
 * @property {string} id
 */

/**
 * @typedef {Object} GiataInfo
 * @property {string} hotelId
 * @property {string} destinationId
 */

/**
 * @typedef {Object} HotelDto
 * @property {number} stars
 * @property {number} rating
 * @property {FacilitiesDto[]} facilities
 * @property {ThemeDto[]} themes
 * @property {GeoLocation} geoLocation
 * @property {LocationDto} location
 * @property {CountryDto} country
 * @property {CityDto} city
 * @property {GiataInfo} giataInfo
 * @property {OfferDto[]} offers
 * @property {string} address
 * @property {BoardDto[]} boardGroups
 * @property {BoardDto[]} boards
 * @property {BadgeDto[]} badges
 * @property {HotelCategory} hotelCategory
 * @property {number} orderNumber
 * @property {string} originalName
 * @property {boolean} hasThirdPartyOwnOffer
 * @property {boolean} hasChannelManagerOffer
 * @property {string} code
 * @property {number} provider
 * @property {string} id
 * @property {string} name
 * @property {string} thumbnail
 * @property {string} thumbnailFull
 * @property {DescriptionDto} [description]
 */

/**
 * @typedef {Object} PriceSearchResponseBody
 * @property {string} searchId
 * @property {string} expiresOn
 * @property {HotelDto[]} hotels
 */

/**
 * @typedef {Object} HeaderDto
 * @property {string} [requestId]
 * @property {boolean} [success]
 * @property {string} [responseTime]
 * @property {Array<Object>} [messages]
 */

/**
 * @typedef {Object} PriceSearchResponseDto
 * @property {PriceSearchResponseBody} [body]
 * @property {HeaderDto} [header]
 */



/**
 * Fetches prices for hotels based on the provided query.
 * @param {PriceSearchRequestDto} requestData - 
 * @returns {Promise<PriceSearchResponseDto>}
 */
export const hotelPriceSearch = async (requestData) => {
    try {
      /** @type {GetArrivalAutocompleteResponseDto} */
      const response = await baseApi.post('/hotelPriceSearch', requestData);
  
      return response || {}; 
    } catch (error) {
      console.error('Error fetching hotel price search:', error);
      throw error;
    }
  };
/**
 * Fetches prices for hotels based on the provided query.
 * @param {PriceSearchRequestDto} requestData - 
 * @returns {Promise<PriceSearchResponseDto>}
 */
export const locationPriceSearch = async (requestData) => {
    try {
        /** @type {PriceSearchResponseDto} */
        const response = await baseApi.post('/locationPriceSearch', requestData);
      return response || {}; 
    } catch (error) {
        console.error('Error fetching location price search:', error);
        throw error;
    }
}