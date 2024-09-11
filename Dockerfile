FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application.
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application, instead of dev since out in production
CMD ["npm", "run", "start"]
