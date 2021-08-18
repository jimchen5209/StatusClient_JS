import { homedir } from 'os'
import { existsSync, writeFile } from 'fs'

export class Status {
    private _data: { name: string, pid: number, cmdline: string[], closed: boolean };
    private _filename: string;
    private _path = homedir() + '/.bot_status';
    constructor(name: string) {
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
        if (existsSync(this._path)) {
            writeFile(`${this._path}/${this._filename}.json`, JSON.stringify(this._data), (err) => {
                if (err) console.log(err);
            });
        }
    }
}
