package com.zhurlik.smart.home.sphinx.listener;

import com.zhurlik.smart.home.sphinx.event.AudioScannerEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class AudioCaptureListenerTest {

    public static final int THREE = 3;
    @InjectMocks
    private AudioCaptureListener listener;

    @Spy
    private Resource testDir = new ClassPathResource("test-audio");

    @Spy
    private PipedOutputStream out = new PipedOutputStream();

    @BeforeEach
    void setUp() throws IOException {
        assertEquals(THREE, testDir.getFile().listFiles().length);
    }

    @Test
    void testScan() throws Exception {
        final PipedInputStream in = new PipedInputStream();
        out.connect(in);

        final ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.submit(() -> listener.onApplicationEvent(AudioScannerEvent.START));

        TimeUnit.SECONDS.sleep(2);

        listener.onApplicationEvent(AudioScannerEvent.STOP);
        final String actual = new String(in.readAllBytes(), StandardCharsets.UTF_8);
        assertTrue(actual.contains("first fake audio file"));
        assertTrue(actual.contains("second fake audio file"));
        assertFalse(actual.contains("should be skipped"));
    }
}
