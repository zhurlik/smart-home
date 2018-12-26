package com.zhurlik.smart.home.sphinx.listener;

import com.zhurlik.smart.home.sphinx.event.AudioScannerEvent;
import com.zhurlik.smart.home.sphinx.event.AudioScannerEvent.Code;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.Resource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PipedOutputStream;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Reads wav files as a stream in the shared folder and sends to SpeechRecognizer.
 *
 * NOTE: there is async method with infinity looping.
 *
 * @author zhurlik@gmail.com
 */
@Component
public class AudioCaptureListener implements ApplicationListener<AudioScannerEvent> {
    private final static Logger LOGGER = LoggerFactory.getLogger(AudioCaptureListener.class);

    private final AtomicBoolean stop = new AtomicBoolean(false);

    @Value("${audio.capture.dir}")
    private Resource audioCaptureDir;

    @Autowired
    private PipedOutputStream speechOut;

    @Async
    @Override
    public void onApplicationEvent(final AudioScannerEvent event) {
        final Code code = (Code) event.getSource();
        switch (code) {
            case STOP:
                stop();
                break;
            case START:
                scan();
                break;
            default:
                throw new UnsupportedOperationException("Unsupported event for Audio Capture");
        }
    }

    private void scan() {
        while(!stop.get()) {
            try {
                TimeUnit.SECONDS.sleep(1);
                Files.walkFileTree(Paths.get(audioCaptureDir.getURI()), new SimpleFileVisitor<>() {
                    @Override
                    public FileVisitResult visitFile(final Path path, final BasicFileAttributes attrs) {
                        push(path);

                        return FileVisitResult.CONTINUE;
                    }
                });
            } catch (Exception e) {
                LOGGER.error(">> Something wrong with scanning", e);
            }
        }
    }

    /**
     * Only wav files should be sent to SpeechRecognizer.
     *
     * @param path audio file
     */
    private void push(final Path path) {
        if (path.toString().endsWith(".wav")) {
            LOGGER.debug(">> Wav file: {}", path);

            try {
                speechOut.write(Files.readAllBytes(path));

                final boolean isDeleted = path.toFile().delete();
                LOGGER.debug(">> Audio file has been deleted: {}", isDeleted);
            } catch (IOException e) {
                LOGGER.error(">> Error during reading audio file:", e);
            }
        }
    }

    private void stop() {
        stop.set(true);
        try {
            speechOut.close();
        } catch (IOException e) {
            LOGGER.error(">> Something wrong with closing pipes", e);
        }
    }
}
