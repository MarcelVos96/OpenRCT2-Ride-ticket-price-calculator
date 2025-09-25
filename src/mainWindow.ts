import { checkbox, Colour, dropdown, groupbox, horizontal, label, listview, textbox, twoway, vertical, window } from "openrct2-flexui";
import { viewModel } from "./viewModel";
import { einEnum } from "./commonTypes";
import { onEINChange, onParkRideDropDownChange, onRideDropDownChange, onCheckboxChange } from "./uiActions";

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
    height: 370,
    colours: [windowColour, windowColour],
    content: [
        // SELECT RIDE IN PARK
        horizontal({
            content: [
                label({
                    text: "Select ride in park:"
                }),
                dropdown({
                    items: viewModel.parkRideList,
                    onChange: () => onParkRideDropDownChange(),
                    selectedIndex: twoway(viewModel.parkRideSelected)
                })
            ]
        }),
        horizontal({
            content: [
                label({
                    text: "Ride age:"
                }),
                label({
                    text: viewModel.rideAge
                })
            ]
        }),
        // RIDE TYPE
        horizontal({
            padding: {top: 16},
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
            content: [
                label({
                    text: viewModel.einLabels[einEnum.excitement]
                }),
                textbox({
                    text: viewModel.einRatings[einEnum.excitement],
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
                    text: viewModel.einRatings[einEnum.intensity],
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
                    text: viewModel.einRatings[einEnum.nausea],
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
                    text: "Multiple of this ride type in the park",
                    isChecked: twoway(viewModel.multipleCheck),
                    onChange: () => onCheckboxChange()
                }),
                checkbox({
                    text: "Charge for the park entrance",
                    isChecked: twoway(viewModel.entranceFeeCheck),
                    onChange: () => onCheckboxChange()
                })
            ]
        }), 
        // PRICE LIST
        listview({
            columns: [{header: "Ride age", ratioWidth: 5}, {header: "Age value", ratioWidth: 3}, {header: "Max ticket price", ratioWidth: 4}],
            items: viewModel.pricesTable,
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