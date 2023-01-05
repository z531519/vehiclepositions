
package com.vehicle;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.vehicle.data.VehiclePositionRepository;
import com.vehicle.model.VehiclePosition;


@RestController
public class Controller {

	@Autowired
    private VehiclePositionRepository vehiclePositionRepository;

    @GetMapping("/vehicle/positions")
    public Iterable<VehiclePosition> findAll() {        
        return vehiclePositionRepository.findAll();
    }

    @GetMapping("/vehicle/positions/{veh}")
    public Optional<VehiclePosition> find(@PathVariable("veh") int veh) {        
        return vehiclePositionRepository.findById(veh);
    }

}
