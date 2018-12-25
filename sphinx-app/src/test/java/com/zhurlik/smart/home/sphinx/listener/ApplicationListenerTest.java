package com.zhurlik.smart.home.sphinx.listener;

import com.zhurlik.smart.home.sphinx.event.AudioScannerEvent;
import com.zhurlik.smart.home.sphinx.event.SpeechRecognizerEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ApplicationListenerTest {

    @InjectMocks
    private ApplicationListener listener;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @Test
    void testUp() {
        // Given, When
        listener.up(any(ContextRefreshedEvent.class));

        // Then
        verify(eventPublisher).publishEvent(SpeechRecognizerEvent.START);
        verify(eventPublisher).publishEvent(AudioScannerEvent.START);
    }

    @Test
    void testDown() {
        // Given, When
        listener.down(any(ContextClosedEvent.class));

        // Then
        verify(eventPublisher).publishEvent(AudioScannerEvent.STOP);
        verify(eventPublisher).publishEvent(SpeechRecognizerEvent.STOP);
    }
}
