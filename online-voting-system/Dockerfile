# 👉 Stage 1: Build the app with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies first
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the full source
COPY src ./src

# Build the jar (skip tests to save time)
RUN mvn clean package -DskipTests

# 👉 Stage 2: Run the app with a lightweight JDK image
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the jar built in previous stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
