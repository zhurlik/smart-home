package com.zhurlik.smart.home.sphinx.config;

import edu.cmu.sphinx.api.Configuration;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;

/**
 * Unit tests that use mocks and fake spring context.
 *
 * @author zhurlik@gmail.com
 */
class SphinxConfigTest {
    private final SphinxConfig config = new SphinxConfig();

    @Test
    void testMain() {
        final Configuration sphinx = config.sphinx();
        assertNotNull(sphinx);
        assertFalse(sphinx.getUseGrammar());
        assertNull(sphinx.getGrammarName());
        assertNull(sphinx.getGrammarPath());
        assertNull(sphinx.getAcousticModelPath());
        assertNull(sphinx.getLanguageModelPath());
        assertNull(sphinx.getDictionaryPath());
        assertEquals(0, sphinx.getSampleRate());
    }

    @Test
    void testBeans() throws IOException {
        final Configuration mockConfiguration = mock(Configuration.class);

        assertThrows(NullPointerException.class, () -> config.streamSpeechRecognizer(mockConfiguration));
        assertNotNull(config.speechIn());
        assertNotNull(config.speechOut(config.speechIn()));
    }
}
