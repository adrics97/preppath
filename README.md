# PrepPath 🚀

**Your Interview Preparation Companion**

PrepPath is a full-stack web application designed to help developers organize their job search process, track applications, and prepare for technical interviews. Built with modern technologies and best practices.

🔗 **Live Demo:** [preppathapp.com](https://preppathapp.com) *(Coming soon)*

---

## 📸 Screenshots

*Screenshots will be added here*

---

## ✨ Features

### 🎯 Job Application Tracking
- Create and manage job applications with detailed information
- Track application status through the entire interview pipeline
- Filter applications by status (Applied, Screening, Technical, Final, Offer, Rejected)
- View upcoming interviews at a glance
- Add notes, salary expectations, and job URLs

### 🏢 Company Database
- Maintain a personal database of companies
- Store company details: location, industry, size, culture notes
- Quick search and filter functionality
- Link companies to applications

### 📚 Technical Question Bank
- Build your personal library of interview questions
- Organize by category: Algorithms, Data Structures, System Design, Behavioral, and more
- Difficulty levels: Easy, Medium, Hard
- Add solutions, hints, and personal notes
- Mark questions as favorites
- Track how many times you've practiced each question

### 📊 Dashboard & Analytics
- Real-time statistics of your job search
- Visual overview of application statuses
- Track upcoming interviews
- Monitor your progress at a glance

### 🔐 Secure Authentication
- JWT-based authentication
- Secure password encryption with BCrypt
- Protected routes and API endpoints

---

## 🛠️ Tech Stack

### Backend
![Java](https://img.shields.io/badge/Java-17-007396?style=flat&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-6DB33F?style=flat&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker&logoColor=white)

- **Framework:** Spring Boot 3.2.2
- **Language:** Java 17
- **Database:** PostgreSQL 15
- **Security:** Spring Security + JWT
- **ORM:** JPA/Hibernate
- **Validation:** Bean Validation
- **Build Tool:** Maven
- **Containerization:** Docker

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Context API

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │Dashboard │ │ Applications│ │Companies│ │Questions │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                     │                                        │
│              React Router + Context API                      │
└─────────────────────┼───────────────────────────────────────┘
                      │ HTTP/REST (Axios)
                      │ JWT Authentication
┌─────────────────────▼───────────────────────────────────────┐
│                  Backend (Spring Boot)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              REST API Controllers                      │  │
│  │   Auth  │  User  │  Application  │  Company  │ Question│  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                     │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │                Service Layer                          │  │
│  │        Business Logic + Validation                    │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                     │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │    Repository Layer (Spring Data JPA)                │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                     │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │          Security (JWT + Spring Security)            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │ JDBC
┌─────────────────────▼───────────────────────────────────────┐
│                    PostgreSQL Database                       │
│   Users  │  Companies  │  Applications  │  Questions  │      │
│          │  Practice Sessions                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

### Main Entities

**Users**
- User account information
- Authentication credentials
- Profile details (LinkedIn, GitHub, experience)

**Companies**
- Company information
- Industry, location, size
- Culture notes and website links

**Applications**
- Job application details
- Status tracking (Applied → Offer)
- Salary expectations
- Interview dates and feedback

**Questions**
- Technical interview questions
- Category and difficulty
- Personal solutions and notes
- Practice tracking

**Practice Sessions**
- Study session records
- Self-assessment ratings
- Time spent per question

---

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Docker & Docker Compose**
- **Maven** (or use included wrapper)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/preppath.git
   cd preppath
   ```

2. **Start PostgreSQL with Docker**
   ```bash
   cd preppath-backend
   docker-compose up -d
   ```

3. **Configure application.properties**
   
   Update `src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5433/preppath_db
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   jwt.secret=your-secret-key-here
   ```

4. **Run the backend**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   Backend will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd preppath-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at `http://localhost:5173`

### Default Test Account

After first run, you can register a new account or use:
- **Email:** test@preppath.com
- **Password:** test123

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Create new account
POST   /api/auth/login       - Login user
GET    /api/auth/test        - Test endpoint
```

### Applications
```
GET    /api/applications                    - Get all user applications
POST   /api/applications                    - Create new application
GET    /api/applications/{id}               - Get application by ID
PUT    /api/applications/{id}               - Update application
DELETE /api/applications/{id}               - Delete application
GET    /api/applications/status/{status}    - Filter by status
GET    /api/applications/interviews/upcoming - Get upcoming interviews
GET    /api/applications/stats              - Get application statistics
```

### Companies
```
GET    /api/companies              - Get all companies
POST   /api/companies              - Create new company
GET    /api/companies/{id}         - Get company by ID
PUT    /api/companies/{id}         - Update company
DELETE /api/companies/{id}         - Delete company
GET    /api/companies/search       - Search companies
```

### Questions
```
GET    /api/questions                      - Get all user questions
POST   /api/questions                      - Create new question
GET    /api/questions/{id}                 - Get question by ID
PUT    /api/questions/{id}                 - Update question
DELETE /api/questions/{id}                 - Delete question
GET    /api/questions/category/{category}  - Filter by category
GET    /api/questions/favorites            - Get favorite questions
PATCH  /api/questions/{id}/favorite        - Toggle favorite status
```

### Users
```
GET    /api/users/me    - Get current user profile
PUT    /api/users/me    - Update user profile
DELETE /api/users/me    - Delete user account
```

*Full API documentation available at: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)*

---

## 🎨 Design Highlights

- **Modern UI:** Clean, professional interface built with Tailwind CSS
- **Responsive:** Fully responsive design for mobile, tablet, and desktop
- **Gradient Branding:** Eye-catching blue-to-indigo gradient for brand identity
- **Intuitive Navigation:** Clear navigation with persistent navbar
- **Status Badges:** Color-coded badges for quick status recognition
- **Modal Forms:** Clean modal dialogs for create/edit operations
- **Filtering:** Advanced filtering options for applications and questions

---

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Encryption:** BCrypt hashing for password storage
- **Protected Routes:** Frontend and backend route protection
- **CORS Configuration:** Secure cross-origin resource sharing
- **Input Validation:** Comprehensive validation on all user inputs
- **SQL Injection Prevention:** Parameterized queries with JPA

---

## 🧪 Testing

### Backend Tests
```bash
cd preppath-backend
./mvnw test
```

### Frontend Tests
```bash
cd preppath-frontend
npm run test
```

---

## 📦 Deployment

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Add environment variables:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `JWT_SECRET`
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` (backend URL)
6. Deploy

---

## 🗺️ Roadmap

- [ ] Practice session tracking
- [ ] Advanced analytics with charts
- [ ] Email reminders for interviews
- [ ] Export data to PDF
- [ ] Mobile app (React Native)
- [ ] AI-powered question suggestions
- [ ] Integration with LinkedIn API
- [ ] Collaborative features for study groups

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/adrics97)
- LinkedIn: [Your Name](https://www.linkedin.com/in/adri%C3%A1n-sanchis-soria-50a876221/)
- Email: adrics97@gmail.com

---

## 🙏 Acknowledgments

- Built as a portfolio project to demonstrate full-stack development skills
- Inspired by the need for better interview preparation tools
- Special thanks to the Spring Boot and React communities

---

## 📊 Project Stats

- **Total Endpoints:** 43 REST APIs
- **Database Tables:** 5 main entities with relationships
- **Lines of Code:** ~10,000+ (Backend + Frontend)
- **Development Time:** 6-8 weeks
- **Test Coverage:** 85%+ (target)

---

**⭐ Star this repo if you find it helpful!**

