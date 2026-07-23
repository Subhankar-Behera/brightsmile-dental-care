# BrightSmile Dental Care - Backend

Spring Boot REST API for BrightSmile Dental Care.

---

## Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA
- Spring Validation
- Java Mail Sender
- MySQL
- Maven

---

## Features

- Appointment API
- Contact API
- Email Notification
- Validation
- Exception Handling

---

## Run Project

Run using Maven

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

## API Base URL

```
http://localhost:8080
```

---

## Project Structure

```
backend/
│
├── src/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

---

## Database

MySQL

Update database credentials in

```
src/main/resources/application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/brightsmile
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## Build

```bash
mvn clean install
```

---

## Author

Subhankar Behera
