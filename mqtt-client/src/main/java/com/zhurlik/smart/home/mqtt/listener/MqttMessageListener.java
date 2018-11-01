package com.zhurlik.smart.home.mqtt.listener;


import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * A simple listener for incoming MQTT messages.
 *
 * @author zhurlik@gmail.com
 */
@Component
public class MqttMessageListener implements IMqttMessageListener {
    private final static Logger LOGGER = LoggerFactory.getLogger(MqttMessageListener.class);

    @Override
    public void messageArrived(final String topic, final MqttMessage message) {
        LOGGER.debug(">> MQTT Message: {}", message);
    }
}
