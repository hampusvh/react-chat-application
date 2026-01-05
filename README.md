# React Chat Application

This project is a web-based chat application built with React and Vite, powered by the Chatify API for authentication, messaging, and user profile management.

The application requires user registration and authentication and provides real-time messaging, profile management, and multi-conversation support with a strong focus on security.

---

## Overview

The application allows authenticated users to participate in conversations, manage their profiles, and exchange messages in a secure environment. Access to chat and profile functionality is restricted to authenticated users only.

---

## Features

### Authentication
- User registration and login using the Chatify API
- CSRF token fetched via `PATCH /csrf` and used during registration and login
- JWT returned upon successful authentication and stored in `localStorage`
- Protected routes ensure that only authenticated users can access chat and profile pages
- Display of the authenticated user’s username and avatar in the interface

### Chat Functionality
- Communication with the `/messages` endpoint
- Fetching and displaying messages in conversations
- Own messages rendered on the right, other users’ messages on the left
- Creation of new messages with content sanitization to prevent XSS
- Deletion of the user’s own messages
- Support for multiple conversations using `conversationId`

### Profile Management
- Profile handling via `/user` and `/users` endpoints
- Update of username, email, and avatar
- Real-time avatar preview when entering a new image URL
- Account deletion with confirmation feedback, cleanup of `localStorage`, and automatic logout

### Navigation and Logout
- Navigation handled through a `SideNav` component
- Displays user avatar, username, and navigation links
- Logout clears the JWT and redirects the user to the login page

---

## Security Considerations

- CSRF tokens are used exclusively during registration and login
- JWTs are validated and checked for expiration
- A strict **Content Security Policy (CSP)** limits allowed image sources to trusted domains (`i.pravatar.cc`, `freeimage.host`)
- All user-generated message content is sanitized before being sent to prevent XSS attacks

---

## Additional Functionality

- Error logging and monitoring via **Sentry**
- Support for multiple conversations using `conversationId`
- Deployment on **Netlify** with a working CORS configuration

---

## Project Structure (src/)

```
src/
├── api/
│   ├── auth.js            # Login, register, fetch CSRF token
│   ├── messages.js        # Message CRUD operations
│   └── user.js            # Fetch, update, and delete users
│
├── components/
│   ├── AvatarPreview.jsx  # Live preview of avatar URL
│   ├── MessageList.jsx    # Message list rendering
│   ├── ProtectedRoute.jsx # Route protection
│   └── SideNav.jsx        # Navigation and logout
│
├── config/
│   └── api.js             # API_URL configuration
│
├── pages/
│   ├── Chat.jsx           # Chat interface and message handling
│   ├── Login.jsx          # Login form
│   ├── Profile.jsx        # Edit and delete user profile
│   └── Register.jsx       # Registration form
│
├── styles/
│   ├── Auth.css           # Login and register styling
│   ├── Chat.css           # Chat component styling
│   ├── Global.css         # Global styles
│   └── SideNav.css        # Navigation styling
│
├── utils/
│   └── jwt.js             # decodeToken(), isTokenExpired()
│
├── App.jsx                # Routing and protected routes
└── main.jsx               # Application entry point
```
