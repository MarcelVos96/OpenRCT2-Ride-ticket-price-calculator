import { loadDataInDropDown, loadParkRidesInDropDown, onParkRideDropDownChange} from "./uiActions";
import { mainWindow } from "./mainWindow";
import { pluginName } from "./pluginName";
import { callCalcAndUpdatePrices, resetStats } from "./uiActions";
import { activateTool } from "./tool";
import { ridesInPark } from "./rideList";
import { viewModel, } from "./viewModel";

/**
 * Starting point
 */


/** Some nice shortcut, for fast window opening, very feastible for development */
const shortcutOpenWindow: ShortcutDesc = {
	id: "ride-ticket-price-calculator.open",
	text: pluginName,
	bindings: ["ALT+E"],
	callback() {
		onPluginGUIopen()		
	}
}

const shortcutOpenWindowAndTool: ShortcutDesc = {
	id: "ride-ticket-price-calculator.tool-open",
	text: pluginName,
	bindings: ["ALT+E"],
	callback() {
		onPluginGUIopen()		
		activateTool(true)
	}
}

function onPluginGUIopen() {
	loadDataInDropDown()
	loadParkRidesInDropDown()
	mainWindow.open()
	// Check if previously selected ride still exists and select it if it does
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
	if (ridesInPark.length > 0 && viewModel.parkRideSelected.get() > 0) {
		console.log("Park ride selected:", viewModel.parkRideSelected.get())
		onParkRideDropDownChange()
	} else {
		resetStats()
		callCalcAndUpdatePrices()
	}
}

export function startup()
{
	// Write code here that should happen on startup of the plugin.
	ui.registerShortcut(shortcutOpenWindow)
	ui.registerShortcut(shortcutOpenWindowAndTool)

	// Register a menu item under the map icon:
	if (typeof ui !== "undefined")
	{
		ui.registerMenuItem(pluginName, () => onPluginGUIopen());
	}
	context.setInterval(
		function() {
			if (viewModel.autoUpdate.get()) onParkRideDropDownChange();
		}, 500
	);
}