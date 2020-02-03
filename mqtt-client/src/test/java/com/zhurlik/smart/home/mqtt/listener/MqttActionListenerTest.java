package com.zhurlik.smart.home.mqtt.listener;

import org.eclipse.paho.client.mqttv3.IMqttAsyncClient;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * @author zhurlik@gmail.com
 */
@ExtendWith(MockitoExtension.class)
public class MqttActionListenerTest {
    @InjectMocks
    private MqttActionListener mqttActionListener;

    @Mock
    private  IMqttMessageListener mqttMessageListener;

    @Mock
    private IMqttToken mqttToken;

    @Test
    void testOnSuccessWhenConnected() throws Exception {
        final IMqttAsyncClient mqttAsyncClient = mock(IMqttAsyncClient.class);

        // mocked
        when(mqttToken.getClient()).thenReturn(mqttAsyncClient);
        when(mqttAsyncClient.getClientId()).thenReturn("test client id");
        when(mqttAsyncClient.isConnected()).thenReturn(true);

        // call
        mqttActionListener.onSuccess(mqttToken);

        // verify
        verify(mqttAsyncClient, times(1)).subscribe("test", 1, mqttMessageListener);
    }

    @Test
    void testOnSuccessWhenNotConnected() throws Exception {
        final IMqttAsyncClient mqttAsyncClient = mock(IMqttAsyncClient.class);

        // mocked
        when(mqttToken.getClient()).thenReturn(mqttAsyncClient);
        when(mqttAsyncClient.getClientId()).thenReturn("test client id");
        when(mqttAsyncClient.isConnected()).thenReturn(false);

        // call
        mqttActionListener.onSuccess(mqttToken);

        // verify
        verify(mqttAsyncClient, never()).subscribe("test", 1, mqttMessageListener);
    }

    @Test
    void testOnFailure() {
        mqttActionListener.onFailure(null, null);
    }
}
