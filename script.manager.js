class ScriptManager {
  constructor(scriptFileManager, processManager) {
    this._scriptFileManager = scriptFileManager;
    this._processManager = processManager;
  }

  register(script, callback) {
    this._scriptFileManager.save(script, (err, path) => {
      if (err) {
        callback(err);
        return;
      }

      this._processManager.start('python', script.name, path);
      callback();
    });
  }
}

module.exports = ScriptManager;
