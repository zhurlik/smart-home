package com.zhurlik.smart.home.sphinx;

import edu.cmu.sphinx.api.Configuration;
import edu.cmu.sphinx.api.LiveSpeechRecognizer;
import edu.cmu.sphinx.api.SpeechResult;
import edu.cmu.sphinx.api.StreamSpeechRecognizer;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

import static java.lang.Runtime.getRuntime;
import static java.lang.String.format;
import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Application.class)
@TestPropertySource(properties = {
        "sphinx.use.grammar=true",
        "sphinx.grammar.path=resource:/sphinx-test/zero_ru",
        "sphinx.grammar.name=smart-home-test",
        "sphinx.dictionary.path=resource:/sphinx-test/zero_ru/smart-home-ru-test.dic"
})
class ApplicationTest {
    private final static Logger LOGGER = LoggerFactory.getLogger(ApplicationTest.class);

    @Autowired
    private Configuration sphinx;

    @Value("file:${user.dir}/zero_ru_cont_8k_v3/decoder-test.wav")
    private Resource wav;

    //@BeforeAll
    static void setUp() {
        System.setProperty("javax.sound.sampled.TargetDataLine", "com.sun.media.sound.DirectAudioDeviceProvider#MS [plughw:2,0]");
    }

    /**
     * Says a russian text using festival.
     *
     * @param words
     */
    private void sayRu(final String words)  {
        try {
            final String command = format("echo '%s' | festival --language russian --tts", words);
            final String[] cmd = { "/bin/sh", "-c", command };
            final Process process = getRuntime().exec(cmd);
        } catch (Exception ex) {
            LOGGER.error(">> Error", ex);
        }
    }

    @Test
    void testInfinity() throws IOException {
        final AtomicBoolean stop = new AtomicBoolean(false);

        final PipedInputStream in = new PipedInputStream();
        final PipedOutputStream out = new PipedOutputStream(in);

        // 2 threads for reading audio streams (wav files) and stopping a process
        final ExecutorService executorService = Executors.newFixedThreadPool(2);

        // reading a few times a wav file
        executorService.submit(() -> {
            while (!stop.get()) {
                try {
                    out.write(wav.getInputStream().readAllBytes());
                } catch (IOException e) {
                    LOGGER.error(">> Error during reading audio file:", e);
                }
            }
        });

        // 5 seconds
        executorService.submit(() -> {
            try {
                SECONDS.sleep(5);
                stop.set(true);
                out.close();
            } catch (InterruptedException | IOException ignored) {
            }
        });

        final StreamSpeechRecognizer recognizer = new StreamSpeechRecognizer(sphinx);
        recognizer.startRecognition(in);
        SpeechResult result;

        while ((result = recognizer.getResult()) != null) {
            // should be: илья ильф евгений петров золотой телёнок
            LOGGER.debug(">> You just have said:{}", result.getHypothesis());
        }
        recognizer.stopRecognition();
    }

    @Test
    void testWavFile() throws Exception {
        LOGGER.debug(">> Wav file: {}", wav);
        try (final InputStream in = new BufferedInputStream(wav.getInputStream())) {
            final StreamSpeechRecognizer recognizer = new StreamSpeechRecognizer(sphinx);
            recognizer.startRecognition(in);
            SpeechResult result;
            while ((result = recognizer.getResult()) != null) {
                // should be: илья ильф евгений петров золотой телёнок
                assertEquals("илья ильф евгений петров золотой телёнок", result.getHypothesis());
            }
            recognizer.stopRecognition();
        }
    }

    @Test
    @Disabled("Just for manually testing")
    void testMircophone() throws Exception {
        LiveSpeechRecognizer recognizer = new LiveSpeechRecognizer(sphinx);
        // Start recognition process pruning previously cached data.
        recognizer.startRecognition(true);

        boolean stop = false;
        while (!stop) {
            SECONDS.sleep(3);
            SpeechResult result = recognizer.getResult();
            LOGGER.debug(">> You said:{}", result.getHypothesis());
        }

        // Pause recognition process. It can be resumed then with startRecognition(false).
        recognizer.stopRecognition();
    }
}