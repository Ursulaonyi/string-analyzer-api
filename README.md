# String Analyzer API

A RESTful API service built with Node.js and Express that analyzes string properties including length, palindrome detection, character frequency, SHA256 hashing, and more.

**Status:** Active and Running ✓

## Features

- **String Analysis**: Comprehensive analysis of string properties
- **Palindrome Detection**: Case-insensitive palindrome checking
- **Character Frequency**: Track occurrence of each character
- **SHA256 Hashing**: Unique identification for each string
- **Advanced Filtering**: Filter strings by multiple criteria
- **Natural Language Queries**: Query strings using plain English
- **In-Memory Storage**: Fast, lightweight data persistence

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Crypto** - SHA256 hashing
- **PM2** - Process management (production)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/string-analyzer-api.git
cd string-analyzer-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3000
NODE_ENV=development
```

4. **Run the application**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Create String
Analyze and store a new string.

**Endpoint:** `POST /strings`

**Request Body:**
```json
{
  "value": "ursula is a devops engineer"
}
```

**Response:** `201 Created`
```json
{
  "id": "8f3e825d9f5b2c7a4e1f6d9c3b8a5e2f1d7c4b9a6e3f8d5c2a7b4e1f9d6c3a8b5e2",
  "value": "ursula is a devops engineer",
  "properties": {
    "length": 28,
    "is_palindrome": false,
    "unique_characters": 15,
    "word_count": 5,
    "sha256_hash": "8f3e825d9f5b2c7a4e1f6d9c3b8a5e2f1d7c4b9a6e3f8d5c2a7b4e1f9d6c3a8b5e2",
    "character_frequency_map": {
      "u": 2,
      "r": 2,
      "s": 3,
      "l": 1,
      "a": 2,
      "i": 2,
      "d": 1,
      "e": 4,
      "v": 1,
      "o": 1,
      "p": 1,
      "n": 2,
      "g": 1
    }
  },
  "created_at": "2025-10-20T12:00:00.000Z"
}
```

### 2. Get Specific String
Retrieve a stored string by its value.

**Endpoint:** `GET /strings/:stringValue`

**Example:**
```bash
GET /strings/ursula%20is%20a%20devops%20engineer
```

**Response:** `200 OK` (same structure as create)

### 3. Get All Strings
Retrieve all strings with optional filtering.

**Endpoint:** `GET /strings`

**Query Parameters:**
- `is_palindrome` (boolean) - Filter palindromes
- `min_length` (integer) - Minimum string length
- `max_length` (integer) - Maximum string length
- `word_count` (integer) - Exact word count
- `contains_character` (string) - Contains specific character

**Example:**
```bash
GET /strings?is_palindrome=true&min_length=5
```

**Response:** `200 OK`
```json
{
  "data": [...],
  "count": 5,
  "filters_applied": {
    "is_palindrome": true,
    "min_length": 5
  }
}
```

### 4. Natural Language Filter
Query strings using plain English.

**Endpoint:** `GET /strings/filter-by-natural-language`

**Query Parameters:**
- `query` (string) - Natural language query

**Supported Phrases:**
- "single word" or "one word"
- "palindromic" or "palindrome"
- "longer than X"
- "shorter than X"
- "contain letter X"

**Example:**
```bash
GET /strings/filter-by-natural-language?query=single%20word%20palindromic%20strings
```

**Response:** `200 OK`
```json
{
  "data": [...],
  "count": 3,
  "interpreted_query": {
    "original": "single word palindromic strings",
    "parsed_filters": {
      "word_count": 1,
      "is_palindrome": true
    }
  }
}
```

### 5. Delete String
Remove a string from storage.

**Endpoint:** `DELETE /strings/:stringValue`

**Example:**
```bash
DELETE /strings/ursula%20is%20a%20devops%20engineer
```

**Response:** `204 No Content`

### Health Check
**Endpoint:** `GET /health`

**Response:** `200 OK`
```json
{
  "status": "OK"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing \"value\" field"
}
```

### 404 Not Found
```json
{
  "error": "String does not exist in the system"
}
```

### 409 Conflict
```json
{
  "error": "String already exists in the system"
}
```

### 422 Unprocessable Entity
```json
{
  "error": "Invalid data type for \"value\" (must be string)"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Project Structure

```
string-analyzer-api/
├── src/
│   ├── controllers/
│   │   └── stringController.js    # Request handlers
│   ├── routes/
│   │   └── strings.js              # API routes
│   ├── storage/
│   │   └── store.js                # In-memory storage
│   ├── utils/
│   │   └── analyzer.js             # String analysis logic
│   └── server.js                   # Application entry point
├── .env                            # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Deployment

### Deploy to AWS EC2

1. **Set up EC2 instance** (Ubuntu, t2.micro free tier)

2. **Configure security group** to allow:
   - SSH (port 22)
   - HTTP (port 80)
   - Custom TCP (port 3000) - optional for direct access

3. **Connect to instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

4. **Install Node.js:**
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git
```

5. **Clone and setup:**
```bash
git clone https://github.com/your-username/string-analyzer-api.git
cd string-analyzer-api
npm install
```

6. **Create production .env:**
```bash
echo "PORT=3000" > .env
echo "NODE_ENV=production" >> .env
```

7. **Run with PM2:**
```bash
sudo npm install -g pm2
pm2 start src/server.js --name string-analyzer
pm2 startup
pm2 save
```

8. **Setup Nginx as reverse proxy:**
```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/default
```

Replace the `location /` block with:
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Save and restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

9. **Access your API:**
```
http://your-ec2-public-ip
```

No port number needed - Nginx routes traffic from port 80 to your app on port 3000!

## Testing

Use cURL or Postman to test endpoints:

```bash
# Create a string
curl -X POST http://localhost:3000/strings \
  -H "Content-Type: application/json" \
  -d '{"value":"ursula is a devops engineer"}'

# Get all strings
curl http://localhost:3000/strings

# Filter by word count
curl "http://localhost:3000/strings?word_count=5"

# Natural language query
curl "http://localhost:3000/strings/filter-by-natural-language?query=strings%20with%205%20words"

# Delete a string
curl -X DELETE http://localhost:3000/strings/ursula%20is%20a%20devops%20engineer
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Ursula Okafo - [ursulaokafo32@gmail.com](mailto:ursulaokafo32@gmail.com)

## Acknowledgments

- Built as part of Stage 1 Backend Challenge
- Inspired by modern string analysis tools
- Thanks to the Node.js and Express communities

---

**Live API:** `http://3.126.130.137` (served via Nginx on port 80)  
**GitHub:** `https://github.com/ursulaonyi/string-analyzer-api`