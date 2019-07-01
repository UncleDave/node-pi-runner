const { promises: fs } = require('fs');
const Path = require('path');

class ScriptFileManager {
  constructor(scriptDirectory) {
    this._scriptDirectory = scriptDirectory;
  }

  save(script) {
    const path = this._getPath(script.name);

    return fs.mkdir(this._scriptDirectory, { recursive: true })
      .catch(err => {
        if (err.code !== 'EEXIST') {
          return ScriptFileManager._logAndReject(path, err);
        }
      })
      .then(() => fs.writeFile(path, script.content))
      .then(() => path)
      .catch(err => ScriptFileManager._logAndReject(path, script.name, err));
  }

  _getPath(name) {
    return Path.format({
      dir: this._scriptDirectory,
      name: name,
      ext: '.py'
    });
  }

  static _logAndReject(path, scriptName, err) {
    console.error(`Failed to write file "${path}" (${err.code})`);
    console.error(err.stack);
    return Promise.reject(`Failed to save script ${scriptName}`);
  }
}

module.exports = ScriptFileManager;
