import { store } from "openrct2-flexui";
import { errorColorCode } from "./commonTypes";

export const viewDefaults = {
    einLabels: [
        "Excitement rating:",
        "Intensity rating:",
        "Nausea rating:"
    ],

    pricesTable: [
        ["0-5 months","+30", context.formatString("{CURRENCY2DP}", "0")],	
        ["5-13 months", "+10", context.formatString("{CURRENCY2DP}", "0")],	
        ["13-40 months", "×1.00", context.formatString("{CURRENCY2DP}", "0")],	
        ["40-64 months", "×0.75", context.formatString("{CURRENCY2DP}", "0")],	
        ["64-88 months", "×0.56", context.formatString("{CURRENCY2DP}", "0")]	,
        ["88-104 months", "×0.42", context.formatString("{CURRENCY2DP}", "0")], 	
        ["104-120 months", "×0.32", context.formatString("{CURRENCY2DP}", "0")],	
        ["120-128 months", "×0.16", context.formatString("{CURRENCY2DP}", "0")],	
        ["128-200 months", "×0.08", context.formatString("{CURRENCY2DP}", "0")],	
        ["200+ months", "×0.56", context.formatString("{CURRENCY2DP}", "0")]
    ],

    pricesTableErrorPrice: `${errorColorCode}?` 
}

export const viewModel = {
    rideList: store<string[]>(["error", "data", "not", "loaded"]),
    parkRideList: store<string[]>(["error", "data", "not", "loaded"]),
    rideSelected: store<number>(0),
    parkRideSelected: store<number>(0),

    einLabels: [
        store<string>(viewDefaults.einLabels[0].slice()),
        store<string>(viewDefaults.einLabels[1].slice()),
        store<string>(viewDefaults.einLabels[2].slice())
    ],

    multipleCheck: store<boolean>(false),
    entranceFeeCheck: store<boolean>(false),

    pricesTable: store<string[][]>(viewDefaults.pricesTable.slice()),
}