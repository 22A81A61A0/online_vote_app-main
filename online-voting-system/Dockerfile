# Use a base Java image with JDK 17
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file into the container
COPY target/*.jar app.jar

# Expose the port your app will run on
EXPOSE 8080

# Command to run your application
CMD ["java", "-jar", "app.jar"]
