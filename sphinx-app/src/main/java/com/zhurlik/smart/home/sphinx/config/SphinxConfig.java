package com.zhurlik.smart.home.sphinx.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Settings for Sphinx.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class SphinxConfig {
    @Value("${sphinx.acoustic.model.path:${user.dir}/sphinx-app/zero_ru_cont_8k_v3/zero_ru.cd_cont_4000}")
    private String acousticModelPath;

    @Value("${sphinx.dictionary.path}")
    private String dictionaryPath;

    @Value("${sphinx.language.model.path:${user.dir}/sphinx-app/zero_ru_cont_8k_v3/ru.lm}")
    private String languageModelPath;

    @Value("${sphinx.grammar.path}")
    private String grammarPath;

    @Value("${sphinx.grammar.name:smart-home}")
    private String grammarName;

    @Value("${sphinx.use.grammar:false}")
    private boolean useGrammar;

    @Value("${sphinx.sample.rate:8000}")
    private int sampleRate;

    @Bean
    public edu.cmu.sphinx.api.Configuration sphinx() {
        final edu.cmu.sphinx.api.Configuration conf = new edu.cmu.sphinx.api.Configuration();
        conf.setAcousticModelPath(acousticModelPath);
        conf.setDictionaryPath(dictionaryPath);
        conf.setLanguageModelPath(languageModelPath);

        if (useGrammar) {
            conf.setGrammarPath(grammarPath);
            conf.setGrammarName(grammarName);
            conf.setUseGrammar(true);
        }
        conf.setSampleRate(sampleRate);

        return conf;
    }
}
