package com.zhurlik.smart.home.sphinx.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Settings for Sphinx.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class SphinxConfig {
    @Bean
    public edu.cmu.sphinx.api.Configuration sphinx() {
        final edu.cmu.sphinx.api.Configuration conf = new edu.cmu.sphinx.api.Configuration();
        // Set path to acoustic model.
        conf.setAcousticModelPath("resource:/zero_ru.cd_cont_4000");
        // Set path to dictionary.
        conf.setDictionaryPath("resource:/sphinx/smart-home-ru.dic");
        // Set language model.
        conf.setLanguageModelPath("resource:/zero_ru.cd_cont_4000/ru.lm");

        conf.setGrammarPath("resource:/sphinx");
        conf.setGrammarName("smart-home");
        conf.setUseGrammar(true);

        return conf;
    }
}
