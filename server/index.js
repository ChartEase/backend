const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const db = require('./db/db');
const PORT = process.env.PORT || 3000;
const app = express();
module.exports = app;
const cors = require('cors')

app.use(cors());

const createApp = () => {
  // Middleware
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use('/api', require('./api'));

  // Any remaining requests with an extension send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // Error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

const syncDb = () => {
  db.authenticate()
    .then(() => {
      console.log("Connection has been established");
      db.sync({force: true})
        .then(() => {
          console.log('Database has been synced');
        });
    });
};

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}

var vosk = require('vosk')
const fs = require("fs");
var mic = require("mic");

MODEL_PATH = "vosk-model-en-us-0.22";
SAMPLE_RATE = 16000;

if (!fs.existsSync(MODEL_PATH)) {
    console.log("Please download the model from https://alphacephei.com/vosk/models and unpack as " + MODEL_PATH + " in the current folder.")
    process.exit()
}

vosk.setLogLevel(0);
const model = new vosk.Model(MODEL_PATH);
const rec = new vosk.Recognizer({model: model, sampleRate: SAMPLE_RATE});

var micInstance = mic({
    rate: String(SAMPLE_RATE),
    channels: '1',
    debug: false,
    device: 'default',    
});

var micInputStream = micInstance.getAudioStream();

let transcript = [];

micInputStream.on('data', data => {
  if (rec.acceptWaveform(data)) {
    transcript.push(rec.result().text);
  } 
});

app.get('/api/transcribe', (req, res) => {
  console.log('in api/transcribe');
  console.log(transcript);
  res.json(transcript);
})


micInputStream.on('audioProcessExitComplete', function() {
    rec.free();
    model.free();
});

process.on('SIGINT', function() {
    micInstance.stop();
});

micInstance.start();