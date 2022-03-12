import { App, Editor, Hotkey, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import a from 'src/command';
import { replace2 } from 'src/Commands/replace1Cmd';
import { replaceBlockCode, replaceComment, replaceKBD, replaceLatexCode, replaceRowCode, replaceRowLatexCode } from 'src/Commands/ReplaceCommand';
import { addH1, addH2, addH3, addH4, addH5, addH6 } from 'src/Commands/TitleCommand';
import { Methods } from 'src/Modals/batchEditModal';
import { DEFAULT_SETTINGS, Settings } from 'src/setting';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

export default class MyPlugin extends Plugin {
	public settings: Settings;
	public editor_handler: Editor;

	async onload() {

		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new Methods(this.app).e();
			}
		});
		this.addCommand({
			id: 'open-sample-modal-simple2',
			name: 'Open sample modal (simple)22222',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// this.app
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {

				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});

		const hotkey: Hotkey = {
			modifiers: ["Ctrl"],
			key: "T"
		}
		// const 
		this.addCommand({
			id: 'replace2',
			name: 'replace2',
			editorCallback: replace2,
			hotkeys: [hotkey],
		});
		this.addCommand({
			id: 'image-obsidian-typora',
			name: '单链转双链',
			editorCallback: a,
		})
		this.addCommand(replaceKBD())
		this.addCommand(replaceRowCode())
		this.addCommand(replaceComment())
		this.addCommand(replaceBlockCode())
		this.addCommand(replaceRowLatexCode())
		this.addCommand(replaceLatexCode())
		this.addCommand(addH1())
		this.addCommand(addH2())
		this.addCommand(addH3())
		this.addCommand(addH4())
		this.addCommand(addH5())
		this.addCommand(addH6())
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			// console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign(
			{}, DEFAULT_SETTINGS,
			await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}
	onOpen() {
		// this.app.vault.read()

	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

/// 设置
class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		// const { containerEl } = this;

		// containerEl.empty();

		// containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

		// new Setting(containerEl)
		// 	.setName('Setting #1')
		// 	.setDesc('md(img)转')
		// 	.addText(text => text
		// 		.setPlaceholder('Enter your secret')
		// 		.setValue(this.plugin.settings.templates_folder)
		// 		.onChange(async (value) => {
		// 			console.log('Secret: ' + value);
		// 			this.plugin.settings.templates_folder = value;
		// 			await this.plugin.saveSettings();
		// 		}));
	}
}
