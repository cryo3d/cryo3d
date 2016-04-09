if [ "$#" -ne 1 ]; then
   echo "USAGE:
    -r          refresh your database to the original skeleton,
                or if you need to initialize the database
                in the first place. You probably want to use this
                one.

    -p          force your database data to be persistent, only run
                this is you've used the -r flag beforehand

    -t          don't back up any changes made to the database, good
                for testing";
else
    if [ $1 == "-r" ]; then
        cat db_skeleton.sql > static/Data/cryodb.sql
        helper_scripts/docker_commands.sh
        helper_scripts/restore_db.sh
        echo "You may now navigate to docker host 8080"
    elif [ $1 == "-p" ]; then
        helper_scripts/backup_db.sh
        helper_scripts/docker_commands.sh
        helper_scripts/restore_db.sh
        echo "You may now navigate to docker host 8080"
    elif [ $1 == "-t" ]; then
        cat db_backup.sql > static/Data/cryodb.sql
        helper_scripts/docker_commands.sh
        helper_scripts/restore_db.sh
        echo "You may now navigate to docker host 8080"
    fi
fi

