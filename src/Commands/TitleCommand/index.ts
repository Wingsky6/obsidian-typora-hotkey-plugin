import { Command, Editor, Hotkey, MarkdownView } from "obsidian";
import { res } from "../ReplaceCommand/base";



/*

 typora 快捷键   

 */
export const addH1 = (): Command => {
    const title = 'H1标题';
    const command = (editor: Editor, view: MarkdownView) => {
        addTitle('# ', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl",],
        key: "1"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}
export const addH2 = (): Command => {
    const title = 'H2标题';
    const command = (editor: Editor, view: MarkdownView) => {
        addTitle('## ', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl",],
        key: "2"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

export const addH3 = (): Command => {
    const title = 'H3标题';
    const command = (editor: Editor, view: MarkdownView) => {
        addTitle('### ', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl"],
        key: "3"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

export const addH4 = (): Command => {
    const title = 'H4标题';
    const command = (editor: Editor, view: MarkdownView) => {
        addTitle('#### ', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl"],
        key: "4"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

export const addH5 = (): Command => {
    const title = 'H5标题';
    const command = (editor: Editor, view: MarkdownView) => {
        addTitle('##### ', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl"],
        key: "5"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}


export const addH6 = (): Command => {
    const title = 'H6标题';
    const command = (editor: Editor, view: MarkdownView) => {
        addTitle('###### ', editor);
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl"],
        key: "6"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

type TitleModifier = '# ' | '## ' | '### ' | '#### ' | '##### ' | '###### ';

const addTitle = (reg: TitleModifier, editor: Editor,) => {
    let position = editor.getCursor();
    let content = editor.getLine(position.line);
    content = handleWithRepeatStr(content, reg);
    editor.setLine(position.line, content);
}
// 字符中顶部否包含对应的reg片段,有则替换
const handleWithRepeatStr = (str: string, regStart: TitleModifier): string => {

    const modifiers: TitleModifier[] = ["# ", "## ", "### ", "#### ", "##### ", "###### "]
    for (let index = 0; index < modifiers.length; index++) {
        const element = modifiers[index];
        if (str.substring(0, element.length).includes(element, 0)) {
            str = str.substring(element.length);
            if (element == regStart) {
                // 相同标题，去掉头部直接返回
                return str;
            }
            break;
        }
    }
    str = regStart + str;
    return str;
}
