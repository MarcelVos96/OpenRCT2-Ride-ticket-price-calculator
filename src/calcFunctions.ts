/**
 * Functions for calculating 
 * 
 * Assigned: LordMarcel
 */

import { PricesArray } from "./commonTypes"
import { rideDataArray, rideTableCol, rideAgeArray } from "./rideData"

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

    let maxPrices: PricesArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < maxPrices.length; i++) {
        let rideValue:number = 0
        rideValue += Math.floor(rideDataArray[ride][1] * e * 100 / 1024)
        rideValue += Math.floor(rideDataArray[ride][2] * i * 100 / 1024)
        rideValue += Math.floor(rideDataArray[ride][3] * n * 100 / 1024)
        rideValue = Math.floor(rideValue * rideAgeArray[i][1] / rideAgeArray[i][2] + rideAgeArray[i][3])
        if (multipleSame) rideValue -= Math.floor(rideValue / 4)
        if (entranceCharge) rideValue = Math.floor(rideValue / 4)
        maxPrices[i] = rideValue * 2 / 10
    }

    // example of sourcing data
    console.log("fn calculateRidePrices middle: " + [ rideDataArray[ride][rideTableCol.RideName], rideDataArray[ride][rideTableCol.Excitement], 
        rideDataArray[ride][rideTableCol.Intensity], rideDataArray[ride][rideTableCol.Nausea] ])

    /// do whatever you desire

    console.log(`fn calculateRidePrices returns ${maxPrices}`)
    return maxPrices
}