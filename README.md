# Developing a Firefox Extension #

The example is taken from [Robert Nyman](http://robertnyman.com/2009/01/24/how-to-develop-a-firefox-extension/). The goal is to write a simple extension that will show you an alert of the number of all links with a `target` attribute.

Extensions are different from plugins, which help the browser display specific content like playing multimedia files. Extensions are also different from search plugins, which plug additional search engines in the search bar.

## Setup ##

### Development profile ###

You need a working installation of [Firefox](http://www.mozilla.org/firefox/)

It is a good idea to create a development profile

	# on OSX
	$ /Applications/Firefox.app/Contents/MacOS/firefox -profilemanager

	# on Linux
	$ ./firefox -profilemanager

Choose `Create Profile` in the dialog and follow the steps.

### Configuration Settings ###

Open Firefox with your development profile. Enter `about:config` in the address bar.

These are the recommended settings. They enable extension errors in the Firefox Error Console (`Tools > Error Console`), disable XUL caching and such.

	javascript.options.showInConsole = true // was already set to true
	nglayout.debug.disable_xul_cache = true // had to create a new boolean value
	browser.dom.window.dump.enabled = true // had to create a new boolean value

### Extension Directory ###

#### Basic Directory Structure ####

Create the basic directory layout

	cd ~/Development/projects

	mdkir extension
	cd extension
	mkdir -p chrome/content
	touch chrome.manifest
	mkdir -p defaults/preferences
	touch install.rdf
	mkdir -p locale/en-US
	mkdir skin

#### install.rdf ####

	<?xml version="1.0"?>

	<RDF xmlns="http://www.w3.org/1999/02/22-RDF-syntax-ns#" xmlns:em="http://www.mozilla.org/2004/em-RDF#">

		<Description about="urn:mozilla:install-manifest">
			<em:id>linktargetfinder@robertnyman.com</em:id>

			<em:name>Link Target Finder</em:name>
			<em:version>1.0</em:version>
			<em:type>2</em:type>
			<em:creator>Robert Nyman</em:creator>

			<em:description>Finds links that have a target attribute</em:description>
			<em:homepageURL>http://www.robertnyman.com/</em:homepageURL>
			<em:optionsURL>chrome://linktargetfinder/content/options.xul</em:optionsURL>

			<em:targetApplication>

				<Description>
					<em:id>{ec8030f7-c20a-464f-9b0e-13a3a9e97384}</em:id>
					<em:minVersion>5.*</em:minVersion>
					<em:maxVersion>8.0</em:maxVersion>

				</Description>
			</em:targetApplication>
		</Description>
	</RDF>

**Explanation of tags**

In the `Description` node
- `em:id` Unique developer id, of your own choosing. Also used for pointing to this extension (see below)
- `em:name` Name of extension.
- `em:version` Current version of your extension.
- `em:type` The type declares that is an extension, as opposed to, for instance, a theme.
- `em:creator` Name of developer
- `em:description` Describes your extension functionality. Will be shown in the Tools > Add-ons window.
- `em:homepageURL` The URL of your extension’s web site.
- `em:optionsURL` The Chrome URL to where you will have your file for editing `options/preferences`.

In the `Description/em:targetApplication` node
- `em:id` Id of Firefox application
- `em:minVersion` Minimum version of Firefox required to run the extension. [Valid Application Versions](https://addons.mozilla.org/en-US/firefox/pages/appversions).
- `em:maxVersion`
	The maximum version of Firefox required to run the extension. [Valid Application Versions](https://addons.mozilla.org/en-US/firefox/pages/appversions).

##### Valid Application Versions #####

Taken from [here](https://addons.mozilla.org/en-US/firefox/pages/appversions)

- GUID: `{ec8030f7-c20a-464f-9b0e-13a3a9e97384}`
- Versions: `0.3`, `0.6`, `0.7`, `0.7+`, `0.8`, `0.8+`, `0.9`, `0.9.0+`, `0.9.1+`, `0.9.2+`, `0.9.3`, `0.9.3+`, `0.9.x`, `0.9+`, `0.10`, `0.10.1`, `0.10+`, `1.0`, `1.0.1`, `1.0.2`, `1.0.3`, `1.0.4`, `1.0.5`, `1.0.6`, `1.0.7`, `1.0.8`, `1.0+`, `1.4.0`, `1.4`, `1.4.1`, `1.5b1`, `1.5b2`, `1.5`, `1.5.0.4`, `1.5.0.*`, `2.0a1`, `2.0a2`, `2.0a3`, `2.0b1`, `2.0b2`, `2.0`, `2.0.0.4`, `2.0.0.8`, `2.0.0.*`, `3.0a1`, `3.0a2`, `3.0a3`, `3.0a4`, `3.0a5`, `3.0a6`, `3.0a7`, `3.0a8pre`, `3.0a8`, `3.0a9`, `3.0b1`, `3.0b2pre`, `3.0b2`, `3.0b3pre`, `3.0b3`, `3.0b4pre`, `3.0b4`, `3.0b5pre`, `3.0b5`, `3.0pre`, `3.0`, `3.0.9`, `3.0.11`, `3.0.12`, `3.0.*`, `3.1a1pre`, `3.1a1`, `3.1a2pre`, `3.1a2`, `3.1b1pre`, `3.1b1`, `3.1b2pre`, `3.1b2`, `3.1b3pre`, `3.1b3`, `3.5b4pre`, `3.5b4`, `3.5b5pre`, `3.5`, `3.5.*`, `3.6a1pre`, `3.6a1`, `3.6a2pre`, `3.6b1pre`, `3.6b2`, `3.6`, `3.6.4`, `3.6.*`, `3.7a1pre`, `3.7a1`, `3.7a2pre`, `3.7a2`, `3.7a3pre`, `3.7a3`, `3.7a4pre`, `3.7a4`, `3.7a5pre`, `3.7a5`, `3.7a6pre`, `4.0b1`, `4.0b2pre`, `4.0b2`, `4.0b3pre`, `4.0b3`, `4.0b4pre`, `4.0b4`, `4.0b5pre`, `4.0b5`, `4.0b6pre`, `4.0b6`, `4.0b7pre`, `4.0b7`, `4.0b8pre`, `4.0b8`, `4.0b9pre`, `4.0b9`, `4.0b10pre`, `4.0b10`, `4.0b11pre`, `4.0b11`, `4.0b12pre`, `4.0b12`, `4.0`, `4.0.*`, `4.2a1pre`, `5.0a2`, `5.0`, `5.*`, `6.0a1`, `6.0a2`, `6.0`, `6.*`, `7.0a1`, `7.0a2`, `7.0`, `7.*`, `8.0a1`, `8.0a2`, `8.0`, `8.*`, `9.0a1`, `9.0a2`, `9.0`, `9.*`, `10.0a1`

#### chrome.manifest ####

The chrome of Firefox is everything around the content window. i.e. web browser toolbar, menus, statusbar etc. `chrome.mainfest` is in conjunction with `install.rdf` the key to how your extension will be added to Firefox, and how it will work.

	content	linktargetfinder	chrome/content/
	content	linktargetfinder	chrome/content/	contentaccessible=yes
	overlay	chrome://browser/content/browser.xul	chrome://linktargetfinder/content/browser.xul

	locale	linktargetfinder	en-US	locale/en-US/

	skin	linktargetfinder	classic/1.0	skin/
	style	chrome://global/content/customizeToolbar.xul	chrome://linktargetfinder/skin/skin.css

For now we don't care about what the options mean. The interested can take a look at the [Chrome Manifest](https://developer.mozilla.org/en/Chrome_Manifest)

#### Pointing to development directory ####

Instead of keeping to reinstall new versions of your extension, you can point to the directory where you keep your extension project directory (which of course is under version control). The profiles are stored under

	## on OSX
	$ cd ~/Library/Application\ Support/Firefox/Profiles

	## on Linux
	$ cd ~/.mozilla/firefox

and will be named with letters and numbers, a dot (.) and finally followed by the profile name.

In this folder there is a folder called `extensions`. In it, create a file with a unique name for you (this will have to be the same as you chose for your `em:id` value in your install.rdf file).

In the case of the example, create a file named `linktargetfinder@robertnyman.com`, without any extension, and in it just point it to where you will have your code, e.g. `C:\extensions\` (Windows) or `~/Sites/linktargetfinder/` (Mac, Linux).

For example (your profile id and project directory might differ):

	## on OSX
	mkdir -p ~/Library/Application\ Support/Firefox/Profiles/ml3hqay8.development/extensions
	echo "~/Development/projects/firefox-extension" > ~/Library/Application\ Support/Firefox/Profiles/ml3hqay8.development/extensions/linktargetfinder@robertnyman.com

	## on Linux
	mkdir -p ~/.mozilla/firefox/ml3hqay8.development/extensions
	echo "~/Development/projects/firefox-extension" > ~/.mozilla/firefox/ml3hqay8.development/extensions/linktargetfinder@robertnyman.com

## Development ##

XUL stands for XML User Interface Language. It is developed by Mozilla to create interfaces in Firefox, Thunderbird etc.

	# override some of the default look of the web browser
	$ touch chrome/content/browser.xul

	# used for the options/preferences dialog for your extension, and its path is pointed out in the install.rdf file in the Description/em:optionsURL node
	$ touch chrome/content/options.xul

	# logic of the extension
	$ touch chrome/content/linkTargetFinder.js

### browser.xul ###

Override the look of the web browser, i.e. add a button to the toolbar, an item to the Tools menu and a statusbar icon. For a reference check [here](https://developer.mozilla.org/en/XUL_Reference).

	<?xml version="1.0"?>
	<?xml-stylesheet href="chrome://linktargetfinder/skin/skin.css" type="text/css"?>
	<!DOCTYPE linktargetfinder SYSTEM "chrome://linktargetfinder/locale/translations.dtd">
	<overlay id="sample" xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul">
			<script src="linkTargetFinder.js" />

			<menupopup id="menu_ToolsPopup">
				<menuitem label="&runlinktargetfinder;" key="link-target-finder-run-key" oncommand="linkTargetFinder.run()"/>
			</menupopup>

			<keyset>
				<key id="link-target-finder-run-key" modifiers="accel alt shift" key="L" oncommand="linkTargetFinder.run()"/>
			</keyset>

			<statusbar id="status-bar">
				<statusbarpanel id="link-target-finder-status-bar-icon" class="statusbarpanel-iconic" src="chrome://linktargetfinder/skin/status-bar.png" tooltiptext="&runlinktargetfinder;" onclick="linkTargetFinder.run()" />
			</statusbar>

			<toolbarpalette id="BrowserToolbarPalette">
				<toolbarbutton id="link-target-finder-toolbar-button" label="Link Target Finder" tooltiptext="&runlinktargetfinder;" oncommand="linkTargetFinder.run()"/>
			</toolbarpalette>
	</overlay>

#### Add a menu option ####

Adding a menu option to the Tools menu, and connect it to a keyboard shortcut:

	<menupopup id="menu_ToolsPopup">
		<menuitem label="&runlinktargetfinder;" key="link-target-finder-run-key" oncommand="linkTargetFinder.run()"/>
	</menupopup>

	<keyset>
		<key id="link-target-finder-run-key" modifiers="accel alt shift" key="L" oncommand="linkTargetFinder.run()"/>
	</keyset>

#### Add icon to statusbar ####

	<statusbar id="status-bar">
		<statusbarpanel id="link-target-finder-status-bar-icon" class="statusbarpanel-iconic" src="chrome://linktargetfinder/skin/status-bar.png" tooltiptext="&runlinktargetfinder;" onclick="linkTargetFinder.run()" />
	</statusbar>

#### Add a button to the toolbar ####

<toolbarpalette id="BrowserToolbarPalette">
	<toolbarbutton id="link-target-finder-toolbar-button" label="Link Target Finder" tooltiptext="&runlinktargetfinder;" oncommand="linkTargetFinder.run()"/>
</toolbarpalette>

Note that you need to go to View > Toolbars > Customise… to add your button to the visible toolbar.

### options.xul ###

Used for the options/preferences dialog for your extension, and its path is pointed out in the `install.rdf` file in the `Description/em:optionsURL` node

	<?xml version="1.0"?>
	<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>

	<prefwindow title="Link Target Finder Preferences" xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul">

		<prefpane label="Link Target Finder Preferences">
			<preferences>
				<preference id="link-target-finder-autorun" name="extensions.linktargetfinder.autorun" type="bool"/>
			</preferences>

			<groupbox>
				<caption label="Settings"/>
				<grid>
					<columns>
						<column flex="4"/>
						<column flex="1"/>
					</columns>
					<rows>
						<row>
							<label control="autorun" value="Autorun"/>
							<checkbox id="autorun" preference="link-target-finder-autorun"/>
						</row>
					</rows>
				</grid>
			</groupbox>

		</prefpane>

	</prefwindow>

### linkTargetFinder.js ###

When the window loads, it runs the init method of the `linkTargetFinder` object. If the preference autorun is set to true, it calls its run method immediately. Otherwise, it will only be called when the toolbar button, menu item or statusbar icon is clicked. This happens through the `oncommand` attribute on the elements in the `browser.xul` file.

The code in the run method is pretty straight-forward. It adds a CSS file from the extensions chrome folder to the current document, finds all links in it, loops through them and checks if they have a target attribute, counts those, highlights them and alerts you with the number of hits.

As you can see, there’s a pointer in the code to something called gBrowser. That is how to get a reference to the current web browser, and you could also use `getBrowser()` as well. Note that this sort of code is only available from within the XUL context of the web browser. More information and options can be found in [Tabbed Browser](https://developer.mozilla.org/en/Code_snippets/Tabbed_browser).

	var linkTargetFinder = function () {
		var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		return {
			init : function () {
				gBrowser.addEventListener("load", function () {
					var autoRun = prefManager.getBoolPref("extensions.linktargetfinder.autorun");
					if (autoRun) {
						linkTargetFinder.run();
					}
				}, false);
			},

			run : function () {
				var head = content.document.getElementsByTagName("head")[0],
					style = content.document.getElementById("link-target-finder-style"),
					allLinks = content.document.getElementsByTagName("a"),
					foundLinks = 0;

				if (!style) {
					style = content.document.createElement("link");
					style.id = "link-target-finder-style";
					style.type = "text/css";
					style.rel = "stylesheet";
					style.href = "chrome://linktargetfinder/skin/skin.css";
					head.appendChild(style);
				}

				for (var i=0, il=allLinks.length; i<il; i++) {
					elm = allLinks[i];
					if (elm.getAttribute("target")) {
						elm.className += ((elm.className.length > 0)? " " : "") + "link-target-finder-selected";
						foundLinks++;
					}
				}
				if (foundLinks === 0) {
					alert("No links found with a target attribute");
				}
				else {
					alert("Found " + foundLinks + " links with a target attribute");
				}
			}
		};
	}();
	window.addEventListener("load", linkTargetFinder.init, false);

The only unusual part for a JavaScript is the variable prefManager, which connects to Firefox preference manager, and later gets the autorun preference with the help of this code:

	var autoRun = prefManager.getBoolPref("extensions.linktargetfinder.autorun");

The three types of extension preferences are `string`, `integer` and `boolean`, and the six methods to work with them are:

- `getBoolPref()`
- `setBoolPref()`
- `getCharPref()`
- `setCharPref()`
- `getIntPref()`
- `setIntPref()`

### defaults directory ###

Default preferences for the extension

	$ touch defaults/pref.js
	$ echo 'pref("extensions.linktargetfinder.autorun", false);' > defaults/pref.js

### locale directory ###

Used for localisation. On child directory for each language. In this case we only have on `en-US`. Each language directory contains a `translations.dtd` file.

For example `&runlinktargetfinder;` in the `browser.xul` gets the translation in such a file.

	$ touch locale/en-US/translations.dtd
	echo '<!ENTITY runlinktargetfinder "Run Link Target Finder">' > locale/en-US/translations.dtd

### skin directory ###

You can style the buttons and other various aspects of your extension.

	$ touch skin/skin.css
	#link-target-finder-toolbar-button {
		list-style-image: url("chrome://linktargetfinder/skin/toolbar-large.png");
	}

	#link-target-finder-status-bar-icon {
		width: 83px;
		margin: 0 5px;
	}

	.link-target-finder-selected {
		outline: 2px solid red !important;
	}

You can pack used graphics in this directory. The example includes `status-bar.png` and `toolbar-large.png.` next to the `skin.css` file.

## Packaging ##

On OSX
	
	cd ~/Development/projects/firefox-extension
	zip -r LinkTargetFinder.xpi *

On Linux

	cd ~/Development/projects/firefox-extension
	

## Tips & Tricks ##

- You can open the error console by pressing `Shift+Command+J`

## Problems ##

### Errors when reading install.rdf ###

During development weird eror messages popped up, when Firefox tried to read the install.rdf

	Error: 
	Source File: jar:file:///Users/Oliver/Development/projects/personal/firefox-extension/LinkTargetFinder.xpi!/install.rdf
	Line: 4, Column: 53
	Source Code:
	     xmlns:em="http://www.mozilla.org/2004/em-RDF#">

and

		Warning: WARN addons.xpi: Invalid XPI: Error: No ID in install manifest
		Source File: resource:///modules/XPIProvider.jsm
		Line: 647

An empty error message wasn't very helpful. Indeed the error was very subtle. 

I had written

	<RDF xmlns="http://www.w3.org/1999/02/22-RDF-syntax-ns#"
	     xmlns:em="http://www.mozilla.org/2004/em-RDF#">
		<Description about="urn:mozilla:install-manifest">

as the root element, but it needs to be all lowercase

	<RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	     xmlns:em="http://www.mozilla.org/2004/em-rdf#">
		<Description about="urn:mozilla:install-manifest">