package com.zhurlik.smart.home.udp.config;

import org.junit.jupiter.api.Test;
import reactor.ipc.netty.NettyContext;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Unit tests.
 */
class UdpServerConfigTest {
    private static final int SLEEP_FIVE = 5;
    private final UdpServerConfig config = new UdpServerConfig();

    @Test
    void testMain() throws Exception {
        final NettyContext nettyContext = config.udpServer("127.0.0.1", 9999);
        assertNotNull(nettyContext);

        TimeUnit.SECONDS.sleep(SLEEP_FIVE);
        nettyContext.dispose();
    }

    @Test
    void testBroadCast() throws Exception {
        final NettyContext nettyContext = config.udpServer(UdpServerConfig.BROADCAST, 9999);
        assertNotNull(nettyContext);

        TimeUnit.SECONDS.sleep(SLEEP_FIVE);
        nettyContext.dispose();
    }
}
