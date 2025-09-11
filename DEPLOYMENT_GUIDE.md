# 🚀 Portfolio Deployment Guide

## 📋 Project Overview
Professional portfolio website with award-winning design, email integration, and performance optimizations.

## 🛠️ Tech Stack
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: Node.js + Express + Mongoose  
- **Database**: MongoDB Atlas
- **Email**: Nodemailer + Gmail SMTP

## 🔧 Deployment Platforms
- **Database**: MongoDB Atlas ✅ (Already configured)
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel (Free tier)

## 📊 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb+srv://admin-garuka:oSf9ZROxrfDm7fkD@cluster0.qvui8de.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=portfolio
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024-portfolio-secure
SESSION_SECRET=your-super-secret-session-key-change-in-production-2024-portfolio-secure
FRONTEND_URL=https://your-vercel-app.vercel.app

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=garukar9895@gmail.com
EMAIL_PASS=iswnplihuftlgoqw
EMAIL_TO=garukar9895@gmail.com
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-render-app.onrender.com
```

## 🚀 Deployment Steps

### 1. Backend Deployment (Render.com)
1. Sign up at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create new "Web Service"
4. Configure:
   - **Build Command**: `cd backend && yarn install`
   - **Start Command**: `cd backend && yarn start`
   - **Environment**: Add all backend env variables
5. Deploy!

### 2. Frontend Deployment (Vercel)
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build`
   - **Environment Variables**: Add REACT_APP_BACKEND_URL
4. Deploy!

### 3. Update CORS and URLs
1. Update backend FRONTEND_URL with your Vercel URL
2. Update frontend REACT_APP_BACKEND_URL with your Render URL
3. Redeploy both services

## ✅ Features Included
- ✨ Award-winning hero section with professional portrait
- 📧 Working contact form with email notifications
- 🎨 Performance-optimized animations
- 🌙 Light/dark theme support
- 📱 Fully responsive design
- 🔐 Admin panel with CRUD operations
- 🚀 Production-ready configuration

## 📞 Contact
- Email: garukar9895@gmail.com
- GitHub: https://github.com/GarukaR

---
**Portfolio is ready for production deployment! 🎉**