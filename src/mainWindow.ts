import { Colour, label, window } from "openrct2-flexui";

export const mainWindow = window({
    title: "Ride ticket price calculator",
    width: 400,
    height: 400,
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        label({
            text: "here will be contents"
        })
    ]
})