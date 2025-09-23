import { store } from "openrct2-flexui";
import { errorColorCode } from "./commonTypes";

export const viewDefaults = {
    einLabels: [
        "Excitement rating:",
        "Intensity rating:",
        "Nausea rating:"
    ],

    pricesTableErrorPrice: `${errorColorCode}?` 
}

export const viewModel = {
    rideList: store<string[]>(["error", "data", "not", "loaded"]),
    rideSelected: store<number>(0),

    einLabels: [
        store<string>(viewDefaults.einLabels[0].slice()),
        store<string>(viewDefaults.einLabels[1].slice()),
        store<string>(viewDefaults.einLabels[2].slice())
    ],

    multipleCheck: store<boolean>(false),
    entranceFeeCheck: store<boolean>(false),

    pricesTable: store<string[][]>([
                ["0-5 months","+30", ""],	
                ["5-13 months", "+10", ""],	
                ["13-40 months", "×1.00", ""],	
                ["40-64 months", "×0.75", ""],	
                ["64-88 months", "×0.56", ""]	,
                ["88-104 months", "×0.42", ""], 	
                ["104-120 months", "×0.32", ""],	
                ["120-128 months", "×0.16", ""],	
                ["128-200 months", "×0.08", ""],	
                ["200+ months", "×0.56", ""]
            ]),

}