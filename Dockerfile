FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

CMD ["npm", "start"]
