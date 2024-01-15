# blog-Web-app
License GitHub issues GitHub stars GitHub forks

blog-Web-app is a MERN (MongoDB, Express.js, React, Node.js) stack application that empowers users to create, view, and search for blog posts. It incorporates robust user authentication using bcrypt, JWT, and cookies, allowing users to log in, register, and engage with the community through comments. Only the author of a post has the authority to update or delete it.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [User Authentication](#user-authentication)
- [Contributing](#contributing)
- [License](#license)

## Installation
To set up Blog-It locally, follow these comprehensive steps:

## Clone the repository:

git clone https://github.com/mohdabdulrahman297/blog-Web-app
cd blog-Web-app `
Install dependencies for both the client and server:

Navigate to the client directory and install client dependencies:

cd client npm install

Move back to the root directory and install server dependencies:

cd .. cd api npm install

## Configure Cloudinary for image storage:

Sign up for a Cloudinary account.

Retrieve your Cloudinary API key, API secret, and cloud name.

Create a .env file in the server directory.

Add the following variables to the .env file:

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

Ensure that you replace your_cloud_name, your_api_key, and your_api_secret with your actual Cloudinary credentials.

## Run the application:

In the client directory:

cd client npm run dev

In the api directory:

cd .. cd api nodemon index.js

## Access the application:

Open your browser and navigate to http://localhost:5173 to view the blog-Web-app application.
This setup process covers cloning the repository, installing dependencies, and configuring Cloudinary for image storage. Make sure to follow each step carefully to ensure a smooth installation process. If you encounter any issues, refer to the documentation or seek help from the community.

## Features
User Authentication:
Secure user authentication using bcrypt, JWT, and cookies.
Login and registration functionalities.
Post Management:
Create, update, and delete posts using React Quill for an enhanced text editor experience.
Upload and display images with Cloudinary integration.
View and search for posts.
Comment System:
Users can comment on posts.
Commenting requires user authentication.
Author Pages:
Individual pages for each author, showcasing their posts.
User Authentication
blog-Web-app uses bcrypt for password hashing, JWT for secure user authentication, and cookies for a seamless user experience. To contribute, familiarize yourself with these technologies and the authentication flow in the application.

## Contributing
Contributions are welcome! Here's how you can contribute to Blog-It:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Make your changes and commit them: git commit -m 'Add new feature'.
Push to your branch: git push origin feature/your-feature.
Submit a pull request.
Please ensure that your pull request adheres to the contributing guidelines.
