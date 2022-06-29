import { App } from "obsidian";
import { unescape } from "querystring";

export function abstractFn(res: string) {
    if (!res) {
        return '';
    } else {
        var str = res.replace(/(\*\*|__)(.*?)(\*\*|__)/g, '')          //全局匹配内粗体
            .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g, '')                  //全局匹配图片
            .replace(/\[[\s\S]*?\]\([\s\S]*?\)/g, '')                    //全局匹配连接
            .replace(/<\/?.+?\/?>/g, '')                                 //全局匹配内html标签
            .replace(/(\*)(.*?)(\*)/g, '')                               //全局匹配内联代码块
            .replace(/`{1,2}[^`](.*?)`{1,2}/g, '')                       //全局匹配内联代码块
            .replace(/```([\s\S]*?)```[\s]*/g, '')                       //全局匹配代码块
            .replace(/\~\~(.*?)\~\~/g, '')                               //全局匹配删除线
            .replace(/[\s]*[-\*\+]+(.*)/g, '')                           //全局匹配无序列表
            .replace(/[\s]*[0-9]+\.(.*)/g, '')                           //全局匹配有序列表
            .replace(/(#+)(.*)/g, '')                                    //全局匹配标题
            .replace(/(>+)(.*)/g, '')                                    //全局匹配摘要
            .replace(/\r\n/g, "")                                        //全局匹配换行
            .replace(/\n/g, "")                                          //全局匹配换行
            .replace(/\s/g, "")                                          //全局匹配空字符;
        return str.slice(0, 155);
    }
    res.replace(G_bold, "")
}

export const G_bold = /(\*\*|__)(.*?)(\*\*|__)/g
export const G_image = /\!\[([\s\S]*?)\]\(([\s\S]*?)\)/g
export const G_link = /<\/?.+?\/?>/g
export const G_rowCode = /`{1,2}[^`](.*?)`{1,2}/g
export const G_blockCode = /```([\s\S]*?)```[\s]*/g
export const blockCode = /```([\s\S]*?)```[\s]*/

export const G_splice = /^-+$/g
export const G_orderList = /^[\\s]*[0-9]+\\.(.*)/g
export const orderList = /^[\\s]*[0-9]+\\.(.*)/

export const G_unOrderList = /^[\\s]*[-\\*\\+] +(.*)/g
export const unOrderList = /^[\\s]*[-\\*\\+] +(.*)/

export const G_deleteLine = /\\~\\~(.*?)\\~\\~/g
export const G_quote = /\n(&gt;|\\>)(.*)/g

export const G_ob_image = /\!\[\[(.*?)\]\]/g
// ob 
export const Str_ob_image = "\!\[\[(.*?)\]\]"

/* 

作者：huanghanzhilian
链接：https://juejin.cn/post/6844903791993552904
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
