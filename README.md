# Node Assignment - Local Setup

Follow these steps to set up the project on your local machine.

---

## 🛠 Prerequisites
Before running the project, ensure you have installed:
- **Node.js** (v16+ recommended)
- **PostgreSQL** (Ensure it's running locally or use a cloud DB)
- **Git** (optional, for version control)

---

## 🚀 Steps to Set Up Locally

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Rahul-Chauhan8/node-assignment.git
cd node-assignment

Create a .env file in the root directory and add data from file i sent in email.


Run commands:

1. npm install

2. npm run start

use url http://localhost:3000/


Deployed on aws Ec2 instance
 you can access using this url :- http://ec2-43-204-214-6.ap-south-1.compute.amazonaws.com:3000/

But i have not a registered domain so thats why googel captcha is not working.

Rate Limiting added to the login route using express-rate-limit.

Token Expiry Warning added on before 2 minutes from token expiration.
