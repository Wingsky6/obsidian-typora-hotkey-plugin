import { Editor } from "obsidian"


export const a = () => {

}


// 行的性质
interface rowType {
    ListType: "order" | "unorder" | "normal"
    // 去掉格式的值
    resStr: string,
}


/**
 * judgeRowType:判断行性质
 */
const judgeRowType = (str: string): rowType => {
    var a = isOrderIndex(str);
    if (a) {
        return {
            ListType: "order",
            resStr: a.resStr
        }
    }
    var b = isUnOrderList(str);
    if (b) {
        return {
            ListType: "unorder",
            resStr: a.resStr
        }
    }
    return {
        ListType: "normal",
        resStr: str
    }
}

const isHeaderTab = (str: string) => {
    return isHeaderBase(str, /  /);
}

const isOrderIndex = (str: string) => {
    return isHeaderBase(str, /[0-9]+?. /)
}
const isUnOrderList = (str: string) => {
    return isHeaderBase(str, /. /)
}

const isHeaderBase = (str: string, reg: RegExp) => {
    var a = str.match(reg);
    var res = str;
    if (a == null) {
        return {
            isExist: false,
            resStr: res
        };
    } else {
        var i = a[0];
        for (let index = 0; index < i.length; index++) {
            if (i[index] != str[index]) {
                return {
                    isExist: false,
                    resStr: res
                };
            }
        }
        res = str.substring(i.length);
        return { resStr: res, isExist: true };
    }
}

const setOrderLists = (editor: Editor) => {
    var content = editor.getSelection();
    // 是否全部都属于正常(content!=null)
    var rowDatas = content.split('\n');
    var part = false, all = false;
    let ress: rowType[] = []
    for (let index = 0; index < rowDatas.length; index++) {
        const a = rowDatas[index];
        var i = judgeRowType(a);
        ress.push(i)
        if (i.ListType != "normal") {
            continue;
        } else {
            part = true;
        }
        if (index == rowDatas.length - 1) {
            all = true;
        }
    }


    // 全部都是有序列表/无序列表 
    if (all) {
        // 需要转化成有序列表
        if (ress.find(i => i.ListType == "unorder")) {



        } else {
            // 取消有序列表样式
            
        }
    }



}