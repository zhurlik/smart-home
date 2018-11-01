package com.zhurlik.smart.home.mqtt.listener;

import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * A listener is registered on an MqttToken and a token is associated with an action like connect or publish.
 *
 * @author zhurlik@gmail.com
 */
@Component
public class MqttActionListener implements IMqttActionListener {
    private final static Logger LOGGER = LoggerFactory.getLogger(MqttActionListener.class);

    private final IMqttMessageListener mqttMessageListener;

    public MqttActionListener(final IMqttMessageListener mqttMessageListener) {
        this.mqttMessageListener = mqttMessageListener;
    }

    @Override
    public void onSuccess(final IMqttToken asyncActionToken) {
        final IMqttAsyncClient mqttAsyncClient = asyncActionToken.getClient();

        LOGGER.debug("MQTT Client: {} is connected: {}", mqttAsyncClient.getClientId(), mqttAsyncClient.isConnected());

        try {
            // TODO: extract topics into properties
            mqttAsyncClient.subscribe("/test", 1, mqttMessageListener);
        } catch (MqttException e) {
            LOGGER.error("MQTT Error:", e);
        }
    }

    @Override
    public void onFailure(final IMqttToken asyncActionToken, final Throwable exception) {
        LOGGER.debug("MQTT action fails:", exception);
    }
}
