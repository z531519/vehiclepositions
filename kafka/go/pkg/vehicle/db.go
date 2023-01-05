package vehicle

import (
	"context"
	"strconv"

	"github.com/go-redis/redis/v8"
)

var db *DB
var dbgeo *DB

type DB struct {
	Context    context.Context
	RedisDB    *redis.Client
	RedisDBGeo *redis.Client
}

func RedisDB(config Config) *DB {
	if db == nil {
		db = &DB{}
	} else {
		return db
	}

	db.Context = context.Background()
	db.RedisDB = redis.NewClient(&redis.Options{
		Addr:     config.RedisServer,
		Password: "",             // no password set
		DB:       config.RedisDB, // use default DB
	})

	db.RedisDBGeo = redis.NewClient(&redis.Options{
		Addr:     config.RedisServer,
		Password: "",
		DB:       config.RedisDBGeo,
	})

	return db
}

func (db DB) save(vp VehiclePosition) (err error) {
	err = db.RedisDB.Set(db.Context, strconv.Itoa(vp.Veh), vp, 0).Err()
	if err != nil {
		return err
	}
	loc := redis.GeoLocation{
		Latitude:  vp.lat,
		Longitude: vp.long,
	}

	err = db.RedisDBGeo.GeoAdd(context.Background(), strconv.Itoa(vp.Veh), &loc).Err()

	return err
}
