package com.zhurlik.smart.home.sphinx.listener;

import com.zhurlik.smart.home.sphinx.event.SpeechRecognizerEvent;
import edu.cmu.sphinx.api.SpeechResult;
import edu.cmu.sphinx.api.StreamSpeechRecognizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.PipedInputStream;

import static com.zhurlik.smart.home.sphinx.event.SpeechRecognizerEvent.Code;

/**
 * A listener for handling SpeechRecognizer events.
 *
 * @author zhurlik@gmail.com
 */
@Component
public class SpeechRecognizerListener implements ApplicationListener<SpeechRecognizerEvent> {
    private static final Logger LOGGER = LoggerFactory.getLogger(SpeechRecognizerListener.class);

    @Autowired
    private StreamSpeechRecognizer streamSpeechRecognizer;

    @Autowired
    private PipedInputStream in;

    /**
     * For handling Speech Recognizer events.
     *
     * @param event see SpeechRecognizerEvent
     */
    @Async
    @Override
    public void onApplicationEvent(final SpeechRecognizerEvent event) {
        final Code code = (Code) event.getSource();
        switch (code) {
            case STOP:
                stop();
                break;
            case START:
                start();
                break;
            default:
                throw new UnsupportedOperationException("Unsupported event for Speech Recognizer");
        }
    }

    private void start() {
        LOGGER.debug(">> Starting Speech Recognizer...");
        streamSpeechRecognizer.startRecognition(in);
        SpeechResult result;
        while ((result = streamSpeechRecognizer.getResult()) != null) {
            final String word = result.getHypothesis();
            LOGGER.debug(">> You just have said:{}", word);
        }
    }

    private void stop() {
        LOGGER.debug(">> Stopping Speech Recognizer...");
        streamSpeechRecognizer.stopRecognition();
    }
}
