"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const os_1 = require("os");
const fs_1 = require("fs");
class Status {
    constructor(name) {
        this._path = (0, os_1.homedir)() + '/.bot_status';
        this._data = {
            'name': name,
            'pid': process.pid,
            'cmdline': process.argv,
            'closed': false
        };
        this._filename = name.replace(' ', '_');
    }
    set_status(closed = false) {
        this._data['closed'] = closed;
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