# Define the base image
FROM node:18-alpine

# Install FFmpeg and FFprobe
# RUN apk --no-cache add ffmpeg
# Set the working directory in the container
WORKDIR /app
# make the node_modules cuz it might make things go faster idk tbher
COPY . .
# Expose port on which the app runs on
EXPOSE 3000
# Command to start app
CMD [ "npm", "start" ]