
import { Editor, EditorPosition, MarkdownView } from "obsidian";
import { type } from "os";

/**
 * regStart: 起点
 * regEnd: 终点
 * delimiter: 分隔符 
 * @public
 */
export const replaceBaseByDelimiter = (regStart: string, regEnd: string, delimiter: string, editor: Editor) => {

    let content = editor.getSelection();
    if (content != '') {
        // 
        // content = regStart + content + regEnd;
        // 选择
        let res = handleWithRepeatStrs(content, regStart, regEnd, delimiter);
        editor.replaceSelection(res);
        return;
    } else {
        // 未选择 需要切换光标
        onReplaceUnSelectStr(editor, regStart, regEnd, delimiter);
    }
}

/**
 * regStart: 起点
 * regEnd: 终点
 * delimiter: 分隔符 
 * 根据分隔符批量分割字符串
 * @public
 */
export const handleWithRepeatStrs = (str: string, regStart: string, regEnd: string, delimiter: string): string => {
    let words = str.split(delimiter);
    let res = "";
    let i = 0;
    words.map((item) => {
        res += ((i == 0 ? '' : delimiter) + handleWithRepeatStr(item, regStart, regEnd));
        i++;
    })
    return res;
}
/* 
*/
// 字符中两端否包含对应的reg片段,有则替换
const handleWithRepeatStr = (str: string, regStart: string, regEnd: string): string => {
    const startStr = str.substring(0, regStart.length);
    if (startStr.includes(regStart, 0) && str.includes(regEnd, str.length - regEnd.length)) {
        str = str.substring(regStart.length, str.length - regEnd.length);
    } else {
        str = regStart + str + regEnd;

    }
    return str;
}
/*
1. 字符在光标前面（可行）
2. 字符在光标中间（可行）
3. 字符在光标后面（可行） 
*/
// 选择
const onReplaceUnSelectStr = (editor: Editor, regStart: string, regEnd: string, delimiter: string,): void => {
    let position: EditorPosition = editor.getCursor();
    let content = editor.getLine(position.line);
    // 寻找空格
    let start = position.ch, end = start;
    do {
        start--;
    }
    while (content[start] != ' ' && content[start] != undefined)
    do {
        end++;
    }
    // content[end] != '\n' && 
    while (content[end] != ' ' && content[end] != undefined)
    // let str = content.substring(start, end);

    let replaceStr = handleWithRepeatStrs(content.substring(start + 1, end), regStart, regEnd, delimiter);
    let replaceContent = content.substring(0, start + 1) + replaceStr + content.substring(end);


    // console.log(newPosition, start, end, start + replaceStr.str.length - (!replaceStr.ifCut ? regEnd.length : 0))
    editor.setLine(position.line, replaceContent);

    // 


}
