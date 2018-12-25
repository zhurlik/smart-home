package com.zhurlik.smart.home.sphinx.event;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AudioScannerEventTest {
    @Test
    void testMain() {
        assertEquals("Fetching Audio Files", AudioScannerEvent.FETCH.getSource());
    }
}
