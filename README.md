# grocery-system

  **Note  Add your  Mongo URL in the Docker-Compose File  
  
# Clone the repository: 
 git clone <repository_url>

# Install dependencies:
  npm install

# Running the Server
  npm start


# API Endpoints
   # Admin Routes: 
      POST /api/admin/add-item
      GET /api/admin/view-items
      DELETE /api/admin/remove-item/:id
      PUT /api/admin/update-item/:id
  # User Routes:
      GET /api/user/view-items
      POST /api/user/book-items

# API Key Authentication
  API endpoints are protected using API key authentication. Each request must include an API key in the headers.
  
  Admin API key: adminApiKey1
  User API key: userApiKey1
  
 # Example Usage

    curl --location 'http://localhost:3000/api/admin/view-items' \
    --header 'api-key: adminApiKey1'

 
# Feel free to adjust the details, formatting, and instructions according to your project's needs.





