package com.zhurlik.smart.home.udp.config;

import org.reactivestreams.Publisher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Flux;
import reactor.ipc.netty.NettyContext;
import reactor.ipc.netty.udp.UdpInbound;
import reactor.ipc.netty.udp.UdpOutbound;
import reactor.ipc.netty.udp.UdpServer;

/**
 * Here will be started Netty server for handling UDP protocol.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class UdpServerConfig {
    private final static Logger LOGGER = LoggerFactory.getLogger(UdpServerConfig.class);

    @Bean
    public NettyContext udpServer(final @Value("${server.port}") int port) {
        return UdpServer
                .create("127.0.0.1", port)
                .newHandler(this::handler)
                .block();
    }

    private Publisher<Void> handler(final UdpInbound in, final UdpOutbound out) {
        in.receive()
                .asString()
                //.log()
                .subscribe(s -> LOGGER.debug(">> UDP packet:{}", s));

        return Flux.never();
    }
}
