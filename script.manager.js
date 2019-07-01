class ScriptManager {
  constructor(scriptFileManager, processManager) {
    this._scriptFileManager = scriptFileManager;
    this._processManager = processManager;
  }

  register(script) {
    return this._scriptFileManager.save(script)
      .then(path => this._processManager.start('python', script.name, path));
  }
}

module.exports = ScriptManager;
