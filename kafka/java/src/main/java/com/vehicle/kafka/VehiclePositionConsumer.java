package com.vehicle.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.vehicle.data.VehiclePositionRepository;
import com.vehicle.model.VehiclePosition;


@Component
public class VehiclePositionConsumer {

	@Autowired
	VehiclePositionRepository vehiclePositionRepository;

	@KafkaListener(properties = { "auto.offset.reset=earliest" }, id = "vp-consumer", topics = {
		"vehicle-positions-slim" }, groupId = "vp-consumer")
	public void processor(VehiclePosition vp) throws InterruptedException {
		System.out.printf("value = %s\n",vp);
		vehiclePositionRepository.save(vp);
	}

}
