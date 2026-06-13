# 🛒 Admin Panel - Node.js + Express + MongoDB

This is a complete **Admin Panel system** built using Node.js, Express, MongoDB, and EJS. It includes full CRUD operations for Category, SubCategory, ExtraCategory, and Product modules with authentication, role-based access, image upload, and soft delete (trash system).

---

## 🚀 Features

This project includes:

- 🔐 Authentication using Passport.js
- 🔑 OTP-based Password Reset System (via Nodemailer) 
- 👨‍💼 Role-based access (Super Admin / Admin)
- 📂 Category → SubCategory → ExtraCategory hierarchy
- 📦 Product management with image upload (Multer)
- 🗑️ Soft delete (Trash system) + Restore + Permanent delete
- 🔔 SweetAlert flash messages for success/error
- 🖼️ Image upload for products and admin profile
- 📊 MongoDB relations using populate()
- 🎨 EJS templating engine UI

---

## 🏗️ Project Structure

```

AdminPanel/
│
├── config/
│   ├── db.js
│   ├── mailer.js
│   ├── passportLocal.js
│
├── controllers/
│   ├── adminController.js
│   ├── categoryController.js
│   ├── subCategoryController.js
│   ├── extraCategoryController.js
│   ├── productController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleAuth.js
│
├── models/
│   ├── adminModel.js
│   ├── categoryModel.js
│   ├── subCategoryModel.js
│   ├── extraCategoryModel.js
│   ├── productModel.js
│
├── router/
│   ├── adminRoutes.js
│   ├── categoryRoutes.js
│   ├── subCategoryRoutes.js
│   ├── extraCategoryRoutes.js
│   ├── productRoutes.js
│
├── views/
│   ├── add-category.ejs
│   ├── edit-category.ejs
│   ├── view-category.ejs
│   │
│   ├── add-subcategory.ejs
│   ├── edit-subcategory.ejs
│   ├── view-subcategory.ejs
│   │
│   ├── add-extracategory.ejs
│   ├── edit-extracategory.ejs
│   ├── view-extracategory.ejs
│   │
│   ├── add-product.ejs
│   ├── edit-product.ejs
│   ├── view-product.ejs
│   │
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── trash.ejs
│   │
│   ├── header.ejs
│   ├── footer.ejs
│
├── public/
│   ├── assets/
│
├── uploads/
│   ├── adminImages/
│   ├── productImages/
│
├── app.js
├── package.json
├── package-lock.json

```
---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS Template Engine
- Multer (file upload)
- Nodemailer (Email OTP)
- Passport.js (authentication)
- SweetAlert2 (UI alerts)

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd project-folder
npm install

```
---

## 🌐 Server Runs On

```
http://localhost:3000
```

---

## 🔑 Default Roles

- 👑 **Super Admin** → Full access (CRUD + system control)  
- 👤 **Admin** → Limited access (restricted by middleware)  
- 👁️ **User** → Read-only access (can only view data)

---

## 🔐 OTP System

- OTP sent to registered email using Nodemailer  
- OTP verification page for security  
- Secure password reset after OTP validation  

---

## 🗑️ Soft Delete System

- Data is not permanently deleted  
- Moved to trash using `isDeleted` field  
- Restore or permanently delete option available  

---

## 📊 Database Relations

- Category → SubCategory → ExtraCategory  
- Product linked using MongoDB `ref`  
- Data fetching done using `populate()`  

---

## 🔔 UI Enhancements

- SweetAlert for alerts  
- Clean Bootstrap UI  
- Responsive admin dashboard  

---

## 👨‍💻 Author

**Mitali Patel**