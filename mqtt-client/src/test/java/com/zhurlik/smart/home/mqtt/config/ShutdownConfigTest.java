package com.zhurlik.smart.home.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

/**
 * @author zhurlik@gmail.com
 */
class ShutdownConfigTest {

    private ShutdownConfig shutdownConfig = new ShutdownConfig();
    private IMqttAsyncClient mqttAsyncClient;

    @BeforeEach
    void setUp() {
        mqttAsyncClient = mock(IMqttAsyncClient.class);
        ReflectionTestUtils.setField(shutdownConfig, "mqttAsyncClient", mqttAsyncClient);
    }

    @Test
    void testCloseMQttClient() throws Exception {
        // call
        shutdownConfig.closeMQttClient();

        // verify
        verify(mqttAsyncClient, times(1)).disconnect();
        verify(mqttAsyncClient, times(1)).close();
    }
}
