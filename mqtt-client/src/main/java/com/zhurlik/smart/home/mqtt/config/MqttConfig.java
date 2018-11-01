package com.zhurlik.smart.home.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

/**
 * Settings for connections with MQTT Broker.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class MqttConfig {

    private final static String MQTT_CLIENT_ID = UUID.randomUUID().toString();

    @Bean
    public MqttConnectOptions mqttConnectOptions() {

        final MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);
        options.setConnectionTimeout(10);

        return options;
    }

    @Bean
    public IMqttAsyncClient mqttAsyncClient(final @Value("${mqtt.server.url}") String url,
                                            final IMqttActionListener mqttActionListener,
                                            final MqttConnectOptions mqttConnectOptions) throws MqttException {
        final IMqttAsyncClient mqttAsyncClient = new MqttAsyncClient(url, MQTT_CLIENT_ID);
        mqttAsyncClient.connect(mqttConnectOptions, mqttActionListener);

        return mqttAsyncClient;
    }
}