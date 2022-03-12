import { App, FileSystemAdapter, Modal } from "obsidian";


export default class BatchEditModal extends Modal {
    constructor(app: App) {
        super(app);
    }
    onEdit() {

    }


    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export class Methods extends Modal {
    constructor(app: App) {
        super(app);
    }

    e() {
        const fs = require("fs");
        let path = "测试测试22132131/test"
        const root = this.app.vault.getRoot();

        this.app.vault.createFolder(path);
        this.app.vault.adapter.mkdir(path + "/tses");
        const configDir = this.app.vault.configDir;

        const a = this.app.vault.getAllLoadedFiles();
        /* a[e,e,e]
            e: {delete:false,vaule:e,path:/ name:" ",children:[]}
         */
        a.map((file) => {
            file.path;
        })
        console.log(a, "\nroot", root, "\nconfigDir", configDir)
        /*root:
        {children:[e,e,e],deleted:false}
         */

        if (!(this.app.vault.adapter instanceof FileSystemAdapter)) {
            throw new TemplaterError(
                "app.vault is not a FileSystemAdapter instance"
            );
        }
        const basePath = this.app.vault.adapter.getBasePath();
        // 两种创建文件夹的方式都可行！！
        console.log(basePath);
        fs.mkdirSync(basePath + "/tesetsteada");
    }
}
export class TemplaterError extends Error {
    constructor(msg: string, public console_msg?: string) {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
