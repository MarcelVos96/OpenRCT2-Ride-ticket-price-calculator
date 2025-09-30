/**
 * Functions for calculating 
 * 
 * Assigned: LordMarcel
 */

import { PricesArray } from "./commonTypes"
import { rideDataArray, rideTableCol, rideAgeArray, ageTableCol } from "./rideData"

/**
 * 
 * @param ride row of rideDataArray
 * @param ex excitement value
 * @param int intensity value
 * @param na nausea value
 * @param multipleSame true when there are multiple same rides in park
 * @param entranceCharge true when park charges entrance fee
 * @returns tuple of ten numbers in order of prices for price of 0-5 months, 5-13 months, 13-40 months, (...) 200+ months
 */
export function calculateRidePrices(ride: number, ex: number, int: number, na: number, multipleSame: boolean, entranceCharge: boolean): PricesArray{

    let maxPrices: PricesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < maxPrices.length; i++) {
        let excitementValue:number = Math.floor(rideDataArray[ride][rideTableCol.Excitement] * ex / 1024)
        let intensityValue:number = Math.floor(rideDataArray[ride][rideTableCol.Intensity] * int / 1024)
        let nauseaValue:number = Math.floor(rideDataArray[ride][rideTableCol.Nausea] * na / 1024)
        let rideValue:number = excitementValue + intensityValue + nauseaValue
        rideValue = Math.floor(rideValue * rideAgeArray[i][ageTableCol.Multiplier] / rideAgeArray[i][ageTableCol.Divisor] + rideAgeArray[i][ageTableCol.Addition])
        if (multipleSame) rideValue -= Math.floor(rideValue / 4)
        if (entranceCharge) rideValue = Math.floor(rideValue / 4)
        maxPrices[i] = rideValue * 2
    }

    return maxPrices
}