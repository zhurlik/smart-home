package com.zhurlik.smart.home.sphinx.event;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertSame;

public class SpeechRecognizerEventTest {
    @Test
    void testMain() {
        assertSame(SpeechRecognizerEvent.Code.START, SpeechRecognizerEvent.START.getSource());
        assertSame(SpeechRecognizerEvent.Code.STOP, SpeechRecognizerEvent.STOP.getSource());
    }
}
