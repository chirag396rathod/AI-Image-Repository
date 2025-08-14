```markdown
# AI Image Repository

A full-stack web application that generates images from text using **Laxica AI**.  
The project features a **React.js** frontend and a **Node.js** backend, allowing users to input text prompts and receive AI-generated images in real-time.  

Frontend is hosted on **Netlify** and the backend is hosted on **Render**.

---

## 🚀 Features

- Generate images from text prompts using **Laxica AI API**.
- Simple, responsive React.js user interface.
- Backend API to handle AI requests and responses.
- Secure communication between frontend and backend.
- Hosted online for easy access (Netlify + Render).

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Axios (for API calls)
- Netlify (hosting)

**Backend:**
- Node.js
- Express.js
- Render (hosting)

**AI Service:**
- Laxica AI (Text-to-Image generation)

---

## 📂 Project Structure

```

AI-Image-Repository/
├── Frontend/            # React.js application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── Backend/             # Node.js API server
├── src/
├── routes/
├── controllers/
├── package.json
└── ...

````

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- Laxica AI API Key

---

### 1️⃣ Clone the repository
```bash
git clone https://github.com/chirag396rathod/AI-Image-Repository.git
cd AI-Image-Repository
````

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
```

**Edit `.env`** with:

```env
PORT=5000
LAXICA_API_KEY=your_api_key_here
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd ../Frontend
npm install
cp .env.example .env
```

**Edit `.env`** with:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Run frontend:

```bash
npm start
```

---

## 🔌 API Endpoints

**POST** `/generate-image`
Generate an image from a text prompt.

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

* **Frontend**: [Netlify](https://www.netlify.com/)
* **Backend**: [Render](https://render.com/)

---

## 📸 Example Usage

**Prompt:**
`A majestic lion sitting on a throne under the stars`

**Generated Image:**
![AI-6](https://github.com/user-attachments/assets/9ee672f0-f393-4eee-9e78-e785a283e05b)
![AI-3](https://github.com/user-attachments/assets/b0dc9f4c-518e-4681-b58c-5bfb9f27f2d6)
![AI-8](https://github.com/user-attachments/assets/1e9838aa-2fcf-4f37-ba6b-1e47c6e4b744)

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 📧 Contact

Maintained by [**Chirag Rathod**](https://github.com/chirag396rathod).
For inquiries, open an issue or connect via GitHub.

```
