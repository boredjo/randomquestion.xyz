# randomquestion.wtf
A simple website to start conversations

## What is this website?
You get a question and can answer it. Some question are deep, others are stupid.

## Source code
There source code can be found on [GitHub](https://github.com/boredjo/randomquestion.wtf/). To run your own instance, first edit the `.env` file
```
# React application
HOST="example.com"
PORT="3000"

# Database
DB_PORT="3306"
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="password"
DB_NAME="randomQuestion"
```

Then you nee to create a MySQL database:
```
$ mysql -u <DB_USER> -p --host <DB_host> --port <DB_PORT> -D <DB_NAME> < ./sql/DDL.sql
```

Then run the installation script
```
$ ./install.sh
```

Finally, you can run the server using node
```
$ node dist/server.js
```
## Docker Image
A docker image is also available, just use the `docker-compose` file from github

## Who made this
This page was made by [bordejo](https://github.com/boredjo/) for a web programming assignment at SKKU.