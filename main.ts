import { App, Editor, Hotkey, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import a from 'src/command';
import { ConvertMdImgToObImg, ConvertObImgToMdImg } from 'src/Commands/ImageCommand';
import { orderList, unOrderList } from 'src/Commands/ListCommand';
import { replace2 } from 'src/Commands/replace1Cmd';
import { replaceBlockCode, replaceComment, replaceKBD, replaceKBDs, replaceLatexCode, replaceRowCode, replaceRowLatexCode } from 'src/Commands/ReplaceCommand';
import { addDeleteEffet, addQuoteEffect, addTiltEffect } from 'src/Commands/TextCommand';
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
		// await this.loadSettings();
		this.addCommand({
			id: 'replace2',
			name: 'replace2',
			editorCallback: replace2,
		});
		this.addCommand({
			id: 'image-obsidian-typora',
			name: '单链转双链',
			editorCallback: a,
		})
		this.addCommand(replaceKBD())
		this.addCommand(replaceKBDs())
		this.addCommand(replaceRowCode())
		this.addCommand(replaceComment())
		this.addCommand(replaceBlockCode())
		this.addCommand(replaceRowLatexCode())
		this.addCommand(replaceLatexCode())
		this.addCommand(addTiltEffect())
		this.addCommand(addDeleteEffet())
		this.addCommand(addQuoteEffect())
		this.addCommand(addH1())
		this.addCommand(addH2())
		this.addCommand(addH3())
		this.addCommand(addH4())
		this.addCommand(addH5())
		this.addCommand(addH6())

		this.addCommand(orderList())
		this.addCommand(unOrderList())
		this.addCommand(ConvertObImgToMdImg())
		this.addCommand(ConvertMdImgToObImg())
		this.addStatusBarItem();
		new Notice("Journey Re-Loaded!");
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
