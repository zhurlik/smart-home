package com.zhurlik.smart.home.sphinx.config;

import edu.cmu.sphinx.api.Configuration;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Unit tests that use mocks and fake spring context.
 *
 * @author zhurlik@gmail.com
 */
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = SphinxConfig.class)
@TestPropertySource(properties = {
        "sphinx.use.grammar=true",
        "sphinx.grammar.path=test-grammar-path",
        "sphinx.acoustic.model.path=acoustic-test-path",
        "sphinx.language.model.path=language-test-path",
        "sphinx.dictionary.path=test-dict"
})
public class SphinxConfigTest {

    @Autowired
    private Configuration sphinx;

    @Test
    void testMain() {
        assertNotNull(sphinx);
        assertTrue(sphinx.getUseGrammar());
        assertEquals("smart-home", sphinx.getGrammarName());
        assertEquals("test-grammar-path", sphinx.getGrammarPath());
        assertEquals("acoustic-test-path", sphinx.getAcousticModelPath());
        assertEquals("language-test-path", sphinx.getLanguageModelPath());
        assertEquals("test-dict", sphinx.getDictionaryPath());
        assertEquals(8000, sphinx.getSampleRate());
    }

    @Test
    void testDefault() {
        final Configuration conf = new SphinxConfig().sphinx();
        assertFalse(conf.getUseGrammar());
        assertNull(conf.getGrammarName());
        assertNull(conf.getGrammarPath());
        assertNull(conf.getAcousticModelPath());
        assertNull(conf.getLanguageModelPath());
        assertNull(conf.getDictionaryPath());
    }
}
