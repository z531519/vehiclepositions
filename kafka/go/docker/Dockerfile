FROM golang:alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Install Compile plug

RUN apk -U add ca-certificates
RUN apk update && apk upgrade && apk add pkgconf git bash build-base sudo
RUN git clone https://github.com/edenhill/librdkafka.git && cd librdkafka && ./configure --prefix /usr && make && make install


COPY pkg pkg
COPY cmd cmd
COPY config.yaml config.yaml

RUN go build -tags dynamic -o /vpconsumer ./cmd/sample

EXPOSE 8080

CMD [ "/vpconsumer" ]