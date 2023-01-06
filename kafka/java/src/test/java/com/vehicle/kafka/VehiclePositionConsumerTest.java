package com.vehicle.kafka;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.awaitility.Awaitility.await;

import org.apache.commons.compress.utils.Lists;
import org.awaitility.Durations;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.annotation.DirtiesContext;

import com.adelean.inject.resources.junit.jupiter.GivenJsonResource;
import com.adelean.inject.resources.junit.jupiter.TestWithResources;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vehicle.data.VehiclePositionRepository;
import com.vehicle.model.VehiclePositionContainer;

@SpringBootTest(classes = TestRedisConfiguration.class)
@DirtiesContext
@EmbeddedKafka(partitions = 1, brokerProperties = { "listeners=PLAINTEXT://localhost:9092", "port=9092" })
@TestWithResources
public class VehiclePositionConsumerTest {
  
  @Autowired
  private KafkaTemplate<String, String> kafkaTemplate;

  @Autowired
  private VehiclePositionRepository repository;

  @Value("${test.topic}")
  private String topic;

  @GivenJsonResource("/sample.json") 
  static VehiclePositionContainer sampleJson;

  @Autowired
  private ObjectMapper objectMapper;


  @Test
  public void givenEmbeddedKafkaBroker_whenSendingWithSimpleProducer_thenMessageReceived()
      throws Exception {

    String jsonValue = objectMapper.writeValueAsString(sampleJson);
    kafkaTemplate.send(topic, jsonValue);
    await().atMost(Durations.TEN_SECONDS).untilAsserted(() -> {
      var exampleEntityList = repository.findAll();      
      assertEquals(1, Lists.newArrayList( exampleEntityList.iterator()).size());
  });

  }
}
