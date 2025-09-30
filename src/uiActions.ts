import { calculateRidePrices } from "./calcFunctions";
import { viewDefaults, viewModel } from "./viewModel";
import { einEnum, errorColorCode } from "./commonTypes";
import { rideDataArray, rideTableCol, rideAgeArray, ageTableCol } from "./rideData";
import { getRideListNames, ridesInPark, ridesInParkCol } from "./rideList";

/**
 * User interface actions
 *  * @param inParkRideId id of ride *within park*
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
        newPriceTable[i][2] = `{BLACK}${context.formatString("{CURRENCY2DP}", + newPrices[i])}`
        if (viewModel.rideAge.get() === "-") continue
        if (i == 9 && Number(String(viewModel.rideAge.get().split(" ")[0])) >= rideAgeArray[i][ageTableCol.Age]) {
            newPriceTable[i][2] = `{PEARLAQUA}${context.formatString("{CURRENCY2DP}", + newPrices[i])}`
            break;
        }
        if (Number(String(viewModel.rideAge.get().split(" ")[0])) >= rideAgeArray[i][ageTableCol.Age] && 
            Number(String(viewModel.rideAge.get().split(" ")[0])) < rideAgeArray[i+1][ageTableCol.Age]) {
                newPriceTable[i][2] = `{PEARLAQUA}${context.formatString("{CURRENCY2DP}", + newPrices[i])}`
        }
        
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


/** Loads ride types into UI */
export function loadDataInDropDown() {
    let rideList: string[] = []
    rideDataArray.forEach(record => {
        rideList.push(record[rideTableCol.RideName])
    })

    rideDataArray[rideTableCol.Excitement]

    viewModel.rideList.set(rideList)
}

/** Loads the rides in the park into UI */
export function loadParkRidesInDropDown() {
    let parkRideList: string[] = getRideListNames()
    viewModel.parkRideList.set(parkRideList)
    for (let i = 0; i < viewModel.parkRideList.get().length; i++) {
		if(viewModel.parkRideList.get()[i] == viewModel.rideName.get()) {
			viewModel.parkRideSelected.set(i)
			break;
		}
		if (i == viewModel.parkRideList.get().length - 1) {
			viewModel.parkRideSelected.set(0)
			viewModel.rideSelected.set(0)
		}
	}
}

/** Updates stats after selecting a ride in the park */
export function onParkRideDropDownChange() {
    if (viewModel.parkRideList.get()[viewModel.parkRideSelected.get()] === "Pick a ride                        ") {
        viewModel.rideName.set("Pick a ride                        ")
        viewModel.rideAge.set("-")
        callCalcAndUpdatePrices()
        return
    }
    let rideID: number = 0
    let rideType: number = 0
    viewModel.rideName.set(viewModel.parkRideList.get()[viewModel.parkRideSelected.get()])
    for (let i = 0; i < ridesInPark.length; i++) {
        if (ridesInPark[i][ridesInParkCol.rideName] === viewModel.rideName.get()) {
            rideID = ridesInPark[i][ridesInParkCol.inParkId]
            rideType = ridesInPark[i][ridesInParkCol.rideType]
            break
        }
    }
    for (let i = 0; i < rideDataArray.length; i++) {
        if (rideDataArray[i][rideTableCol.RideType] == rideType) {
            viewModel.rideSelected.set(i)
            break;
        }
    }
    for (let i = 0; i < ridesInPark.length; i++) {
        if (ridesInPark[i][ridesInParkCol.rideName] === viewModel.rideName.get()) continue
        if (ridesInPark[i][ridesInParkCol.rideType] == rideType && map.getRide(ridesInPark[i][ridesInParkCol.inParkId]).status === "open") {
            viewModel.multipleCheck.set(true);
            break;
        }
        viewModel.multipleCheck.set(false);
    }
    if (park.entranceFee == 0) {
        viewModel.entranceFeeCheck.set(false)
    } else {
        viewModel.entranceFeeCheck.set(true)
    }
    
    getEin(rideID)
    if (isEinInputValid()) {
        callCalcAndUpdatePrices()
    }
}

/** Correctly formats numbers in the x.xx format */
function addZeroes(statValue: string): string {
    if (statValue.length < 4) {
        if (statValue.length < 3) {
            statValue += ".0"
        }
        statValue += "0"
    }
    return statValue
}

/** Retrieves the EIN stats and age of the selected ride */
function getEin(inParkRideId: number) {
    let ride = map.getRide(inParkRideId);
    let rideAgeS: string = ride.age == 1 ? "" : "s"
    if (ride != null) {
        viewModel.rideAge.set(String(ride.age) + " month" + rideAgeS)
        if (ride.excitement < 0) {
            viewModel.einRatings[einEnum.excitement].set("Not calculated yet")
            viewModel.einRatings[einEnum.intensity].set("Not calculated yet")
            viewModel.einRatings[einEnum.nausea].set("Not calculated yet")
            onEINChange(viewModel.einRatings[einEnum.excitement].get(), einEnum.excitement)
            onEINChange(viewModel.einRatings[einEnum.intensity].get(), einEnum.intensity)
            onEINChange(viewModel.einRatings[einEnum.nausea].get(), einEnum.nausea)
        } else {
            viewModel.einRatings[einEnum['excitement']].set(addZeroes(String(ride.excitement/100)))
            viewModel.einRatings[einEnum['intensity']].set(addZeroes(String(ride.intensity/100)))
            viewModel.einRatings[einEnum['nausea']].set(addZeroes(String(ride.nausea/100)))
            onEINChange(viewModel.einRatings[einEnum.excitement].get(), einEnum.excitement)
            onEINChange(viewModel.einRatings[einEnum.intensity].get(), einEnum.intensity)
            onEINChange(viewModel.einRatings[einEnum.nausea].get(), einEnum.nausea)
        }
    }
}

/** Calls to update prices after a different ride type is selected */
export function onRideDropDownChange() {
    if (isEinInputValid()) {
        callCalcAndUpdatePrices()
    }
}

/** Checks if EIN input is valid and calls for price calculation */
export function onEINChange(textInput: string, which: einEnum) {
    if ( Number(textInput) >= 0 ) {
        einInputGuarded[which] = Number(textInput) * 100
        viewModel.einLabels[which].set(viewDefaults.einLabels[which])
        isEinInputClean[which] = true
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

/** Calls for price recalculation when a checkbox changes */
export function onCheckboxChange() {
    callCalcAndUpdatePrices()
}

/**Resets all the input */
export function resetStats() {
    viewModel.rideSelected.set(0)
    viewModel.parkRideSelected.set(0)
    viewModel.rideAge.set("-")
    callCalcAndUpdatePrices()
    viewModel.rideName.set("")
    viewModel.einRatings[einEnum['excitement']].set("0.00")
    viewModel.einRatings[einEnum['intensity']].set("0.00")
    viewModel.einRatings[einEnum['nausea']].set("0.00")
    viewModel.multipleCheck.set(false)
    viewModel.entranceFeeCheck.set(false)
    einInputGuarded = [0, 0, 0]
}