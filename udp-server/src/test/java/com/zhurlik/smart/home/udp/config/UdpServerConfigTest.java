package com.zhurlik.smart.home.udp.config;

import org.junit.jupiter.api.Test;
import reactor.ipc.netty.NettyContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class UdpServerConfigTest {
    private final UdpServerConfig config = new UdpServerConfig();
    @Test
    void testMain() {
        final NettyContext nettyContext = config.udpServer(9999);
        assertNotNull(nettyContext);
        nettyContext.dispose();
    }
}
