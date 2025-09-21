import { mainWindow } from "./mainWindow";
import { pluginName } from "./plugin";

function onClickMenuItem()
{
	// Write code here that should happen when the player clicks the menu item under the map icon.

	mainWindow.open()
}


export function startup()
{
	// Write code here that should happen on startup of the plugin.



	// Register a menu item under the map icon:
	if (typeof ui !== "undefined")
	{
		ui.registerMenuItem(pluginName, () => onClickMenuItem());
	}
}