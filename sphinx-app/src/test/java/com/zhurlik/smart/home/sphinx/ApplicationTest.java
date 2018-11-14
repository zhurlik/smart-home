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
import java.io.InputStream;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Application.class)
@TestPropertySource(properties = {
        "sphinx.use.grammar=true",
        "sphinx.grammar.path=resource:/sphinx-test",
        "sphinx.grammar.name=smart-home-test",
        "sphinx.dictionary.path=resource:/sphinx-test/smart-home-ru-test.dic"
})
public class ApplicationTest {
    private final static Logger LOGGER = LoggerFactory.getLogger(ApplicationTest.class);

    @Autowired
    private ApplicationContext spring;

    @Autowired
    private Configuration sphinx;

    @Value("file:${user.dir}/zero_ru_cont_8k_v3/decoder-test.wav")
    private Resource wav;

    //@BeforeAll
    static void setUp() {
        System.setProperty("javax.sound.sampled.TargetDataLine", "com.sun.media.sound.DirectAudioDeviceProvider#MS [plughw:2,0]");
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
            TimeUnit.SECONDS.sleep(3);
            SpeechResult result = recognizer.getResult();
            LOGGER.debug(">> You said:{}", result.getHypothesis());
        }

        // Pause recognition process. It can be resumed then with startRecognition(false).
        recognizer.stopRecognition();
    }
}
