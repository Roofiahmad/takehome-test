# Takehome test (React + Vite)

Assumption on building this app:

- user is the first person of userlist get from API https://jsonplaceholder.typicode.com/users
- only authorized user allowed to create, delete, and edit post on Posts page
- user can only edit and delete their created comment
- image url from jsonplaceholder api is broken, so I am using external API https://picsum.photos
- json placeholder doesn't provide API to update comment both using PUT or PATCH, so I am using the same API as create new comment (using POST)
- json placeholder doesn't provide API to update newly created post, the API will return status code 500. but it work with the default data.
