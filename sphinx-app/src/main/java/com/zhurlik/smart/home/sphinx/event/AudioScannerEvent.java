package com.zhurlik.smart.home.sphinx.event;

import org.springframework.context.ApplicationEvent;

/**
 * Events for Audio Scanner that reads wav files as a streams from shared network folder.
 *
 * @author zhurlik@gmail.com
 */
public final class AudioScannerEvent extends ApplicationEvent {
    public final static AudioScannerEvent FETCH = new AudioScannerEvent("Fetching Audio Files");
    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    private AudioScannerEvent(final String source) {
        super(source);
    }
}
