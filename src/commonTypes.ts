/**
 * Common types
 * best keept separately and included where needed
 */


/**
 * tuple of ten numbers in order of prices for price of 0-5 months, 5-13 months, 13-40 months, (...) 200+ months
 */
export type PricesArray = [number, number, number, number, number, number, number, number, number, number]


/**
 * This is primarily designed for UI, but useable anywhere to name tuple of type [number, number, number] with their names in EIN context
 */
export enum einEnum {
    excitement,
    intensity,
    nausea
}

/** OpenRCT2 string {} to be used when showing something wrong */
export const errorColorCode = "{LIGHTPINK}"
