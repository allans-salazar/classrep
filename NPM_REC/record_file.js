// Package used: https://www.npmjs.com/package/node-record-lpcm16
//March 3/16/21

sampleRate            : 16000  // audio sample rate
channels              : 1      // number of channels
threshold             : 0.5    // silence threshold (rec only)
endOnSilence          : false  // automatically end on silence (if supported)
thresholdStart        : null   // silence threshold to start recording, overrides threshold (rec only)
thresholdEnd          : null   // silence threshold to end recording, overrides threshold (rec only)
silence               : '1.0'  // seconds of silence before ending
recorder              : 'sox'  // Defaults to 'sox'
device                : null   // recording device (e.g.: 'plughw:1')
audioType             : 'wav'  // audio type to record


const recorder = require('node-record-lpcm16')
const fs = require('fs')
 
const file = fs.createWriteStream('test.wav', { encoding: 'binary' })
 
recorder.record({
  sampleRate: 44100
})
.stream()
.pipe(file)
