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

Create a .env file in the root directory and add:
SERVER= local
PORT = 3000
DB_HOST=localhost
DB_USER_NAME=postgres
DB_PASSWORD='root'
DB_PORT =5432
DB_DATABASE=node-assignment
DB_DIALECT=postgres
JWT_SECRET_KEY = top_tipper64#$52

CAPTCHA_SITE_KEY = 6LcpQf4qAAAAAMBDO0PGxJFlIklNOTUOtWAN9n-P
CAPTCHA_SECRET_KEY  = 6LcpQf4qAAAAAHV20GtuurmnM_iXhigKrwQruBNQ

Run commands:

1. npm install

2. npm run start