import { store } from "openrct2-flexui";

export const viewModel = {
    rideList: store<string[]>(["error", "data", "not", "loaded"]),
    rideSelected: store<number>(0),

    excitementInput: store<string>("0.00"),
    intensityInput: store<string>("0.00"),
    nauseaInput: store<string>("0.00"),

    multipleCheck: store<boolean>(false),
    entranceFeeCheck: store<boolean>(false),

    pricesTable: store<string[][]>([
                ["0-5 months","+30", "fx"],	
                ["5-13 months", "+10", "fx"],	
                ["13-40 months", "×1.00", "fx"],	
                ["40-64 months", "×0.75", "fx"],	
                ["64-88 months", "×0.56", "fx"]	,
                ["88-104 months", "×0.42", "fx"], 	
                ["104-120 months", "×0.32", "fx"],	
                ["120-128 months", "×0.16", "fx"],	
                ["128-200 months", "×0.08", "fx"],	
                ["200+ months", "×0.56", "fx"]
            ]),

}