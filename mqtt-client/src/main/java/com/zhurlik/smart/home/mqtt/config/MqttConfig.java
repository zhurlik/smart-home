package com.zhurlik.smart.home.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

/**
 * Settings for MQTT communications.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class MqttConfig {

    @Bean
    public IMqttAsyncClient mqttAsyncClient(final @Value("${mqtt.server.url}") String url) throws MqttException {
        final String publisherId = UUID.randomUUID().toString();

        return new MqttAsyncClient(url, publisherId);
    }
}
