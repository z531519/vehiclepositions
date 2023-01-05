package vehicle

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	BootstrapServers string `mapstructure:"bootstrap_servers"`
	ConsumerGroup string `mapstructure:"consumer_group"`
	RedisServer      string `mapstructure:"redis"`
	RedisDB          int
	RedisDBGeo       int
}

func InitConfig() (Config, error) {
	// Initialization
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AutomaticEnv()
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("fatal error config file: %w", err))
	}
	config := Config{}
	err = viper.Unmarshal(&config)

	fmt.Println(config)
	return config, err
}
