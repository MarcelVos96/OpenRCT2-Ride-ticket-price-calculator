import { calculateRidePrices } from "./calcFunctions";
import { viewModel } from "./viewModel";
import { einEnum } from "./commonTypes";
import { rideDataArray, rideTableCol } from "./rideData";

/**
 * User interface actions
 */


/** EIN input fields converted to numbers, since GUI input is "text" field - gives string, e.g. "chicken" or "1.0"*/
var einInputGuarded: [number, number, number] = [0,0,0]

/** Passes argument to calculating part, updates price list in UI */
function callCalcAndUpdatePrices() {
    let newPrices = calculateRidePrices(viewModel.rideSelected.get(),
        einInputGuarded[einEnum.excitement], einInputGuarded[einEnum.intensity], einInputGuarded[einEnum.nausea],
        viewModel.multipleCheck.get(), viewModel.entranceFeeCheck.get())
    
    let curentPrices = viewModel.pricesTable.get().slice()

    for (let i = 0; i < 10; i++) {
        curentPrices[i][2] = newPrices[i].toString()
    }

    viewModel.pricesTable.set(curentPrices)
}


/** Loads Ride names into UI */
export function loadDataInDropDown() {
    let ridelist: string[] = []

    rideDataArray.forEach(record => {
        ridelist.push(record[rideTableCol.RideName])
    })

    rideDataArray[rideTableCol.Excitement]

    viewModel.rideList.set(ridelist)
}

export function onRideDropDownChange() {
    callCalcAndUpdatePrices()
}

// TODO: This is VERY rough way to handle wrong user input
// Assigned: tygrysek90
export function onEINChange(textInput: string, which: einEnum) {
    console.log(`ein change ${textInput}, in ${einEnum[which]}`)
    if ( Number(textInput) >= 0 ) {
        einInputGuarded[which] = Number(textInput)
    }
    callCalcAndUpdatePrices()
}