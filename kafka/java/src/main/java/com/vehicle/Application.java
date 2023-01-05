package com.vehicle;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.kafka.annotation.EnableKafkaStreams;
import org.springframework.kafka.support.converter.ByteArrayJsonMessageConverter;
import org.springframework.kafka.support.converter.RecordMessageConverter;

@SpringBootApplication
@EnableKafkaStreams
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


	@Bean
	public RecordMessageConverter converter() {		
		return new ByteArrayJsonMessageConverter();
	}


	@Bean
	@Profile("default") // Don't run from test(s)
	public ApplicationRunner runner() {
		return args -> {
			System.out.println("Vehicle Example.");
		};
	}
}
