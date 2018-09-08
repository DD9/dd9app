Replaces your variables.env file, create a new DB user for dd9app-dev on mlabs.com, and place the v1_psql_import_scripts file in the project's root directory.

Run `chmod u+x import-data.sh` to give it permissions to execute, and ./import-data.sh to execute a DB import from version 1 of the app. You may be missing dependencies like postgres, mongo, and heroku.