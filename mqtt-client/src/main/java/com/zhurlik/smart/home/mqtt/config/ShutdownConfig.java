package com.zhurlik.smart.home.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PreDestroy;

/**
 * A configuration to be able to close spring-boot app and all resources.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class ShutdownConfig {

    @Autowired
    private IMqttAsyncClient mqttAsyncClient;

    @PreDestroy
    public void closeMQttClient() throws MqttException {
        mqttAsyncClient.disconnect();
        mqttAsyncClient.close();
    }
}
