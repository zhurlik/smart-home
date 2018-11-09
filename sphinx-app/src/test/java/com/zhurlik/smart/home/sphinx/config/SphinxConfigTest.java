package com.zhurlik.smart.home.sphinx.config;

import edu.cmu.sphinx.api.Configuration;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * @author zhurlik@gmail.com
 */
public class SphinxConfigTest {

    private SphinxConfig config = new SphinxConfig();

    @Test
    void testMain() {
        final Configuration sphinx = config.sphinx();
        assertTrue(sphinx.getUseGrammar());
        assertEquals("smart-home", sphinx.getGrammarName());
        assertEquals("resource:/sphinx", sphinx.getGrammarPath());
        assertEquals("resource:/zero_ru.cd_cont_4000", sphinx.getAcousticModelPath());
        assertEquals("resource:/zero_ru.cd_cont_4000/ru.lm", sphinx.getLanguageModelPath());
        assertEquals("resource:/sphinx/smart-home-ru.dic", sphinx.getDictionaryPath());
    }
}
