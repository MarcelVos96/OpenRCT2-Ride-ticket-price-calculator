import { checkbox, Colour, dropdown, groupbox, horizontal, label, listview, textbox, twoway, vertical, window } from "openrct2-flexui";
import { viewModel } from "./viewModel";
import { einEnum } from "./commonTypes";
import { onEINChange, onRideDropDownChange } from "./uiActions";

/**
 * User interface shape definition
 */


const windowColour = Colour.DarkBrown

export const mainWindow = window({
    title: "Ride ticket price calculator",
    // this can be of variable size in one or both axis-es
    //width: {min: 300, value: 300, max: 10000},
    //height: {min: 250, value: 250, max: 10000},
    width: 300,
    height: 350,
    colours: [windowColour, windowColour],
    content: [
        // RIDE TYPE
        horizontal({
            content: [
                label({
                    text: "Ride type:"
                }),
                dropdown({
                    items: viewModel.rideList,
                    onChange: () => onRideDropDownChange(),
                    selectedIndex: twoway(viewModel.rideSelected)
                })
            ]
        }),
        // EIN BLOCK START
        horizontal({
            padding: {top: 16},
            content: [
                label({
                    text: viewModel.einLabels[einEnum.excitement]
                }),
                textbox({
                    text: "0.00",
                    onChange: (text: string) => onEINChange(text, einEnum.excitement)
                })
            ]
        }),
        horizontal({
            content: [
                label({
                    text: viewModel.einLabels[einEnum.intensity]
                }),
                textbox({
                    text: "0.00",
                    onChange: (text: string) => onEINChange(text, einEnum.intensity)
                })
            ]
        }),
        horizontal({
            content: [
                label({
                    text: viewModel.einLabels[einEnum.nausea]
                }),
                textbox({
                    text: "0.00",
                    onChange: (text: string) => onEINChange(text, einEnum.nausea)
                })
            ]
        }),
        // EIN BLOCK END
        // CHECKBOXES 
        vertical({
            padding: {top: 16},
            content: [
                checkbox({
                    text: "multiple of this ride type in the park",
                    isChecked: twoway(viewModel.multipleCheck)
                }),
                checkbox({
                    text: "charge for the park entrance",
                    isChecked: twoway(viewModel.entranceFeeCheck)
                })
            ]
        }), 
        // PRICE LIST
        listview({
            columns: ["Ride age", "Age value", "Maximum ticket price"],
            items: viewModel.pricesTable
        }),
        // ABOUT BOX
        groupbox({
            content: [
                label({
                    height: 10,
                    padding: {top: -4},
                    alignment: "centred",
                    disabled: true,
                    text: "Marcel Vos & tygrysek90 (c) 2025"
                })
            ]
        })
    ]
})