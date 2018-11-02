package com.zhurlik.smart.home.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

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
        final MqttConnectOptions connectOptions = mqttConfig.mqttConnectOptions();
        final IMqttActionListener actionListener = mock(IMqttActionListener.class);

        // call
        final IMqttAsyncClient mqttAsyncClient = mqttConfig.mqttAsyncClient("tcp://localhost:1883", actionListener, connectOptions);

        // verify
        assertNotNull(mqttAsyncClient);
        assertNotNull(mqttAsyncClient.getClientId());
        assertEquals("tcp://localhost:1883", mqttAsyncClient.getServerURI());
        TimeUnit.SECONDS.sleep(2);
        mqttAsyncClient.close();
        verify(actionListener, times(0)).onSuccess(isA(IMqttToken.class));
        verify(actionListener, times(1)).onFailure(isA(IMqttToken.class), isA(Throwable.class));
    }
}