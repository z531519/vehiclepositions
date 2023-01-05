FROM gradle:7.6.0-jdk17 AS builder
WORKDIR /home/gradle/project
COPY build.gradle ./
COPY src ./src
USER root
RUN gradle build
RUN ls -la /home/gradle/project/build/libs
FROM openjdk:18-buster
WORKDIR /app

COPY --from=builder /home/gradle/project/build/libs/project.jar /app/
COPY --from=builder /home/gradle/project/build/resources/main/application.yml /app/

CMD java -jar project.jar
        
