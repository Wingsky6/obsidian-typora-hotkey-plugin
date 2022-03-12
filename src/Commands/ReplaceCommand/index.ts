import { Editor, Hotkey, MarkdownView, Command } from "obsidian";
import { replaceBase } from "./base";
import { replaceBaseByDelimiter } from "./replaceByDelimiter";

/*

 typora 快捷键   

 */
export const replaceExample = (): Command => {
    const title = 'replaceExample';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('<kbd>', '</kbd>', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Ctrl"],
        key: "T"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

export const replaceKBDs = (): Command => {
    const title = '根据+号添加或取消多个键盘格式';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBaseByDelimiter('<kbd>', '</kbd>', '+', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Alt"],
        key: "T"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}
export const replaceKBD = (): Command => {
    const title = '添加或取消键盘格式';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('<kbd>', '</kbd>', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl"],
        key: "T"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}
export const replaceRowCode = (): Command => {
    const title = '添加或取消行代码格式';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('`', '`', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Shift"],
        key: "`"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}


export const replaceComment = (): Command => {
    const title = '添加或取消评论';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('<!--', '-->', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl"],
        key: "M"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}


export const replaceBlockCode = (): Command => {
    const title = '添加或取消块代码';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('\n```\n', '\n```', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Shift"],
        key: "K"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

export const replaceRowLatexCode = (): Command => {
    const title = '添加或取消Latex行格式';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('$', '$', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Shift"],
        key: "4"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

export const replaceLatexCode = (): Command => {
    const title = '添加或取消Latex块格式';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('$$\n', '\n$$', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Shift", "Ctrl"],
        key: "M"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}






