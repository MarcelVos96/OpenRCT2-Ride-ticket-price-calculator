import { loadDataInDropDown, loadParkRidesInDropDown } from "./uiActions";
import { mainWindow } from "./mainWindow";
import { pluginName } from "./pluginName";
import { callCalcAndUpdatePrices } from "./uiActions";
import { activateTool } from "./tool";

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
	bindings: ["CTRL+SHIFT+E"],
	callback() {
		onPluginGUIopen()		
		activateTool()
	}
}

function onPluginGUIopen()
{
	loadDataInDropDown()
	loadParkRidesInDropDown()
	mainWindow.open()
	callCalcAndUpdatePrices()
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
}