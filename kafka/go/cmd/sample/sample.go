package main

import (
	"fmt"

	"sample-go/pkg/vehicle"
)

func main() {

	config, err := vehicle.InitConfig()

	if err != nil { // Handle errors reading the config file
		panic(fmt.Errorf("fatal error config file: %w", err))
	}

	go vehicle.StartApi(config)
	vehicle.StartConsumer(config)

}
