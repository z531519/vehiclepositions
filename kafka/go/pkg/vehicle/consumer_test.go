package vehicle

import (
	"context"
	"os"
	"testing"
	"time"

	"sample-go/pkg/gnomock/preset/kafka"

	"github.com/orlangure/gnomock"
	"github.com/stretchr/testify/require"
)

func Test_Consumer(t *testing.T) {
	println("hello")

	messages := []kafka.Message{
		{
			Topic: "vehicle-positions",
			Key:   "order",
			Value: "1",
			Time:  time.Now().UnixNano(),
		},
	}

	k := kafka.Preset(
		// kafka.WithTopics("vehicle-position"),
		kafka.WithMessages(messages...),
	)

	container, err := gnomock.Start(k,
		gnomock.WithDebugMode(), gnomock.WithLogWriter(os.Stdout),
		gnomock.WithContainerName("kafka"))
	require.NoError(t, err)

	config := Config{
		BootstrapServers: "localhost:49092",
		ConsumerGroup:    "vpconsumer",
	}
	StartConsumer(config)

	t.Cleanup(func() { _ = gnomock.Stop(container) })

}

func TestPreset(t *testing.T) {
	t.Parallel()

	messages := []kafka.Message{
		{
			Topic: "events",
			Key:   "order",
			Value: "1",
			Time:  time.Now().UnixNano(),
		},
		{
			Topic: "alerts",
			Key:   "CPU",
			Value: "92",
			Time:  time.Now().UnixNano(),
		},
	}

	p := kafka.Preset(
		kafka.WithVersion("latest"),
		kafka.WithTopics("topic-1", "topic-2"),
		kafka.WithMessages(messages...),
	)

	container, err := gnomock.Start(
		p,
		gnomock.WithDisableAutoCleanup(),
		gnomock.WithDebugMode(), gnomock.WithLogWriter(os.Stdout),
		gnomock.WithContainerName("kafka"),
	)
	require.NoError(t, err)

	defer func() { require.NoError(t, gnomock.Stop(container)) }()

	_, cancel := context.WithTimeout(context.Background(), time.Second*30)
	defer cancel()

}
