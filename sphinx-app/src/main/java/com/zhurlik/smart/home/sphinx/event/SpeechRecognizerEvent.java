package com.zhurlik.smart.home.sphinx.event;

import org.springframework.context.ApplicationEvent;

/**
 * This class describes app events for Speech Recognizer.
 * To be able to start and stop Speech Recognizer.
 *
 * @author zhurlik@gmail.com
 */
public final class SpeechRecognizerEvent extends ApplicationEvent {
    public final static SpeechRecognizerEvent STOP = new SpeechRecognizerEvent(Code.STOP);
    public final static SpeechRecognizerEvent START = new SpeechRecognizerEvent(Code.START);

    /**
     * Create a new ApplicationEvent.
     *
     * @param code the object on which the event initially occurred (never {@code null})
     */
    private SpeechRecognizerEvent(final Code code) {
        super(code);
    }

    public enum Code {
        STOP, START;
    }
}
