import { Command, Editor, Hotkey, MarkdownView } from "obsidian";
import { orderList as orderListReg } from "../../utils/reg"

// 有序列表

export const orderList = (): Command => {
    const title = '有序列表';
    const command = (editor: Editor, view: MarkdownView) => {
        addOrderIndex(editor)
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Shift"],
        key: "{"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}

export const unOrderList = (): Command => {
    const title = '无序列表';
    const command = (editor: Editor, view: MarkdownView) => {
        addOrderIndex(editor)
    }
    const hotkey: Hotkey = {
        modifiers: ["Ctrl", "Shift"],
        key: "}"
    }
    return {
        id: title,
        name: title,
        editorCallback: command,
        hotkeys: [hotkey]
    }
}
const orderList2 = (editor: Editor, view: MarkdownView) => {
    const content = editor.getSelection();

    var data = view.data;
    var position = editor.getCursor();
    if (content == "") {

    } else {

    }
}

const addOrderIndex = (editor: Editor) => {

    // 判断该行是否是有序列表，如果是，取消所有的有序列表
    const setOrderList = (str: string, row: number): res => {
        var a = IsOrderList2(str);
        let res = str;
        if (a.isExist) {
            // 取消改行列表
            res = str.split(a.str, 1).join();
            editor.setLine(row, res);
            // 
            return { isExist: true };
        }
        res = "1. " + str;
        return { isExist: false, str: res };
    }

    // 开始
    const row: number = editor.getCursor().line;
    const rowData = editor.getLine(row);
    var a = setOrderList(rowData, row);
    if (a) {
        return;
    }
    let lineStr = a.str;
    if (row > 1) {
        // 上一行情况
        var lastRowData = editor.getLine(row - 1);
        if (IsOrderList2(lastRowData).isExist) {
            var lastIndex = IsOrderList2(lastRowData).str.match(/[0-9]/);
            // 上一行是有序列表
            lineStr = (lastIndex[0] + 1) + ". " + editor.getLine(row)
        } else {
            // 上一行不是有序列表
            lineStr = "1. " + editor.getLine(row)
        }
    }
    editor.setLine(row, lineStr);
}

const addUnOrderIndex = (editor: Editor) => {
    const row: number = editor.getCursor().line;
    const rowData = editor.getLine(row);
    let lineStr;

}


/**
 * 是否是有序列表 前面 数字+". "
 */
const IsOrderList = (str: string): boolean => {
    let a = false, b = false;
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if (element.match(/[0-9]/) != null) {
            a = true;
            continue;
        } else if (element.match(/./) != null) {
            b = true;
            if (a) {
                continue;
            }
        } else if (element.match(/ /) != null) {
            if (a && b) {
                return true;
            }
        }
        return false;
    }
    return false;
}

interface res {
    isExist: boolean,
    str?: string,
}
/**
 * 是否是有序列表
 */
const IsOrderList2 = (str: string): res => {
    var a = str.match(/[0-9]+?. /);
    if (a != null) {
        var i = a[0];
        for (let index = 0; index < i.length; index++) {
            if (i[index] != str[index]) {
                return {
                    isExist: false,
                };
            }
        }
        return {
            isExist: true,
            str: i,
        };
    }
    return {
        isExist: false,
    };;
}


/**
 * 是否是无序列表
 */
const IsUnOrderList = (str: string): boolean => {
    let b = false;
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if (element.match(/./) != null) {
            b = true;
            continue;
        } else if (element.match(/ /) != null) {
            if (b) return true;
        }
        return false;
    }
    return false;
}