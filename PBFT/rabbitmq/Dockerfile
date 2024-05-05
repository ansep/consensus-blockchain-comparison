# Use the official RabbitMQ image as the base image
FROM rabbitmq:3.13.2

# Set environment variables
# ENV RABBITMQ_DEFAULT_USER=myuser
# ENV RABBITMQ_DEFAULT_PASS=mypassword

RUN rabbitmq-plugins enable rabbitmq_management

# Expose the RabbitMQ management console port
EXPOSE 15672

# Expose the RabbitMQ AMQP port
EXPOSE 5672

# Copy any additional configuration files
# COPY rabbitmq.conf /etc/rabbitmq/

# Run RabbitMQ on container startup
CMD ["rabbitmq-server"]