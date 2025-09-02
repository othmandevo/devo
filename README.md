# Devo Store - E-commerce Platform

A modern, secure, and scalable e-commerce platform with Google OAuth authentication, user profiles, and a complete shopping experience.

## 🌟 Features

### Frontend
- **Modern iOS-style UI** with dark/light mode support
- **Fully responsive** design for all devices (mobile, tablet, desktop)
- **Real-time cart management** with persistent storage
- **Product catalog** with ratings and cart addition tracking
- **User authentication** with Google OAuth and local accounts
- **Profile management** with avatar upload and purchase history
- **Cross-browser compatible** (Chrome, Firefox, Safari, Edge)

### Backend
- **Node.js/Express** server with MongoDB database
- **Google OAuth 2.0** authentication
- **JWT-based sessions** with secure cookie handling
- **User account system** with profiles and purchase history
- **Product management** with ratings and reviews
- **Order processing** with status tracking
- **Security features**: CSRF protection, rate limiting, input validation
- **File uploads** with image processing

### Security
- **HTTPS-ready** with secure headers (Helmet)
- **Password hashing** with bcrypt
- **CSRF protection** for all forms
- **Rate limiting** to prevent abuse
- **Input sanitization** and validation
- **Session management** with secure cookies
- **MongoDB injection protection**

## 📁 Project Structure

```
devo-store/
├── index.html              # Main frontend page
├── style.css               # Frontend styles
├── script.js               # Frontend JavaScript
├── README.md               # This file
├── backend/                # Backend server
│   ├── package.json        # Node.js dependencies
│   ├── .env.example        # Environment variables template
│   ├── server.js           # Main server file
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js         # Authentication middleware
│   │   └── errorHandler.js # Error handling
│   ├── models/
│   │   ├── User.js         # User schema
│   │   ├── Product.js      # Product schema
│   │   ├── Order.js        # Order schema
│   │   └── Rating.js       # Rating schema
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── profile.js      # Profile management
│   │   ├── products.js     # Product routes
│   │   ├── orders.js       # Order management
│   │   └── users.js        # User routes
│   └── utils/
│       └── logger.js       # Logging utility
└── uploads/                # File uploads directory
```

## 🚀 Quick Start

### Frontend (GitHub Pages)
1. Upload `index.html`, `style.css`, and `script.js` to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://username.github.io/repository-name`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs
   - Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

5. Set up MongoDB:
   - Create a MongoDB database (local or MongoDB Atlas)
   - Update `MONGODB_URI` in `.env`

6. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables (.env)
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/devo_store

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Session Configuration
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:3000

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com
```

## 🔐 Authentication System

### Google OAuth Flow
1. User clicks "Continue with Google"
2. Redirected to Google consent screen
3. User authorizes the application
4. Google redirects back with authorization code
5. Server exchanges code for access token
6. Server fetches user profile from Google
7. User account is created/linked automatically
8. JWT token is generated and stored in secure cookies

### Local Authentication
- Email/password registration and login
- Password hashing with bcrypt
- Account lockout after failed attempts
- Email verification (optional)

### Session Management
- JWT tokens with refresh mechanism
- Secure HTTP-only cookies
- Automatic token refresh
- Session persistence across browser restarts

## 👤 User Features

### Profile Management
- **Display name** (editable)
- **Personal bio** (editable)
- **Avatar upload** with image processing
- **Account statistics** (purchases, total spent)
- **Purchase history** with order details

### Security Features
- **Password change** functionality
- **Account deletion** (soft delete)
- **Login attempt tracking**
- **IP address logging**
- **Session management**

## 🛒 E-commerce Features

### Shopping Cart
- **Add/remove items** with real-time updates
- **Quantity management** (increase/decrease)
- **Persistent storage** per user
- **Global cart addition tracking**

### Products
- **Product catalog** with images and descriptions
- **Rating system** with user reviews
- **Category filtering**
- **Search functionality**
- **Related products**

### Orders
- **Order creation** with multiple items
- **Order tracking** with status updates
- **Purchase history** for users
- **Order cancellation** and refund requests

## 🔒 Security Implementation

### Frontend Security
- **Input validation** on all forms
- **XSS prevention** with content sanitization
- **CSRF token** inclusion in requests
- **Secure cookie** handling

### Backend Security
- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** on all endpoints
- **Input sanitization** with express-validator
- **MongoDB injection** prevention
- **Password hashing** with bcrypt
- **JWT token** validation

### Data Protection
- **Encrypted passwords** in database
- **Secure session** storage
- **User data** isolation
- **Audit logging** for security events

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- **Fluid layouts** with CSS Grid and Flexbox
- **Adaptive typography** scaling
- **Touch-friendly** interface elements
- **Optimized images** for different screen sizes

## 🚀 Performance Optimization

### Frontend
- **Minimal bundle** size
- **Lazy loading** for images
- **Efficient DOM** manipulation
- **Optimized CSS** with variables

### Backend
- **Database indexing** for queries
- **Compression** middleware
- **Caching** strategies
- **Connection pooling** for MongoDB

## 🔍 SEO Optimization

### Meta Tags
- **Title** and description tags
- **Open Graph** tags for social sharing
- **Twitter Card** tags
- **Canonical** URLs

### Structured Data
- **JSON-LD** schema markup
- **Product** structured data
- **Organization** information
- **Breadcrumb** navigation

### Technical SEO
- **Semantic HTML** structure
- **Alt text** for images
- **Sitemap** generation
- **Robots.txt** configuration

## 🧪 Testing

### Frontend Testing
- **Cross-browser** compatibility
- **Responsive design** testing
- **Accessibility** testing (WCAG 2.1)
- **Performance** testing

### Backend Testing
- **API endpoint** testing
- **Authentication** flow testing
- **Database** operations testing
- **Security** testing

## 📈 Scalability

### Architecture
- **Modular** code structure
- **Separation** of concerns
- **Database** optimization
- **Caching** strategies

### Performance
- **Connection pooling** for database
- **Rate limiting** for API protection
- **Image optimization** for uploads
- **Efficient queries** with indexing

## 🛠️ Development

### Code Quality
- **ESLint** configuration
- **Consistent** coding style
- **Error handling** throughout
- **Comprehensive** logging

### Maintenance
- **Clear documentation** in code
- **Modular** architecture
- **Version control** best practices
- **Regular** security updates

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

### Version 2.0.0
- Added Google OAuth authentication
- Implemented user profile system
- Added purchase history tracking
- Enhanced security features
- Improved UI/UX design

### Future Plans
- Payment gateway integration
- Advanced analytics
- Admin dashboard
- Mobile app development
- Multi-language support

---

**Devo Store** - Building the future of e-commerce, one secure transaction at a time.
