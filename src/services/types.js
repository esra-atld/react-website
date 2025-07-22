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
 * @typedef {Object} OfferDetailsDto
 * @property {string} expiresOn
 * @property {string} offerId
 * @property {string} checkIn
 * @property {string} checkOut
 * @property {boolean} isSpecial
 * @property {boolean} isAvailable
 * @property {number} availability
 * @property {boolean} isRefundable
 * @property {string} notes
 * @property {Price} price
 * @property {HotelDto} hotels
 * @property {Array<CancellationPolicies>} cancellationPolicies
 * @property {Array<PriceBreakdowns>} priceBreakdowns
 */

/**
 * @typedef {Object} CancellationPolicies
 * @property {string} roomNumber
 * @property {string} dueDate
 * @property {Price} price
 * @property {number} provider
 */

/**
 * @typedef {Object} PriceBreakdowns
 * @property {string} roomNumber
 * @property {string} date
 * @property {Price} price
 * @property {number} provider
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
 * @typedef {Object} BoardDto
 * @property {string} [id]
 * @property {string} [name]
 */

/**
 * @typedef {Object} Traveller
 * @property {number} type
 * @property {number} age
 * @property {string} nationality
 */


/**
 * @typedef {Object} HeaderDto
 * @property {string} [requestId]
 * @property {boolean} [success]
 * @property {string} [responseTime]
 * @property {Array<Object>} [messages]
 */

/**
 * @typedef {Object} Price
 * @property {number} oldAmount
 * @property {number} percent
 * @property {number} amount
 * @property {string} currency
 */

/**
 * @typedef {Object} HotelDto
 * @property {Array<Seasons>} seasons
 * @property {AddressDto} address
 * @property {GeoLocation} geoLocation
 * @property {string} thumbnail
 * @property {string} thumbnailFull
 * @property {string} name
 * @property {string} homePage
 * @property {string} faxNumber
 * @property {string} phoneNumber
 * @property {number} stars
 * @property {number} rating
 * @property {Array<Theme>} themes
 * @property {Description} description
 * @property {string} id
 * @property {Country} country
 * @property {City} city
 * @property {OfferDto} offers
 * @property {HotelCategoryDto} hotelCategory
 * @property {number} provider
 * 
 */

/**
 * @typedef {Object} HotelCategoryDto
 * @property {string} name
 * @property {string} id
 * @property {string} code
 */

/**
 * @typedef {Object} Description
 * @property {string} text
 */
/**
 * @typedef {Object} Theme
 * @property {string} id
 * @property {string} name
 */
/**
 * @typedef {Object} GeoLocation
 * @property {string} longitude
 * @property {string} latitude
 */

/**
 * @typedef {Object} Seasons
 * @property {string} name
 * @property {Array<TextCategories>} textCategories
 * @property {Array<FacilityCategories>} facilityCategories
 * @property {Array<MediaFiles>} mediaFiles
*/

/**
 * @typedef {Object} TextCategories
 * @property {string} name
 * @property {Array<Presentations>} presentations
*/

/**
 * @typedef {Object} Presentations
 * @property {number} textType
 * @property {string} text
 */


/**
 * @typedef {Object} MediaFiles
 * @property {string} filetype
 * @property {string} url
 * @property {string} urlFull
 */
/**
 * @typedef {Object} FacilityCategories
 * @property {string} name
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
 * @property {string} street
 * @property {string} streetNumber
 * @property {string} zipCode
 * @property {GeoLocation} geoLocation
 */













module.exports = {};
