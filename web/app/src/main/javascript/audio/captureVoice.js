import Worker from 'worker-loader!../worker/uploadAudio.js';
import { io } from 'socket.io-client';

const worker = new Worker();
const ws = io('ws://localhost:2700', {
    path: '/asr/ru',
    transports: ['websocket']
});

navigator.mediaDevices.getUserMedia({audio: {sampleRate: 8000}, video: false})
    .then((stream) => {
        const downloadLink = document.getElementById('download');
        const options = {mimeType: 'audio/webm'};
        const recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.addEventListener('dataavailable', function(e) {
            if (e.data.size > 0) {
                // recordedChunks.push(e.data);
                ws.emit(e.data);
            }
        });

        mediaRecorder.addEventListener('stop', () => {
            // downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
            // downloadLink.download = 'test.wav';
            // worker.postMessage(recordedChunks);
            ws.send({eof: 1})
        });

        ws.on('connect_error', (d) => {
            console.log('>>>');
        });

        ws.on('connect', () => {
            console.log('>> Start recording...')
            mediaRecorder.start();

            setTimeout(() => {
                console.log('>> Stop recording...');
                mediaRecorder.stop();
            }, 3000);
        });

        ws.on('message',(data) => {
            console.log(data);
        });
    })
    .catch((err) => {
        /* handle the error */
    });

export default () => {
    console.log('>> Access the raw data from the microphone');
};