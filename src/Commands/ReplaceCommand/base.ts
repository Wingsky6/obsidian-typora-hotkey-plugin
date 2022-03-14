import { Editor, EditorPosition, MarkdownView } from "obsidian";



// 根據reg表達式替換字符
/* 1.  kbd 键盘个数
2. 行代码 `
3. 块代码 ```
4. 序号，有序和无序序号
5. 数学公式
 */


/**
 * regStart: 起点
 * regEnd: 终点
 * @public
 */
export const replaceBase = (regStart: string, regEnd: string, editor: Editor) => {

    let content = editor.getSelection();
    if (content != '') {
        // 
        // content = regStart + content + regEnd;
        // 选择
        content = handleWithRepeatStr(content, regStart, regEnd).str;
        editor.replaceSelection(content);
        return;
    } else {
        // 判断是否是符号

        // 未选择 需要切换光标
        onReplaceUnSelectStr(editor, regStart, regEnd);
    }
}

export interface res {
    // 是否被剪切
    ifCut: boolean,
    str: string
}

/* 
*/
// 字符中两端否包含对应的reg片段,有则替换
const handleWithRepeatStr = (str: string, regStart: string, regEnd: string): res => {
    const startStr = str.substring(0, regStart.length);
    if (startStr.includes(regStart, 0) && str.includes(regEnd, str.length - regEnd.length)) {
        str = str.substring(regStart.length, str.length - regEnd.length);
        return {
            ifCut: true,
            str: str
        };
    } else {
        str = regStart + str + regEnd;
        return {
            ifCut: false,
            str: str
        };
    }
}

const onReplaceSimpleStr = (editor: Editor, regStart: string, regEnd: string): void => {
    let position = editor.getCursor();
    let line = editor.getLine(position.line);
    const content = line.substring(0, position.ch + 1) + regStart + regEnd + line.substring(position.ch + 1);
    editor.setLine(position.ch, content);
}

/*
1. 字符在光标前面（可行）
2. 字符在光标中间（可行）
3. 字符在光标后面（可行） 
*/
// 选择
const onReplaceUnSelectStr = (editor: Editor, regStart: string, regEnd: string): void => {
    let position: EditorPosition = editor.getCursor();
    let content = editor.getLine(position.line);
    // 寻找空格
    let start = position.ch, end = start;
    const c = content[position.ch]
    const c1 = content[position.ch - 1]
    do {
        start--;
    }
    while (content[start] != ' ' &&
    content[start] != undefined &&
    checkAll(c) == checkAll(content[start]) &&
        // 如果左边界为特殊字符，start初始化
        checkAll(c1) != 0)
    do {
        end++;
    }
    // content[end] != '\n' && 
    while (content[end] != ' ' && content[end] != undefined && checkAll(c) == checkAll(content[end]) && checkAll(c) != 0)

    console.log(c, "c", content[end - 1], content[start + 1])
    // let str = content.substring(start, end);

    let replaceStr = handleWithRepeatStr(content.substring(start + 1, end), regStart, regEnd);
    let replaceContent = content.substring(0, start + 1) + replaceStr.str + content.substring(end);

    // 确保鼠标在更改文字的后半段 此时,end 绝对位置发生变化, start位置不变;
    // 光标比实际位置+1
    let newPosition: EditorPosition = {
        //   
        ch: start + replaceStr.str.length - (!replaceStr.ifCut ? regEnd.length : 0) + 1,
        line: position.line
    }
    // console.log(newPosition, start, end, start + replaceStr.str.length - (!replaceStr.ifCut ? regEnd.length : 0))
    editor.setLine(position.line, replaceContent);

    editor.setCursor(newPosition, newPosition.ch);
    // 


}


const checkAll = (str: string): number => {
    if (checkCh(str)) {
        return 2;
    }
    if (checkEN(str)) {
        return 1;
    }
    if (checkNum(str)) {
        return 1;
    }
    if (checkSpecialChar(str)) {
        return 0;
    }
    return 0;
}

// 判断是否是中文 中文为真
const checkCh = (str: string): boolean => {
    var pattern = new RegExp("[\u4E00-\u9FA5]+");
    return pattern.test(str);
}
// 判断是否是英文
const checkEN = (str: string): boolean => {
    var pattern = new RegExp("[A-Za-z]+")
    return pattern.test(str);
}

const checkNum = (str: string): boolean => {
    var pattern = new RegExp("[0-9]+")
    return pattern.test(str);
}
// 判断是否是特殊字符
const checkSpecialChar = (str: string): boolean => {
    var specialChars = "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。";
    var len = specialChars.length;
    for (var i = 0; i < len; i++) {
        if (str.indexOf(specialChars.substring(i, i + 1)) != -1) {
            return true;
        }
    }
    return false;
}


// const 