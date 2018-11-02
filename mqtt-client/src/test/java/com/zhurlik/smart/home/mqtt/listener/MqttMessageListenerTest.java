package com.zhurlik.smart.home.mqtt.listener;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * @author zhurlik@gmail.com
 */
public class MqttMessageListenerTest {

    private final MqttMessageListener mqttMessageListener = new MqttMessageListener();

    @Test
    void test() {
        mqttMessageListener.messageArrived(null, null);
        assertTrue(true);
    }
}
