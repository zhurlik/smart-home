package com.zhurlik.smart.home.sphinx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Main class for running the application.
 *
 * @author zhurlik@gmail.com
 */
@SpringBootApplication
@EnableAsync
public final class Application {

    /**
     * Protected constructor.
     */
    private Application() {
    }

    /**
     * Just for starting spring-boot app.
     *
     * @param args program argument
     * @throws InterruptedException when issue with thread
     */
    public static void main(final String[] args) throws InterruptedException {
        SpringApplication.run(Application.class, args);
        Thread.currentThread().join();
    }
}
