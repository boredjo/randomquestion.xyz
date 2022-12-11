# randomquestion.wtf
A simple website to start conversations

## What is this website?
You get a question and can answer it. Some question are deep, others are stupid.

## Source code
There source code can be found on [GitHub] (https://github.com/boredjo/randomquestion.wtf/). To run your own instance, first edit the `.env` file
```
# React application
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
mysql -u <DB_USER> -p --host <DB_host> --port <DB_PORT> -D <DB_NAME> < ./sql/DDL.sql
```

Then run the installation script
```
$ ./install.sh
```

Finally, you can run the server using node
```
$ node server.js
```