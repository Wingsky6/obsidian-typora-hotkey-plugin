
import { FILE } from "dns";
import { appendFile } from "fs";
import { App, Editor, EditorPosition, MarkdownView, Modal, normalizePath, Notice, TFile, TFolder } from "obsidian";

/*
 *
 */
export const replace1 = (editor: Editor, view: MarkdownView) => {
    let str = editor.getSelection();
    str = reg2(str);
    editor.replaceSelection(str);
}

export const replace2 = (editor: Editor, view: MarkdownView) => {
    let str = editor.getSelection();
    str = reg(str, "Revit");
    editor.replaceSelection(str);
}
// 正则替换式 添加链接
const reg = (str: string, cate: string): string => {
    let a = str.matchAll(/. (.*)/g)
    let b = Array.from(a);
    b.map((item) => {
        // str += ("[[" + cate + "-" + item + "|" + item + "]]")

        str = str.replace(item[1], "[[" + cate + " - " + item[1] + "|" + item[1] + "]]")
    })
    return str;
}

// 正则替换式 添加链接
const reg2 = (str: string): string => {
    // let a = str.match(/. (.*)/i);
    let a = str.matchAll(/. (.*)/g)
    let b = Array.from(a);

    // console.log(a, `reg2`, b);
    b.map((item) => {
        // b += ("[" + item + "](#" + item + ")")
        str = str.replace(item[1], "[" + item[1] + "](#" + item[1] + ")")
    })
    new Notice('替换成功!');
    return str;
}


//按Ctrl + Shift + ` 添加代码样式
export const codeStyle = (editor: Editor, view: MarkdownView) => {
    let content = editor.getSelection();
    if (content == "") {
        // 根据左右测是否有数据
        const position = editor.getCursor();

        // let range = editor.
        // 左侧和右侧
        console.log(position.ch)

    } else {
        content = "`" + content + "`";
        editor.replaceSelection(content);
    }
}
// 按Ctrl + Shift + M 添加评论样式
export const commentStyle = (editor: Editor, view: MarkdownView) => {
    let content = editor.getSelection();
    let a = editor.getCursor();
    if (content == "") {
        a.ch += 4;
    }

    content = "<!--" + content + "-->";
    editor.replaceSelection(content);
    // 修改光标位置
    editor.setCursor(a);
}


/* 1. 找到光标位置
 * 2. 找到需要替换文本的端点
 * 3. 行重新替换
 * 4. 返回新的内容
 */
const cursor = (position: EditorPosition, content: string, action: Promise<string>): string => {
    let str: string[] = content.split("\n");
    let line = str[position.line];
    // 替换内容
    let word = "";
    action.then((res) => { res + word });
    let content2 = ""
    let start = position.ch, end = position.ch;

    str[position.line] = line;
    str.map((item) => {
        content2 += (item + "\n")
    })

    return content;
}

// 获取当前行内容
const getCurrentLine = (editor: Editor): string => {
    // 根据当前光标匹配字符
    var c: EditorPosition = editor.getCursor();
    // let contents: string[] = view.data.split("\n");
    // let lineCh: string = contents[c.line - 1];

    // return lineCh;
    return "";
}
