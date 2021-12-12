import { resample } from 'wave-resampler';
const webSocket = new WebSocket('ws://localhost:2700');

webSocket.onopen = (event) => {
    console.log('>> Connected');
    // 8000 -> 37005
    // 44100 -> 36975
    // 19534
    navigator.mediaDevices.getUserMedia({audio: {sampleRate: 16000}, video: false})
        .then((stream) => {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            var audioCtx = new AudioContext();
            const recordedChunks = [];
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.addEventListener('dataavailable', (e) => {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            });

            mediaRecorder.addEventListener('stop', async () => {
                console.log('>> Sending to server...')

                // original
                console.log('>> 111111111111');
                // webSocket.send(new Blob(recordedChunks));
                // webSocket.send(JSON.stringify({eof: 1}));

                // transformed
                const buf = await recordedChunks[0].arrayBuffer();
                console.log(buf);
                const audioArray = new Float64Array(buf);
                console.log(audioArray);
                const  transformed = resample([...audioArray], audioCtx.sampleRate, 8000);
                console.log('>> 22222222222');
                webSocket.send(new Blob(transformed));
                webSocket.send(JSON.stringify({eof: 1}));
            });

            console.log('>> Start recording...')
            mediaRecorder.start();

            setTimeout(() => {
                console.log('>> Stop recording...');
                mediaRecorder.stop();
            }, 3000);
        })
        .catch((err) => {
            /* handle the error */
            console.error(err);
        });
}

webSocket.onmessage = (event) => {
    console.log(">> Response:");
    console.log(event.data);
}

webSocket.onclose = (event) => {
    // This can happen if the blob was too big
    // E.g. "Frame size of 65580 bytes exceeds maximum accepted frame size"
    console.log(">> OnClose:" + JSON.stringify(event));
}

webSocket.onerror = (event) => {
    console.log(">> Error:" + JSON.stringify(event));
}
