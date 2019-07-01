const { spawn } = require('child_process');

class ProcessManager {
  constructor() {
    this._processes = [];
  }

  start(name, tag, ...args) {
    const process = spawn(name, args);

    process.stdout.on('data', data => {
      // Data is a decimal byte array - filter out line breaks.
      ProcessManager._log(tag, data.filter(x => x !== 10), ': ');
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
