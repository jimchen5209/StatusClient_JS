"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const os_1 = require("os");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
class Status {
    constructor(name) {
        this._path = (0, os_1.homedir)() + '/.bot_status';
        const pid = process.pid;
        const cmd = `ps -p ${pid} -ww -o args`;
        const stdOut = (0, child_process_1.execSync)(cmd);
        const cmdline = Buffer.from(stdOut).toString().split('\n')[1];
        this._data = {
            name: name,
            pid: pid,
            cmdline: cmdline.split(' '),
            closed: false,
            pm2: process.argv[1].includes('pm2')
        };
        this._filename = name.replace(' ', '_');
    }
    set_status(closed = false) {
        this._data.closed = closed;
        if ((0, fs_1.existsSync)(this._path)) {
            (0, fs_1.writeFile)(`${this._path}/${this._filename}.json`, JSON.stringify(this._data), (err) => {
                if (err)
                    console.log(err);
            });
        }
    }
}
exports.Status = Status;
//# sourceMappingURL=status.js.map