# Prologue & Set-up | InGenius Internship Round 1
*This project was a case-study from InGenius's internship, round 1 on constructing a back-end API that handles all CRUD operations.*

### stack:
- Node.js
- Typescript
- Express.js
- Jest (& supertest)
- .JSON

### Set-up project for personal testing:

1. Clone the repository:
```bash
git clone https://github.com/DevHelio/InGenius-BE-Case-Study-round1.git
```

2. Install dependencies:
```bash
npm install
```
*In case npm install does not install every depency correctly make sure to read through package.json and install each package separate!*

3. Run the project:
```bash
npm run dev
# (This only works if nodemon is installed! INSTALL NODEMON: npm install -g nodemon)
```
### For more documentation on the project:
When you manage to run the project, you can access the API documentation by visiting the following URL:
```bash
http://localhost:8000/api-docs/
# Please note that port :8000 is the default, if you change the port you should also change it for this URL
```

# Requirements for the case-study:
**The requirements for this case-study consisted of the following:**
### Data Persistence

- Store all data in JSON files:
    - courses.json: store all course data;
    - modules.json: store all module data;
    - lessons.json: store all lesson data.
- Implement efficient read/write operations to these files.

### API Endpoints

- Design RESTful endpoints for all CRUD operations.
- Implement proper route handling and middleware.

### Error Handling

- Implement global error-handling middleware.
- Provide meaningful error messages and appropriate HTTP status codes.

### Logging

- Implement logging for all API requests and errors.
- Use a logging library like Winston for structured logging.

### Input Validation

- Validate all input data using a validation library like Joi.
- Ensure type safety with TypeScript interfaces/types.

### Testing

- Write unit tests for all business logic.
- Implement integration tests for API endpoints.

# Conclusions

This project was a great learning experience for me, I actually got to use JEST for the first time and I honestly still don't understand what Swagger/openAPI really does. Although I tried to make my typescript more strict I felt comfortable using typescript in combination with Express.js.

It was kinda weird having to save data in .JSON files, I wasn't used to that so I believe many things could've gone better.

### Things to improve on:
- Everything could go faster if I used an asynchronous structure.
- My unit tests aren't too reliable, it feels incomplete.
- I forgot to use Joi for input validation and produced my own validation functions, which were a nightmare.
- I should stop using console.log for debugging and start things like Winston.


### End
I hope you enjoyed reading this README and I hope you have a great day! :D