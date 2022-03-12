import { FILE } from "dns";
import { appendFile } from "fs";
import { App, Editor, EditorPosition, MarkdownView, Modal, normalizePath, TFile, TFolder } from "obsidian";


// 第一个命令 仅当前页面下的将md图片格式替换obsidian图片格式
const a = (editor: Editor, view: MarkdownView) => {
    // console.log(`xxxxx`, editor.getSelection(), "\nview", view);
    // view.editor
    // 当前视图所有文字内容
    let content = view.data;

    // view.app.vault.read(view.)
    // 默认
    const _attachment = "";
    // console.log()
    let title = view.file.basename;
    // 顶层数据
    let path = view.file.path;
    let imageInfoList = content.match(/!\[(.*?)\]\((.*?)\)/ig)
    // console.log(content, "imageInfoList\n", imageInfoList)
    let obImgList: { mdImg: string, obImg: string; path: string; }[] = [];
    if (imageInfoList == null) {
        // console.log(content, "imageInfoList\n", imageInfoList)
        return;
    }
    // ![image-20220226092045101](../../_attachments/image-20220226092045101.png)
    imageInfoList.forEach((imageInfo) => {
        // image-20220226092045101
        const imgNickname = imageInfo.match(/!\[(.*?)\]/)[1];
        // ../../_attachments/image-20220226092045101.png
        const imgPath = imageInfo.match(/\((.*?)\)/)[1];
        // 可能匹配不到！
        let imgName = imgPath;
        if (imgPath.match(/.*\/.*\/(.*\..*)/) != null) {
            // image-20220226092045101.png
            imgName = imgPath.match(/.*\/.*\/(.*\..*)/)[1];
        }
        // 
        const obImg = '![[' + imgName + (imgNickname != imgName && imgNickname != '' ? ('|' + imgNickname) : '') + ']]';
        // console.log("obImg", obImg);
        obImgList.push(
            { mdImg: imageInfo, obImg: obImg, path: imgPath }
        );
        // console.log("obImgList", obImgList);
    });
    if (obImgList == null) {
        // console.log(content, "obImgList\n", obImgList)
        return;
    }


    // var fs = require('fs');

    // 移动图片到指定文件夹(也许不需要)
    // const new_path = normalizePath(_attachment);
    // const file = this.app.metadataCache.getFirstLinkpathDest(
    //             filename,
    // ""
    // );


    // 文本替换
    obImgList.forEach((item) => {
        content = content.replace(item.mdImg, item.obImg);
    })
    view.data = content;
    // var c: Editor = editor.getDoc();
    editor.setValue(content);
    // editor.replaceSelection(path);
}

// 全局替换
export const b = (editor: Editor, view: MarkdownView) => {
    let tfolder: TFolder = view.file.parent;
    if (tfolder.isRoot()) {
        let tFiles: TFile[] = tfolder.vault.getMarkdownFiles();

        tFiles.forEach((tf) => {

            let xx = tf.vault.read(tf);
            let a: string = "";
            xx.then(
                (col) => {
                    a = col
                }
            );
            a = base(a);
            // tf.vault.adapter.read(a);

        })
    } else {

    }
}


// 翻转！ob图片格式转换成md图片格式
export const c = (editor: Editor, view: MarkdownView) => {
    a(editor, view);
    // 有会做插件的大佬吗？请教
}
// 添加键盘样式<kbd>
export const d = (editor: Editor, view: MarkdownView) => {
    // 根据当前内容直接返回值
    const funcA = (a: string): string => {
        let b = a.match(/<kbd>(.*)<\/kbd>/)
        if (b != null) {
            a = b[1];
        } else {
            a = "<kbd>" + a + "</kbd>";
        }
        return a;
    }
    // 获取当前行内容
    const getCurrentLine = (editor: Editor): string => {
        // 根据当前光标匹配字符
        var c: EditorPosition = editor.getCursor();
        let contents: string[] = view.data.split("\n");
        let lineCh: string = contents[c.line - 1];

        return lineCh;
    }
    const getCurrentLine2 = (editor: Editor) => {
        var c = editor.getCursor();
        const start: EditorPosition = {
            ch: 0,
            line: c.line
        }
        const end: EditorPosition = {
            ch: 0,
            line: c.line + 1,
        }
        return editor.getRange(start, end)
    }


    let a: string = editor.getSelection();
    if (a == "") {
        var c: EditorPosition = editor.getCursor();

        let contents: string[] = view.data.split("\n");
        let lineCh = contents[c.line - 1];
        let ch = lineCh[c.ch];
        if (ch == "" && contents[c.line - 1][c.ch + 1] == "") {
            return;
        }
        let start = c.ch, end = c.ch;
        do {

            if (lineCh[start] != "") start--;
            if (lineCh[end] != "") end++;
        }
        while (lineCh[start] != "" || lineCh[end] != "")
        // let data = lineCh.substring(c.ch - start, c.ch + end);
        // data = "<kbd>" + data + "</kbd>";
        var newLineCh = lineCh.slice(0, start) + "<kbd>" + lineCh.slice(start, end) + "</kbd>" + lineCh.slice(end);
        // view.editor.setValue()
        // view.data.
        contents[c.line - 1] = newLineCh;
        let newContent = "";
        contents.map((item) => {
            newContent += (item + "\n")
        })
        view.editor.setValue(newContent);
        return;
    }

    funcA(a);
    editor.replaceSelection(a);
}

//创建文件夹

const base = (str: string): string => {
    let imageInfoList = str.match(/!\[(.*?)\]\((.*?)\)/ig)
    let obImgList: { mdImg: string, obImg: string; path: string; }[] = [];
    if (imageInfoList == null) {
        return str;
    }
    // ![image-20220226092045101](../../_attachments/image-20220226092045101.png)
    imageInfoList.forEach((imageInfo) => {
        // image-20220226092045101
        const imgNickname = imageInfo.match(/!\[(.*?)\]/)[1];
        const imgPath = imageInfo.match(/\((.*?)\)/)[1];
        // 可能匹配不到！
        let imgName = imgPath;
        if (imgPath.match(/.*\/.*\/(.*\..*)/) != null) {
            imgName = imgPath.match(/.*\/.*\/(.*\..*)/)[1];
        }
        const obImg = '![[' + imgName + (imgNickname != imgName && imgNickname != '' ? ('|' + imgNickname) : '') + ']]';
        obImgList.push(
            { mdImg: imageInfo, obImg: obImg, path: imgPath }
        );
    });
    if (obImgList == null) {
        return str;
    }
    // 文本替换
    obImgList.forEach((item) => {
        str = str.replace(item.mdImg, item.obImg);
    })

    return str;
}
export default a;