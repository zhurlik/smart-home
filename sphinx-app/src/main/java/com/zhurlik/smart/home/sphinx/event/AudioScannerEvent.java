package com.zhurlik.smart.home.sphinx.event;

import org.springframework.context.ApplicationEvent;

/**
 * Events for Audio Scanner that reads wav files as a streams from shared network folder.
 *
 * @author zhurlik@gmail.com
 */
public final class AudioScannerEvent extends ApplicationEvent {
    public final static AudioScannerEvent START = new AudioScannerEvent(Code.START);
    public final static AudioScannerEvent STOP = new AudioScannerEvent(Code.STOP);

    /**
     * Create a new ApplicationEvent.
     *
     * @param code the object on which the event initially occurred (never {@code null})
     */
    private AudioScannerEvent(final Code code) {
        super(code);
    }

    public enum Code {
        STOP, START
    }
}
