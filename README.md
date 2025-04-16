# 🌤️ Weather Search App

A sleek React application that allows users to search for cities and view their current weather conditions in real-time.

---

## 🚀 Technologies Used

- **React 18**
- **TypeScript**
- **Material UI**
- **Vite**
- **Axios**
- **React Router DOM**
- **Jest & React Testing Library**

---

## 🛠️ Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) or npm

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kenmaqqe/amazon_agency_test.git
   cd weather-search-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

### ⚙️ Environment Setup

Create a `.env` file in the root directory and add your WeatherAPI key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_API_URI = 'https://api.weatherapi.com/v1/'
```

---

## 📜 Available Scripts

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `yarn dev`             | Start the development server   |
| `yarn build`           | Build the app for production   |
| `yarn test`            | Run unit tests                 |
| `yarn test --coverage` | Run tests with coverage report |

---

## 🧭 Project Structure

```plaintext
src/
├── assets/          # Static assets (images, icons)
├── components/
│   ├── Search/      # Search component with autocomplete
│   └── Weather/     # Weather display component
├── pages/
│   ├── Home/        # Home page with search
│   └── Weather/     # Weather details page
├── services/        # API service functions
├── types/           # TypeScript interfaces and types
└── App.tsx          # Root component
```

---

## ✨ Features

- 🔍 City search with autocomplete
- ☁️ Real-time weather display
- 📱 Responsive design
- ❗ Error handling & loading states
- 🔀 Page navigation

---

## 🌐 API Integration

This project integrates with [WeatherAPI](https://www.weatherapi.com/) for:

- Autocomplete city search
- Fetching current weather conditions

---

## 🧪 Testing

Unit tests are written using **Jest** and **React Testing Library**.

To run tests:

```bash
yarn test
```

To run with coverage:

```bash
yarn test --coverage
```

---

## 📄 License

This project is licensed under the **MIT License**.
