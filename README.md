# <ins>Professional Employee Tracker</ins>

---
## <ins>Table of contents</ins>
- [Installation](#Installation)
- [Usage](#Usage)
- [Mock-up](#Mock-up)
- [Contributing](#Contributing)
- [License](#License)
- [Documentation](#Documentation)
- [Links](#Links)

  
## You may be asking yourself "How can I keep better tabs of the employees in my company?" 

The answer to this question is extensive, so I'll stick to the main ideas, but rest assured, the answer is the Professional Employee Tracker. What does it do?
- Allows you to view every employee in your company along with their direct managers if they have one.
- Show's you the various roles these employees hold along with how much of your money they are getting.
- Allows you to see a full list of the individual departments of you company along with which employees work in them, respectively.
- Not only can you view all of these things, but you have the power to add, delete or update any of these selections as well with simple keyboard button strokes.

---

## <ins>Installation</ins> 
In order to create this README generator, I had to download the following:
- Node.js. This is the runtime environment I used in conjunciton with my IDE to code this project. You can download the current version of node.js [here](https://nodejs.org/en)
  
- ![node screenshot](https://github.com/user-attachments/assets/77cd0435-19f8-4444-8ed1-0f27b24bfc03)
- Once node.js is installed, you have to install the inquirer package with npm. Version 8.2.4
  
 ![inquirer screen shot](https://github.com/user-attachments/assets/b0e7af4d-ad04-4788-97c3-27d4eff9261d)

- You will also need to instal the 'pg' and 'dotenv' dependencies with npm for postgres and environment variables for security.

  ![image](https://github.com/user-attachments/assets/5db83798-5e00-43aa-9486-bb97dd332125)

  ![image](https://github.com/user-attachments/assets/547f831e-5692-4d81-88cb-37d1c69c90a4)



---
## <ins>Usage</ins>

To use this generator, first ensure you are in the correct directory for you database info and log into your PostgreSQL shell. Next, run the commands `\i schema.sql` to connect 
to the database and `\i seeds.sql` to ensure the database tables are properly populated. Finally, simply run the command `node index.js` in your terminal and the npm inquirer's *prompt* method will (no pun 
intended) prompt you to answer questions needed to manage your company's employees, in which you can navagate selections with the arrow keys.

---
## <ins>Mock-up</ins>

The following is a mockup of what the prompts in your terminal will look like:

![image](https://github.com/user-attachments/assets/2c71b7e2-44d8-4d9e-890e-da61b0d6c88a)

---
## <ins>Contributing</ins>
The following are some ways in which you can participate in this project:
- Submit bugs and feature requests, and help verify as they are checked in
- Review source code changes
- Review the documentation and make pull requests for anything from typos to refactoring to additional and new content.

---
## <ins>License</ins>
- This is licensed under the MIT license

---
## <ins>Documentation</ins>

The following resources will help you as they helped me understand and utilize SQL, PostgreSQL and NPM(node package manager):
- [Blog Rocket's blog entitled "CRUD REST API with Node.js, Express, and PostgreSQL"](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/)
- [Medium's article entitled "Integrating SQL Databases into Node.js Applications: A Comprehensive Guide"](https://dvmhn07.medium.com/integrating-sql-databases-into-node-js-applications-a-comprehensive-guide-c6b0c0a84f91) 
- [NPM's website for node packages](https://www.npmjs.com)

---
## <ins>Links</ins>

Here is a [link]() to a video walkthough demonstration of this application.
