const express = require('express');
const bodyParser = require('body-parser');

const Script = require('./script');
const ScriptManager = require('./script.manager');
const ScriptFileManager = require('./script-file.manager');
const ProcessManager = require('./process.manager');

const scriptFileManager = new ScriptFileManager('scripts');
const processManager = new ProcessManager();
const scriptManager = new ScriptManager(scriptFileManager, processManager);
const router = express.Router();

router.use(bodyParser.text({ type: 'text/x-python' }));

router.post('/:name', (req, res) => {
  if (!req.is('text/x-python')) {
    res.sendStatus(406);
    return;
  }

  const scriptName = req.params.name;
  const script = new Script(scriptName, req.body);

  scriptManager.register(script)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
