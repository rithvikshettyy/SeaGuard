# SeaGuard

![SeaGuard Logo](./frontend/assets/logo.png)

SeaGuard is a comprehensive mobile assistant for fishermen, designed to promote safety, sustainability, and efficiency at sea. This application provides vital information and tools to help fishermen navigate, log catches, and stay safe.

## 🚀 Key Features

- **Potential Fishing Zone (PFZ):** Helps locate areas with a high probability of fish availability.
- **Safety Alerts:** Provides real-time alerts for disasters, International Boundary Lines (IBL), and no-fishing zones.
- **SOS & Emergency:** A dedicated SOS feature for emergency situations.
- **Catch Logging:** Easily log and manage catch details, including species, volume, and location.
- **Trip Planning:** Tools to plan fishing trips effectively.
- **GPS Navigation:** Integrated GPS for tracking and navigation.
- **Guides & Resources:** Information on fishing gear, nets, and important contacts.
- **Weather Updates:** A widget for current weather conditions.
- **Multi-language Support:** The app is designed to be used in multiple languages.

## 🛠️ Tech Stack

- **Framework:** React Native with Expo
- **Language:** JavaScript
- **State Management:** React Context
- **Styling:** Custom components and stylesheets

## 🏛️ Architecture

![Architecture Diagram](./assets/architecture.png)
*(Note: Add your architecture diagram to the `./assets` folder for it to be displayed here.)*

## 📂 Project Structure

```
frontend/
├── assets/         # Static assets like images, icons, and data files
├── components/     # Reusable UI components (e.g., buttons, navbars)
├── constants/      # Global constants (colors, static text)
├── contexts/       # React Context for global state (e.g., LanguageContext)
├── hooks/          # Custom React hooks (e.g., useTranslation)
├── screens/        # Top-level screen components for each feature
├── templates/      # Reusable screen layouts
└── utils/          # Utility functions and configurations
```

## 🏁 Getting Started

### Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)

### Installation

1.  Clone the repository:
    ```sh
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd SeaGuard/frontend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1.  Start the Expo development server:
    ```sh
    npx expo start
    ```
2.  Scan the QR code with the Expo Go app on your Android or iOS device, or run in a simulator.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve the app, please feel free to open an issue or submit a pull request.
