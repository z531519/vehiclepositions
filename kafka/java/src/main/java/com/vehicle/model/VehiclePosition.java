package com.vehicle.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash()
public class VehiclePosition {

  @Id
  private int veh;

  
  private String desi;
  private String dir;
  private String oper;

  
  public VehiclePosition() {
  }

  public String getDesi() {
    return desi;
  }

  public void setDesi(String desi) {
    this.desi = desi;
  }

  public String getDir() {
    return dir;
  }

  public void setDir(String dir) {
    this.dir = dir;
  }

  public String getOper() {
    return oper;
  }

  public void setOper(String oper) {
    this.oper = oper;
  }

  public int getVeh() {
    return veh;
  }

  public void setVeh(int veh) {
    this.veh = veh;
  }

}
