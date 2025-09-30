import { onParkRideDropDownChange } from "./uiActions";
import { viewModel } from "./viewModel";

/**
 * A tool (pointer over the game map) for selecting a ride
 */

const tileSize = 32

/**
 * activates the ride selection tool
 */
export function activateTool(pressed: boolean): void {
        if (pressed) {
            if (!viewModel.isPressed.get()) viewModel.isPressed.set(true)
		    ui.activateTool({
              id: "rtpc-plugin.selector",
              cursor: "cross_hair",
              filter: ["ride"],
              onUp: (e: ToolEventArgs) => onToolUp(e),
              onFinish: () => closeTool()
		    });
        } else {
            closeTool()
        }
	}

/** Check if a ride is to be selected when tool is used */
function onToolUp(e: ToolEventArgs) {
    if (e.mapCoords != undefined && e.tileElementIndex != undefined) {
        // .mapCoords are 32 times multiple of actual tile number
        let element = map.getTile(e.mapCoords.x/tileSize, e.mapCoords.y/tileSize).getElement(e.tileElementIndex) as TrackElement //it can be Entrance as well
        let ride = map.getRide(element.ride)
        if (ride.classification == "ride") {
            for (let i = 0; i < viewModel.parkRideList.get().length; i++) {
                if (viewModel.parkRideList.get()[i] == ride.name) {
                    viewModel.parkRideSelected.set(i)
                    onParkRideDropDownChange()
                    closeTool()
                    break
                }
            }
        }
    }
}

/** Do relevant actions when closing the ride selecting tool */
export function closeTool(): void {
    if (ui.tool) ui.tool.cancel()
    viewModel.isPressed.set(false)
}