const fs = require('fs');
const Path = require('path');

class ScriptFileManager {
  constructor(scriptDirectory) {
    this._scriptDirectory = scriptDirectory;
  }

  save(script, callback) {
    const path = this._getPath(script.name);

    fs.mkdir(this._scriptDirectory, { recursive: true }, err => {
      if (err && err.code !== 'EEXIST') {
        ScriptFileManager._logError(path, err);
        callback(`Failed to save script ${script.name}`);
        return;
      }

      fs.writeFile(path, script.content, err => {
        if (err) {
          ScriptFileManager._logError(path, err);
          callback(`Failed to save script ${script.name}`);
        } else {
          callback(null, path);
        }
      });
    });
  }

  _getPath(name) {
    return Path.format({
      dir: this._scriptDirectory,
      name: name,
      ext: '.py'
    });
  }

  static _logError(path, err) {
    console.error(`Failed to write file "${path}" (${err.code})`);
    console.error(err.stack);
  }
}

module.exports = ScriptFileManager;
