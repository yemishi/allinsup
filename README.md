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
  ├── /frontend       
  ├── /backend 
```
## Screenshots
Mobile
<div style="display:flex;flex-wrap: wrap;gap:2px">
  <img src="/frontend/public/screenshots/home-mob.png" alt="Home Page Mobile" width="300" />
  <img src="/frontend/public/screenshots/order-mob.png" alt="Order Page Mobile" width="300" />
  <img src="/frontend/public/screenshots/product-mob.png" alt="product Page Mobile" width="300" />
</div>


Desktop
  
  ![Home page desktop](/frontend/public/screenshots/home-desk.png)

  ![Product page desktop](/frontend/public/screenshots/product-desk.png)
  
  ![Order page desktop](/frontend/public/screenshots/orders-desk.png)

## Setup 

Follow the intrutions bellow to config and run in your local ambient

### 1.Clone the repository

```bash
git clone https://github.com/yemishi/allinsup.git
```
### Navigate to the frontend and install dependencies
cd protain-ecommerce/frontend
npm install

### Navigate to the backend and install dependencies
cd ../backend
npm install

### Configure environment variables
Create .env files in both frontend and backend directories based on the provided .env.example files.
- Frontend .env example:VITE_API_URL=https://your-backend-url.com/api
- Backend .env example: 
JWT_SECRET="Your_jwt_secret"
MONGODB_CONNECT_URL="Your_database_url"

FIREBASE_KEY="Your_firebae_key"
FIREBASE_DOMAIN="Your_firebase_domain"

DEFAULT_PRODUCT_PHOTO="Your_product_photo_default_url"
APP_URL="Your_app_url"

### Run the project 
frontend 
 cd frontend
 npm run dev
backend 
 cd backend
 npm run dev
### Access the project 
 - Frontend: http://localhost:3000
 - Backend: http://localhost:5000

## Important Notes
 Ensure both frontend and backend are running concurrently.
 Never share sensitive environment variables like database connection strings or API keys.
