

FROM openjdk:17-jdk-alpine3.14
WORKDIR /app
COPY target/laptopshop-0.0.1-SNAPSHOT.jar /app/laptopshop-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "laptopshop-0.0.1-SNAPSHOT.jar"]