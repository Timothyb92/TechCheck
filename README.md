# TechCheck

**TechCheck** is a matchmaking platform for _Street Fighter 6_ players, helping you connect with others based on rank and main character to practice specific matchups.

Now live at **[https://techcheck.gg](https://techcheck.gg)**

---

## 🛠 Tech Stack

### Backend

- **Node.js** & **Express** – REST API with Socket.io for real-time features
- **PostgreSQL** – Relational database
- **Sequelize** – ORM for database access
- **JWT** – Secure authentication
- **Discord OAuth2** – Account verification

### Frontend

- **React** – UI development with Socket.io client integration
- **Vite** – Build tooling
- **Axios** – API requests

---

## 🚀 Live Deployment

- **Frontend**: [https://techcheck.gg](https://techcheck.gg) (Vercel)
- **Backend**: Hosted on Railway
- **Database**: PostgreSQL (Railway)

---

## 🧪 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/Timothyb92/TechCheck.git
cd TechCheck
```

### 2. Discord OAuth Setup

Create a Discord application at:  
[https://discord.com/developers/applications](https://discord.com/developers/applications)

Set your **Redirect URI** (e.g., `http://localhost:8000/api/auth/discord/callback`)  
And note the following:

- Client ID
- Client Secret

Whitelist your redirect URI in the "OAuth2" settings.

---

### 3. Configure Environment Variables

#### `backend/.env`

```env
DATABASE_URL=postgres://<user>:<password>@localhost:5432/techcheck

DISCORD_API_ENDPOINT=https://discord.com/api/v10
DISCORD_TOKEN_ENDPOINT=https://discord.com/api/oauth2/token
DISCORD_TOKEN_REVOCATION_ENDPOINT=https://discord.com/api/oauth2/token/revoke
DISCORD_REDIRECT_URI=http://localhost:8000/api/auth/discord/callback
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

API_BASE_URL=http://localhost:8000
CLIENT_BASE_URL=http://localhost:5173

NODE_ENV = development
```

#### `frontend/.env`

```env
VITE_BASE_URL=http://localhost:8000
```

---

### 4. Install Dependencies

From the root directory:

```bash
npm install
```

---

### 5. Start the App

```bash
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend
cd frontend
npm run dev
```

---

### 6. Launch the App

Open [http://localhost:5173](http://localhost:5173) in your browser and sign in with your Discord account to begin.

---

## 📁 Project Structure

```
TechCheck/
├── backend/       # Express + Sequelize API
├── frontend/      # React + Vite client
└── README.md
```

---

## 📄 License

[MIT](LICENSE)
