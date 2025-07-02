# Use a base Java image with JDK 17
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file into the container
<<<<<<< HEAD
COPY target/*.jar app.jar
=======
COPY target/online-voting-system-0.0.1-SNAPSHOT.jar app.jar

>>>>>>> a39cf0c (Added Dockerfile and built jar)

# Expose the port your app will run on
EXPOSE 8080

# Command to run your application
CMD ["java", "-jar", "app.jar"]
