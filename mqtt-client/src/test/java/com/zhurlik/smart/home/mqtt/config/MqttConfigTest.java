package com.zhurlik.smart.home.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.spy;

/**
 * Unit tests for MQTT settings.
 *
 * @author zhurlik@gmail.com
 */
@ExtendWith(MockitoExtension.class)
class MqttConfigTest {

    private MqttConfig mqttConfig = new MqttConfig();

    @Test
    void testMQttConnectOptions() {
        final MqttConnectOptions connectOptions = mqttConfig.mqttConnectOptions();
        assertTrue(connectOptions.isAutomaticReconnect());
        assertTrue(connectOptions.isCleanSession());
        assertEquals(10, connectOptions.getConnectionTimeout());
    }

    @Test
    void testMQttAsyncClient() throws Exception {
        // TODO: needs embedded ActiveMQ
        final IMqttActionListener  mqttActionListener = spy(IMqttActionListener.class);
        final MqttConnectOptions connectOptions = mqttConfig.mqttConnectOptions();

        // call
        final IMqttAsyncClient mqttAsyncClient = mqttConfig.mqttAsyncClient("tcp://test-url", mqttActionListener, connectOptions);

        // verify
        assertNotNull(mqttAsyncClient);
        mqttAsyncClient.disconnect();
        mqttAsyncClient.close();
    }
}