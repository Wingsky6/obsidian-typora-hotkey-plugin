import { Editor, Hotkey, MarkdownView, Command } from "obsidian";
import { replaceBase } from "../Common/replaceBase";
import { handleWithRepeatStrs } from "../ReplaceCommand/replaceByDelimiter";

/*  
1. 删除线 
2. 倾斜线
3. 引用效果

 */
// 添加删除线
export const addDeleteEffet = (): Command => {
    const title = '删除线';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('~~', '~~', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Alt"],
        key: "5"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}
// 添加倾斜效果
export const addTiltEffect = (): Command => {
    const title = '倾斜';
    const command = (editor: Editor, view: MarkdownView) => {
        replaceBase('*', '*', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl"],
        key: "i"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}




// 添加引用效果
export const addQuoteEffect = (): Command => {
    const title = '引用';
    const command = (editor: Editor, view: MarkdownView) => {
        addQuote('>', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Shift"],
        key: "q"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}
const addQuote = (reg: string, editor: Editor,) => {
    const content = editor.getSelection();
    if (content != '') {
        const res = handleWithRepeatStrs(content, reg, '', '\n');
        editor.replaceSelection(res);
    } else {
        let position = editor.getCursor();
        let line = editor.getLine(position.line);
        line = handleWithRepeatStr(line, reg);
        editor.setLine(position.line, line);
    }

}
// 字符中顶部否包含对应的reg片段,有则替换
const handleWithRepeatStr = (str: string, regStart: string): string => {

    if (str.substring(0, regStart.length).includes(regStart, 0)) {
        str = str.substring(regStart.length);
        return str;
    }
    str = regStart + str;
    return str;
}
