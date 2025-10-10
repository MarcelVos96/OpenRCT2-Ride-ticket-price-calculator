import { checkbox, Colour, dropdown, groupbox, horizontal, label, listview, textbox, toggle, twoway, vertical, window } from "openrct2-flexui";
import { viewModel } from "./viewModel";
import { einEnum } from "./commonTypes";
import { onEINChange, onParkRideDropDownChange, onRideDropDownChange, onCheckboxChange } from "./uiActions";
import { activateTool, closeTool } from "./tool";

/**
 * User interface shape definition
 */

const windowColour = Colour.DarkBrown
const leftColumnWidth = 110
export var windowOpen: boolean = false


export const mainWindow = window({
    title: "Ride ticket price calculator (v0.1.1)",
    width: 300,
    height: 380,
    colours: [windowColour, windowColour],
    onOpen: () => windowOpen = true,
    onClose: () => closeWindow(),
    content: [
        // RIDE SELECTER
        horizontal([
            vertical({
                width: leftColumnWidth,
                content: [
                    label({
                        text: "Select ride in park:"
                    }),
                    label({
                        text: "Ride age:"
                    })
                ]
            }),
            vertical({
                content: [
                    dropdown({
                        items: viewModel.parkRideList,
                        onChange: () => onParkRideDropDownChange(),
                        selectedIndex: twoway(viewModel.parkRideSelected),
                    }),
                    label({
                        text: viewModel.rideAge
                    })
                ]
            }),
            vertical({
                content: [
                    toggle({
					    width: 24, height: 24,
					    tooltip: "Use the picker to select a ride by clicking it",
					    image: "eyedropper", // SPR_G2_EYEDROPPER
                        isPressed: twoway(viewModel.isPressed),
					    onChange: pressed => activateTool(pressed)
				    })
                ]
            })
        ]),
        horizontal({
            content: [
                checkbox({
                    text: "Automatically update ride stats",
                    isChecked: twoway(viewModel.autoUpdate),
                }),
            ]
        }),
        
        // RIDE TYPE
        horizontal({
            padding: {top: 16},
            content: [
                label({
                    width: leftColumnWidth,
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
                    width: leftColumnWidth,
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
                    width: leftColumnWidth,
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
                    width: leftColumnWidth,
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
            scrollbars: "none"
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

function closeWindow() {
    closeTool()
    windowOpen = false
}