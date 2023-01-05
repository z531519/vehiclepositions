package vehicle

import "encoding/json"

type VehiclePositionRoot struct {
	VP VehiclePosition `json:"VP"`
}

type VehiclePosition struct {
	Veh int

	Desi string
	Dir  string
	Oper int
	lat  float64
	long float64
}

func (i VehiclePosition) MarshalBinary() (data []byte, err error) {
	bytes, err := json.Marshal(i)
	return bytes, err
}
