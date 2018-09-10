package com.zhurlik.smart.home.udp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Flux;
import reactor.ipc.netty.NettyContext;
import reactor.ipc.netty.udp.UdpServer;

/**
 * Here will be started Netty server for handling UDP protocol.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class UdpServerConfig {

    @Bean
    public NettyContext udpServer(final @Value("${server.port}") int port) {

        return UdpServer.create(port)
                .newHandler((in, out) -> {
                    // todo: add a handler
                    return Flux.never();
                })
                .block();
    }
}
