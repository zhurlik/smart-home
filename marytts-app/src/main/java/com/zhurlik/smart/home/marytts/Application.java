package com.zhurlik.smart.home.marytts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class for running the application.
 *
 * @author zhurlik@gmail.com
 */
@SpringBootApplication
public class Application {

    public static void main(final String[] args) throws InterruptedException {
        SpringApplication.run(Application.class, args);
        Thread.currentThread().join();
    }
}