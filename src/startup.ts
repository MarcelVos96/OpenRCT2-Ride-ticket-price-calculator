import { loadDataInDropDown } from "./uiActions";
import { mainWindow } from "./mainWindow";
import { pluginName } from "./pluginName";

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


function onPluginGUIopen()
{
	loadDataInDropDown()
	mainWindow.open()
}


export function startup()
{
	// Write code here that should happen on startup of the plugin.
	ui.registerShortcut(shortcutOpenWindow)


	// Register a menu item under the map icon:
	if (typeof ui !== "undefined")
	{
		ui.registerMenuItem(pluginName, () => onPluginGUIopen());
	}
}