package com.zhurlik.smart.home.sphinx.event;

import org.springframework.context.ApplicationEvent;

/**
 * Events for Audio Scanner that reads wav files as a streams from shared network folder.
 *
 * @author zhurlik@gmail.com
 */
public final class AudioScannerEvent extends ApplicationEvent {

    /**
     * Event for starting scanning process.
     */
    public static final AudioScannerEvent START = new AudioScannerEvent(Code.START);

    /**
     * Event for stopping scanning process.
     */
    public static final AudioScannerEvent STOP = new AudioScannerEvent(Code.STOP);

    /**
     * Create a new ApplicationEvent.
     *
     * @param code the object on which the event initially occurred (never {@code null})
     */
    private AudioScannerEvent(final Code code) {
        super(code);
    }

    /**
     * A set of codes to identify events.
     */
    public enum Code {
        /**
         * Stop.
         */
        STOP,

        /**
         * Start.
         */
        START
    }
}
