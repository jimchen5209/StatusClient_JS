import { homedir } from 'os';
import { existsSync, writeFile } from 'fs';
import { execSync } from 'child_process';

export class Status {
    private _data: { name: string, pid: number, cmdline: string[], closed: boolean, pm2: boolean };
    private _filename: string;
    private _path = homedir() + '/.bot_status';
    constructor(name: string) {
        const pid = process.pid;
        const cmd = `ps -p ${pid} -ww -o args`;
        const stdOut = execSync(cmd);
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
        if (existsSync(this._path)) {
            writeFile(`${this._path}/${this._filename}.json`, JSON.stringify(this._data), (err) => {
                if (err) console.log(err);
            });
        }
    }
}
