package com.zhurlik.smart.home.udp.config;

import org.junit.jupiter.api.Test;
import reactor.ipc.netty.NettyContext;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class UdpServerConfigTest {
    private final UdpServerConfig config = new UdpServerConfig();
    @Test
    void testMain() throws Exception {
        final NettyContext nettyContext = config.udpServer(9999);
        assertNotNull(nettyContext);

        TimeUnit.SECONDS.sleep(15);
        nettyContext.dispose();
    }
}
