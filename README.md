# allinsup
A complete e-commerce platform focusing on food and drink products. The project includes a frontend for user interactions and a backend for managing data, authentication, and order processing.


## Table of contents
- [Features](#Features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Setup](#setup)

## Features
# Frontend
- Dynamic product browsing with pagination and skeleton loading.
- Responsive UI with animations powered by Framer Motion.
- User authentication and protected routes.
- Shopping cart and checkout experience.
- Toast notifications for user feedback.
# Backend
- API endpoints for managing users, products, orders, and authentication.
- Secure session handling and token-based authentication with jsonwebtoken.
- Image uploads with multer.
- Data validation with zod.
- MongoDB for scalable and flexible database management.

## Technologies Used
#Frontend
- Frameworks/Libraries:React, React Router, Framer Motion, Swiper
- State Management:@tanstack/react-query
- Forms & Validation:React Hook Form, @hookform/resolvers, Zod
- Others: Axios, React Toastify, Blurhash, React Loading Skeleton
#Backend

- Server:Express
- Authentication:jsonwebtoken, passport
- Database:MongoDB with mongoose
- File Management:multer for uploads
- Security:bcrypt for password hashing
- Session Management:connect-mongo

## Project Structure 
```/protain-ecommerce
  ├── /frontend       # React-based frontend application
  ├── /backend 
