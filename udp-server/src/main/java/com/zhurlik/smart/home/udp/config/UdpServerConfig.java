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

import java.net.InetAddress;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;
import java.util.Objects;

/**
 * Here will be started Netty server for handling UDP protocol.
 *
 * @author zhurlik@gmail.com
 */
@Configuration
public class UdpServerConfig {
    private final static Logger LOGGER = LoggerFactory.getLogger(UdpServerConfig.class);
    static final String BROADCAST = "broadcast";

    @Bean
    public NettyContext udpServer(final @Value("${server.address:broadcast}") String serverAddress,  final @Value("${server.port:8888}") int port) throws SocketException {
        LOGGER.info(">> Server port: {}", port);
        return UdpServer
                .create(addressToListen(serverAddress), port)
                .newHandler(this::handler)
                .block();
    }

    private String addressToListen(final String serverAddress) throws SocketException {
        final String addr = !BROADCAST.equals(serverAddress) ? serverAddress : Collections.list(NetworkInterface.getNetworkInterfaces())
                .stream()
                .flatMap(networkInterface -> networkInterface.getInterfaceAddresses().stream())
                .map(InterfaceAddress::getBroadcast)
                .filter(Objects::nonNull)
                .findFirst()
                .map(InetAddress::getHostAddress)
                .orElse("127.0.0.1");

        LOGGER.info(">> Server Address: {}", addr);
        return addr;
    }

    private Publisher<Void> handler(final UdpInbound in, final UdpOutbound out) {
        in.receive()
                .asString()
                .map(String::trim)
                //.log()
                .subscribe(s -> LOGGER.debug(">> UDP Packet: {}", s));

        return Flux.never();
    }
}
