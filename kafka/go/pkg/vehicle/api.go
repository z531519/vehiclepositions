package vehicle

import (
	"context"
	"encoding/json"

	"github.com/gin-gonic/gin"
)

var config Config

func StartApi(config Config) {
	config = config
	r := gin.Default()
	r.GET("/ping", Ping)
	r.GET("vehicle/positions", GetAll)
	r.GET("vehicle/positions/:id", Get)
	r.Run()
}

func Ping(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func GetAll(c *gin.Context) {

	db := RedisDB(config)
	ctx := context.Background()
	value, _ := db.RedisDB.Keys(ctx, "*").Result()

	c.JSON(200, gin.H{
		"message": value,
	})
}

func Get(c *gin.Context) {
	db := RedisDB(config)
	ctx := context.Background()
	id := c.Param("id")
	value, _ := db.RedisDB.Get(ctx, id).Result()
	vp := VehiclePosition{}
	err := json.Unmarshal([]byte(value), &vp)
	if err != nil {
		c.AbortWithError(500, err)
	}
	c.JSON(200, vp)

}
