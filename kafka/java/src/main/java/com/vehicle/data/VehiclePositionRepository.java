package com.vehicle.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vehicle.model.VehiclePosition;

@Repository
public interface VehiclePositionRepository extends CrudRepository<VehiclePosition, Integer> {
}
