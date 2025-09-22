/**
 * Functions for calculating 
 * 
 * Assigned: LordMarcel
 */

import { PricesArray } from "./commonTypes"
import { rideDataArray, rideTableCol } from "./rideData"

/**
 * 
 * @param ride row of rideDataArray
 * @param e excitement value
 * @param i intensity value
 * @param n nausea value
 * @param multipleSame true when there are multiple same rides in park
 * @param entranceCharge true when park charges entrance fee
 * @returns tuple of ten numbers in order of prices for price of 0-5 months, 5-13 months, 13-40 months, (...) 200+ months
 */
export function calculateRidePrices(ride: number, e: number, i: number, n: number, multipleSame: boolean, entranceCharge: boolean): PricesArray{
    console.log(`fn calculateRidePrices (${ride}, ${e}, ${i}, ${n}, ${multipleSame}, ${entranceCharge})`)

    let nameThisAsYouLike: PricesArray

    nameThisAsYouLike = [1.11111, 2.2222222,3.321 ,4, 5,6,7,8,9,0]

    // example of sourcing data
    console.log("fn calculateRidePrices middle: " + [ rideDataArray[ride][rideTableCol.RideName], rideDataArray[ride][rideTableCol.Excitement], 
        rideDataArray[ride][rideTableCol.Intensity], rideDataArray[ride][rideTableCol.Nausea] ])

    /// do whatever you desire

    console.log(`fn calculateRidePrices returns ${nameThisAsYouLike}`)
    return nameThisAsYouLike
}