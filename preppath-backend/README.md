# PrepPath Backend 🚀

Interview Preparation Tracker - API REST con Spring Boot

## 📋 Descripción

PrepPath es una aplicación para gestionar todo tu proceso de búsqueda de empleo tech:
- Seguimiento de aplicaciones a empresas
- Banco de preguntas técnicas y comportamentales
- Registro de sesiones de práctica
- Dashboard con métricas y estadísticas

## 🛠️ Stack Tecnológico

- **Java 17**
- **Spring Boot 3.2.2**
- **PostgreSQL**
- **Spring Security + JWT**
- **JPA/Hibernate**
- **Lombok**
- **Maven**

## 📁 Estructura del Proyecto

```
preppath-backend/
├── src/
│   ├── main/
│   │   ├── java/com/preppath/
│   │   │   ├── PrepPathApplication.java
│   │   │   ├── model/
│   │   │   │   ├── User.java
│   │   │   │   ├── Company.java
│   │   │   │   ├── Application.java
│   │   │   │   ├── Question.java
│   │   │   │   └── PracticeSession.java
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── security/
│   │   │   └── exception/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── pom.xml
└── README.md
```

## 🗄️ Modelo de Datos

### Entidades:

**User** (usuarios)
- id, name, email, password
- phoneNumber, linkedinUrl, githubUrl
- currentPosition, yearsOfExperience
- Relaciones: applications, questions, practiceSessions

**Company** (empresas)
- id, name, location, websiteUrl
- industry, companySize, description, culture
- Relaciones: applications

**Application** (aplicaciones de trabajo)
- id, position, applicationDate, status
- jobUrl, expectedSalary, notes
- interviewDate, rejectionDate, offerDate
- Status: APPLIED, SCREENING, TECHNICAL, FINAL, OFFER, REJECTED, ACCEPTED, WITHDRAWN

**Question** (banco de preguntas)
- id, title, description, category, difficulty
- answer, hints, notes, sourceUrl
- isFavorite, timesPracticed
- Category: ALGORITHMS, DATA_STRUCTURES, SYSTEM_DESIGN, BEHAVIORAL, JAVASCRIPT, etc.
- Difficulty: EASY, MEDIUM, HARD

**PracticeSession** (sesiones de práctica)
- id, practiceDate, rating, timeSpentMinutes
- notes, completed
- Rating: EASY, MEDIUM, HARD, FAILED

## 🚀 Setup Inicial

### 1. Levantar PostgreSQL con Docker

```bash
# Desde la raíz del proyecto
docker-compose up -d

# Verificar que está corriendo
docker ps

# Ver logs si hay problemas
docker-compose logs postgres
```

**Comandos útiles:**
```bash
# Parar la base de datos
docker-compose down

# Parar y borrar los datos (empezar de cero)
docker-compose down -v

# Ver logs en tiempo real
docker-compose logs -f postgres
```

### 2. Conectar a PostgreSQL (opcional)

```bash
# Entrar al contenedor
docker exec -it preppath-db psql -U postgres -d preppath_db

# O desde tu terminal si tienes psql instalado
psql -h localhost -U postgres -d preppath_db
# Password: postgres
```

### 3. Configurar application.properties

Edita `src/main/resources/application.properties`:

```properties
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
jwt.secret=GENERA_UN_SECRET_SEGURO_AQUI
```

### 4. Ejecutar el Proyecto

```bash
# Desde IntelliJ IDEA:
# 1. Abre el proyecto
# 2. Maven reload (botón derecho en pom.xml)
# 3. Run PrepPathApplication

# Desde terminal:
./mvnw spring-boot:run
```

La API estará disponible en: `http://localhost:8080`

## 📝 Próximos Pasos

1. ✅ Modelos creados
2. ⬜ Crear Repositories
3. ⬜ Crear Services
4. ⬜ Crear Controllers
5. ⬜ Implementar JWT Security
6. ⬜ Crear DTOs
7. ⬜ Manejo de excepciones
8. ⬜ Testing

## 🔐 Seguridad

- Autenticación con JWT
- Passwords encriptados con BCrypt
- CORS configurado para React (localhost:3000, localhost:5173)

## 📚 Recursos

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

---

**Desarrollado por:** [Tu Nombre]  
**Para:** Portfolio de desarrollador
