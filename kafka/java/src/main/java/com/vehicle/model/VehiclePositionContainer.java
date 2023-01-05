package com.vehicle.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class VehiclePositionContainer {

  @JsonProperty("VP")
  private VehiclePosition VP;

  public VehiclePosition getVP() {
    return VP;
  }

  public void setVP(VehiclePosition vC) {
    VP = vC;
  }

  
  
}