const { spawn } = require('child_process');

class ProcessManager {
  constructor() {
    this._processes = [];
  }

  start(name, tag, ...args) {
    const process = spawn(name, args);

    process.stdout.on('data', data => {
      ProcessManager._log(tag, data, ': ');
    });

    process.on('close', code => {
      ProcessManager._log(tag, `exited with code ${code}`);
      this._processes = this._processes.filter(x => x !== process);
    });

    this._processes.push(process);
  }

  static _log(tag, message, delimiter = ' ') {
    console.log(`[${tag}]${delimiter}${message}`);
  }
}

module.exports = ProcessManager;
