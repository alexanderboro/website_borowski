API Structure

Options

Articles

/articles - POST to create
/articles/:id - PUT to edit
/articles/:id - DELETE to delete


/articles/view - GET to see all articles rendered
/articles/:id/view - GET to see a single article rendered
/articles/:id/edit - GET to see HTTP edit-form


Not adding: 
/articles - GET to list in json
/articles/:id - GET to get article in JSON form

Ways I have seen to get the username
- `const author = req.user.username;`
- `author: req.user._id` 
- `req.body.author`