'use strict';

const {ipcRenderer} = require('electron');
const {spellChecker} = require('./spellchecker');
// eslint-disable-next-line import/no-unassigned-import
require('./notification');

const logout = () => {
	// Create the menu for the below
	document.querySelector('.dropdown-toggle').click();

	const nodes = document.querySelectorAll('.dropdown-menu li:last-child a');
	nodes[nodes.length - 1].click();
};

const shortcut = () => {
	// Create the menu for the below
	const node = document.querySelector('a[data-overlay-trigger=keyboard-shortcuts]');
	// Additional check
	if (node.text.trim().toLowerCase() === 'keyboard shortcuts') {
		node.click();
	} else {
		// Atleast click the dropdown
		document.querySelector('.dropdown-toggle').click();
	}
};

process.once('loaded', () => {
	global.logout = logout;
	global.shortcut = shortcut;
});

// To prevent failing this script on linux we need to load it after the document loaded
document.addEventListener('DOMContentLoaded', () => {
	// Init spellchecker
	spellChecker();

	// redirect users to network troubleshooting page
	document.querySelector('.restart_get_events_button').addEventListener('click', () => {
		ipcRenderer.send('forward-message', 'reload-viewer');
	});
});
