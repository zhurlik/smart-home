package com.zhurlik.smart.home.udp;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import reactor.ipc.netty.NettyContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * To check that the app is up and running.
 *
 * @author zhurlik@gmail.com
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(
        classes = Application.class,
        properties = {
                "server.port=9999"
        }
)
@ActiveProfiles({"test"})
public class ApplicationTest {

    @Autowired
    private NettyContext netty;

    @Autowired
    private ApplicationContext context;

    @AfterEach
    void tearDown() {
        netty.dispose();
    }

    @Test
    void testUp() {
        assertNotNull(context);
    }
}
