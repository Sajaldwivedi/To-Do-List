# Modern Task Manager

🌐 **Live Demo**: [https://to-do-list-zeta-wheat.vercel.app/](https://to-do-list-zeta-wheat.vercel.app/)

A beautiful and feature-rich task management application built with modern web technologies. Organize your tasks across different categories like Personal, Work, Shopping, and Planned tasks with a sleek and intuitive interface.

## ✨ Features

- **Authentication**: Secure user authentication powered by Firebase
- **Real-time Database**: Tasks are stored and synced in real-time using Firebase Firestore
- **Task Categories**: Organize tasks into Personal, Work, Shopping, and Planned categories
- **Task Progress Tracking**: Visual progress indicators for task completion
- **Task History**: View and manage your task completion history
- **Beautiful UI**: Modern and responsive design using Shadcn UI components
- **Dark Mode Support**: Built-in dark mode for comfortable viewing
- **Toast Notifications**: Elegant notifications for user actions
- **Responsive Layout**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn UI (Radix UI + Tailwind CSS)
- **State Management**: React Query
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with animations
- **Charts**: Recharts for data visualization

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/To-Do-List.git
   cd To-Do-List
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a Firebase project and add your configuration:
   - Create a new project in Firebase Console
   - Enable Authentication and Firestore
   - Copy your Firebase config and add it to the environment variables

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, etc.)
├── pages/          # Route components
├── lib/           # Utility functions and configurations
└── App.tsx        # Main application component
```

## 🔒 Authentication

The application uses Firebase Authentication for secure user management. Features include:
- Email/Password authentication
- Secure session management
- Protected routes
- User profile management

## 💾 Database

Firebase Firestore is used as the database with the following collections:
- `users`: User profiles and preferences
- `tasks`: Task data with categories and completion status
- `history`: Task completion history

## 🎨 UI/UX Features

- Responsive design that works on all devices
- Smooth animations and transitions
- Intuitive task management interface
- Progress tracking and visualization
- Category-based task organization
- Toast notifications for user feedback

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
