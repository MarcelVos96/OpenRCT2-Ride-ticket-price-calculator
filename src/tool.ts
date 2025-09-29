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

		//console.log(`Tool: activated.`);
	}

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
            // create a call to function in actions.ts here, that can accept some of these arguments shown below, 
            // then comment out the line console.log line 
            console.log(`found ride:  id (within park) ${element.ride}, named: ${ride.name} \n internal type id ${ride.type}, EIN: ${ride.excitement/100}, ${ride.intensity/100}, ${ride.nausea/100}`)
        }
    }
}

export function closeTool(): void {
    if (ui.tool) ui.tool.cancel()
    viewModel.isPressed.set(false)
}