const os = require('os')
const fs = require('fs')

module.exports = class Status {
    _path = os.homedir() + '/.bot_status'
    constructor(name) {
        this._data = {
            'name': name,
            'pid': process.pid,
            'cmdline': process.argv,
            'closed': false
        }
        this._filename = name.replace(' ', '_')
    }

    set_status(closed = false) {
        this._data['closed'] = closed
        if (fs.existsSync(this._path)) {
            fs.writeFile(`${this._path}/${this._filename}.json`, JSON.stringify(this._data), (err) => {
                if (err) console.log(err)
            });
        }
    }
}
