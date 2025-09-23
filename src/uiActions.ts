import { calculateRidePrices } from "./calcFunctions";
import { viewDefaults, viewModel } from "./viewModel";
import { einEnum, errorColorCode } from "./commonTypes";
import { rideDataArray, rideTableCol } from "./rideData";

/**
 * User interface actions
 */


/** EIN input fields converted to numbers, since GUI input is "text" field - gives string, e.g. "chicken" or "1.0"*/
var einInputGuarded: [number, number, number] = [0,0,0]

/** determines wheter EIN input fields contain only valid input */
const einInputClean: [boolean, boolean, boolean] = [true, true, true]
var isEinInputClean: [boolean, boolean, boolean] = [true, true, true]

/**
 * Checks if user input is valid (EIN values are numbers)
 * @returns true if all EIN input fields are numbers
 */
function isEinInputValid(): boolean {
    if (isEinInputClean[0] == einInputClean[0] && isEinInputClean[1] == einInputClean[1] && isEinInputClean[2] == einInputClean[2]) {
    return true
    }
    else {
    return false
    }
}

/** Passes argument to calculating part, updates price list in UI */
export function callCalcAndUpdatePrices() {
    let newPrices = calculateRidePrices(viewModel.rideSelected.get(),
        einInputGuarded[einEnum.excitement], einInputGuarded[einEnum.intensity], einInputGuarded[einEnum.nausea],
        viewModel.multipleCheck.get(), viewModel.entranceFeeCheck.get())
    
    let newPriceTable = viewDefaults.pricesTable.slice()
    
    for (let i = 0; i < 10; i++) {
        newPriceTable[i][2] = context.formatString("{CURRENCY2DP}", newPrices[i])
    }

    viewModel.pricesTable.set(newPriceTable)
}

/** In case the input is wrong, show error in the prices table */
function showErrorInPricesTable(){
    let newPriceTable = viewDefaults.pricesTable.slice()

    for (let i = 0; i < 10; i++) {
        newPriceTable[i][2] = viewDefaults.pricesTableErrorPrice
    }

    viewModel.pricesTable.set(newPriceTable)

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
    if (isEinInputValid()) {
        callCalcAndUpdatePrices()
    }
}

// TODO: This is VERY rough way to handle wrong user input
// Assigned: tygrysek90
export function onEINChange(textInput: string, which: einEnum) {
    console.log(`ein change ${textInput}, in ${einEnum[which]}`)
    if ( Number(textInput) >= 0 ) {
        einInputGuarded[which] = Number(textInput)
        viewModel.einLabels[which].set(viewDefaults.einLabels[which])
        isEinInputClean[which] = true
        console.log(isEinInputClean, einInputClean)
        if (isEinInputValid()) {
            callCalcAndUpdatePrices()
        }
    }
    else {
        viewModel.einLabels[which].set(errorColorCode+viewDefaults.einLabels[which])
        isEinInputClean[which] = false
        showErrorInPricesTable()

    }

}

export function onCheckboxChange() {
    callCalcAndUpdatePrices()
}