# Alexander Borowski's Blog

This is my personal blog: [https://www.alexanderborowski.com/](https://www.alexanderborowski.com/). 

Here I will share my thoughts and monthly highlights with the world.

## Features

- Blog posts: Everyone can view my blog posts.
- Author login: Only I (so far) can login to write, publish and delete blog posts.
- Page analytics: I can view page views.
- Feedback form: A user can send me feedback.

## Technologies Used

The blog is built using Node.js, Express.js, and MongoDB for the backend. EJS is used as the template engine, and Passport.js is used for authentication. Bcrypt is used for hashing passwords and dotenv for environment variable management.

*Note: Ensure you are using compatible versions of these technologies.*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

- Node.js and npm

### Set-up steps:

*Note: Assuming mac or linux system.*

1. Clone the repository to your local machine.
    
    ```bash
    git clone https://github.com/alexanderboro/website_borowski.git
    ```
    
2. Navigate into the cloned repository.
    
    ```bash
    cd website_borowski
    ```
    
3. Install the dependencies.
    
    ```bash
    npm install
    ```
    
4. Rename `session.env.sample` to `session.env` and set the appropriate environment variables.
5. Run the server.
    
    ```bash
    npm start
    ```
     

A local version of the blog should now be running at [http://localhost:3000](http://localhost:3000/).

## Usage

This is a blog application where users can read articles, and authors can log in to create, edit, and delete articles.

Once the server is running, you can view the blog at [http://localhost:3000](http://localhost:3000/).

- To log in as the author, navigate to `/login.html`.
- To view page analytics, navigate to `/analytics`.
- To create a new article, navigate to `/admin`. Fill in the input fields for the article's title, summary, content, and author, then click the **Create Article** button. This sends a POST request to `/articles` with the article's title, content, summary and author in the request body.
- To edit an existing article, first navigate to the corresponding article in the article list on `/admin`. Click the **Edit** button to retrieve the current article data. Then you can edit the article’s information and click **Update** to save your changes. This sends a PUT request to `/articles/:id` with the updated data in the request body.
- To delete an article, click on **Delete** in the article list. This sends a DELETE request to `/articles/:id`.

## Blog Architecture Diagram

![Blog Architecture Diagram](https://i.imgur.com/6V7GVgY.png)

## Running Tests

This project does not currently have any tests.

## Deployment

This project is currently deployed at Heroku on the domain [https://www.alexanderborowski.com/](https://www.alexanderborowski.com/)

## Contact

For any questions or concerns, please open an issue on this repository.