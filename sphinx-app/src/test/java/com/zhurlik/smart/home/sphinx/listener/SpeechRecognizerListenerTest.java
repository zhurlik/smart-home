package com.zhurlik.smart.home.sphinx.listener;

import com.zhurlik.smart.home.sphinx.event.SpeechRecognizerEvent;
import edu.cmu.sphinx.api.SpeechResult;
import edu.cmu.sphinx.api.StreamSpeechRecognizer;
import edu.cmu.sphinx.result.Result;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.PipedInputStream;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SpeechRecognizerListenerTest {

    @InjectMocks
    private SpeechRecognizerListener listener;

    @Mock
    private StreamSpeechRecognizer streamSpeechRecognizer;

    @Mock
    private PipedInputStream in;

    @Test
    void testStart() {
        // Given
        final Result result = mock(Result.class);
        final SpeechResult speechResult = new SpeechResult(result);

        when(streamSpeechRecognizer.getResult())
                .thenReturn(speechResult)
                .thenReturn(null);
        when(result.getBestResultNoFiller()).thenReturn("test");

        // When
        listener.onApplicationEvent(SpeechRecognizerEvent.START);

        // Then
        verify(streamSpeechRecognizer).startRecognition(in);
    }

    @Test
    void testStop() {
        // Given, When
        listener.onApplicationEvent(SpeechRecognizerEvent.STOP);

        // Then
        verify(streamSpeechRecognizer).stopRecognition();
    }

    @Test
    void testNull() {
        assertThrows(NullPointerException.class, () -> listener.onApplicationEvent(null));
    }
}
