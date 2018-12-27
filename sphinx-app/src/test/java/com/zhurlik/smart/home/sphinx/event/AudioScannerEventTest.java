package com.zhurlik.smart.home.sphinx.event;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertSame;

/**
 * Unit tests.
 */
class AudioScannerEventTest {
    @Test
    void testMain() {
        assertSame(AudioScannerEvent.Code.START, AudioScannerEvent.START.getSource());
        assertSame(AudioScannerEvent.Code.STOP, AudioScannerEvent.STOP.getSource());
    }
}
