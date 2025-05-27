# TechCheck

TechCheck is a full-stack platform designed for Street Fighter 6 players to connect and practice specific matchups. The app uses Discord OAuth2 for authentication, a Node.js + Express backend, and a Vite-powered React frontend.

---

## Tech Stack

### Backend

- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **PostgreSQL** – Relational database
- **Sequelize** – ORM for PostgreSQL
- **JWT** – Token-based authentication
- **Discord OAuth2** – User authentication

### Frontend

- **React** – UI library
- **Vite** – Frontend build tool
- **Axios** – HTTP requests

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Timothyb92/TechCheck.git
cd TechCheck
```

### 2. Discord OAuth2 Setup

Create a Discord application at https://discord.com/developers/applications  
Get your:

- Client ID
- Client Secret
- Redirect URI (e.g., `http://localhost:8000/auth/discord/callback`)

Ensure your redirect URI is whitelisted in your Discord application settings.

---

### 3. Environment Configuration

#### Backend `.env`

Create a file at `backend/.env` with:

```env
DATABASE_URL=postgres://<user>:<password>@localhost:5432/techcheck

DISCORD_API_ENDPOINT=https://discord.com/api/v10
DISCORD_TOKEN_ENDPOINT=https://discord.com/api/oauth2/token
DISCORD_TOKEN_REVOCATION_ENDPOINT=https://discord.com/api/oauth2/token/revoke
DISCORD_REDIRECT_URI=http://localhost:8000/auth/discord/callback
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

JWT_SECRET=your_jwt_secret

API_BASE_URL=http://localhost:8000
CLIENT_BASE_URL=http://localhost:5173
```

#### Frontend `.env`

Create a file at `frontend/.env` with:

```env
VITE_BASE_URL=http://localhost:8000
```

---

### 4. Install Dependencies

```bash
# From the root directory:
npm install
```

---

### 5. Run the App

In one terminal from the root directory:

```bash
npm run dev
```

Alternatively, in two separate terminals:

```bash
# Terminal 1: backend
cd backend
npm run dev

# Terminal 2: frontend
cd frontend
npm run dev
```

---

### 6. Navigate

Open your browser to `http://localhost:5173` and sign in via Discord to begin using TechCheck.

---

## Folder Structure

```
TechCheck/
├── backend/       # Express + Sequelize API
├── frontend/      # React + Vite client
└── README.md
```

---

## License

MIT
