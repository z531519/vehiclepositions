package com.vehicle.kafka;

import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vehicle.model.VehiclePositionContainer;

@Component
public class VehiclePositionStream {
    private static final Serde<String> STRING_SERDE = Serdes.String();

    @Autowired
    private ObjectMapper objectMapper;


    @Autowired
    void buildPipeline(StreamsBuilder streamsBuilder) {
        KStream<String, String> messageStream = streamsBuilder
                .stream("vehicle-positions", Consumed.with(STRING_SERDE, STRING_SERDE));
        messageStream.mapValues(value -> {
            try {
                final VehiclePositionContainer vpContainer = objectMapper.readValue(value,
                        VehiclePositionContainer.class);
                return objectMapper.writeValueAsString(vpContainer.getVP());
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return null;
        }).to("vehicle-positions-slim");

    }

}
