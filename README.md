# AI Image Repository

A full-stack web application that generates images from text using Laxica AI.

The project includes a React.js frontend and a Node.js backend. Users submit text prompts and receive AI-generated images in real time. The frontend is hosted on Netlify, and the backend is hosted on Render.

---

## 🚀 Features

- **Text-to-image:** Generate images from text prompts via the Laxica AI API.
- **Responsive UI:** Clean, simple, and mobile-friendly React.js interface.
- **API gateway:** Node/Express backend handles AI requests and responses.
- **Secure routing:** Environment variables and separate services for safe communication.
- **Live hosting:** Frontend on Netlify and backend on Render for easy access.

---

## 🛠 Tech stack

- **Frontend:** React.js, Axios, Netlify (hosting)
- **Backend:** Node.js, Express.js, Render (hosting)
- **AI service:** Laxica AI (text-to-image generation)

---

## 📂 Project structure

```
AI-Image-Repository/
├── Frontend/             # React.js application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── Backend/              # Node.js API server
    ├── src/
    ├── routes/
    ├── controllers/
    ├── package.json
    └── ...
```

---

## ⚙️ Installation and setup

### Prerequisites

- **Node.js:** v14+ recommended
- **Package manager:** npm or yarn
- **API key:** Laxica AI API key

### 1️⃣ Clone the repository

```bash
git clone https://github.com/chirag396rathod/AI-Image-Repository.git
cd AI-Image-Repository
```

### 2️⃣ Backend setup

```bash
cd Backend
npm install
cp .env.example .env
```

**Environment variables:**

```env
PORT=5000
LAXICA_API_KEY=your_api_key_here
```

**Run the server:**

```bash
npm start
```

### 3️⃣ Frontend setup

```bash
cd ../Frontend
npm install
cp .env.example .env
```

**Environment variables:**

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

**Run the app:**

```bash
npm start
```

---

## 🔌 API endpoints

- **POST /generate-image:** Generate an image from a text prompt.

  Request body:
  ```json
  {
    "prompt": "A futuristic city in the clouds"
  }
  ```

  Response:
  ```json
  {
    "imageUrl": "https://link-to-generated-image.com"
  }
  ```

---

## 🌐 Deployment

- **Frontend:** Netlify
- **Backend:** Render

---

## 📸 Example usage

**Generated images:**  
![AI-6](https://github.com/user-attachments/assets/9ee672f0-f393-4eee-9e78-e785a283e05b)  
![AI-3](https://github.com/user-attachments/assets/b0dc9f4c-518e-4681-b58c-5bfb9f27f2d6)  
![AI-8](https://github.com/user-attachments/assets/1e9838aa-2fcf-4f37-ba6b-1e47c6e4b744)

---

## 🤝 Contributing

1. **Fork:** Fork the repository to your GitHub account.
2. **Branch:** Create a feature branch: `git checkout -b feature-name`.
3. **Commit:** Commit your changes: `git commit -m "Add new feature"`.
4. **Push:** Push to your branch: `git push origin feature-name`.
5. **PR:** Open a Pull Request describing your changes.

---

## 📜 License

- **Type:** MIT License

---

## 📧 Contact

- **Maintainer:** [Chirag Rathod](https://github.com/chirag396rathod)  
- **Support:** Open an issue or connect via GitHub.

---
