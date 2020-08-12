import Worker from 'worker-loader!../worker/uploadAudio.js';

const worker = new Worker();

navigator.mediaDevices.getUserMedia({audio: {sampleRate: 8000}, video: false})
    .then((stream) => {
        const downloadLink = document.getElementById('download');
        const options = {mimeType: 'audio/webm'};
        const recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.addEventListener('dataavailable', function(e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        });
        console.log('>> Start recording...')
        mediaRecorder.start();

        mediaRecorder.addEventListener('stop', () => {
            downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
            downloadLink.download = 'test.wav';
            worker.postMessage(recordedChunks);
        });

        setTimeout(() => {
            console.log('>> Stop recording...');
            mediaRecorder.stop();
        }, 3000);
    })
    .catch((err) => {
        /* handle the error */
    });

export default () => {
    console.log('>> Access the raw data from the microphone');
};