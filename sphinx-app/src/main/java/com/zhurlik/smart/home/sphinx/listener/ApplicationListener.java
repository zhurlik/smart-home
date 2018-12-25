package com.zhurlik.smart.home.sphinx.listener;

import com.zhurlik.smart.home.sphinx.event.AudioScannerEvent;
import com.zhurlik.smart.home.sphinx.event.SpeechRecognizerEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * Main listener for handling application events for starting/stopping other listeners.
 *
 * @author zhurlik@gmail.com
 */
@Component
public class ApplicationListener {

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @EventListener
    public void up(final ContextRefreshedEvent event) {
        eventPublisher.publishEvent(SpeechRecognizerEvent.START);
        eventPublisher.publishEvent(AudioScannerEvent.START);
    }

    @EventListener
    public void down(final ContextClosedEvent event) {
        eventPublisher.publishEvent(AudioScannerEvent.STOP);
        eventPublisher.publishEvent(SpeechRecognizerEvent.STOP);
    }
}
