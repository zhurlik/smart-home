package com.zhurlik.smart.home.sphinx;

import edu.cmu.sphinx.api.Configuration;
import edu.cmu.sphinx.api.LiveSpeechRecognizer;
import edu.cmu.sphinx.api.SpeechResult;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.concurrent.TimeUnit;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = Application.class)
public class ApplicationTest {
    private final static Logger LOGGER = LoggerFactory.getLogger(ApplicationTest.class);

    @Autowired
    private ApplicationContext spring;

    @Autowired
    private Configuration sphinx;

    @Test
    void testMain() throws Exception {
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
