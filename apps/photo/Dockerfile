FROM amazoncorretto:17-alpine-jdk as base

WORKDIR /app

COPY . /app/.

RUN ./mvnw install

FROM base as dev

CMD [ "./mvnw","spring-boot:run" ]