# Week 4 — Postgres and RDS

## [Required Homework](#required-homework-1)

- [Create RDS Postgres Instance](#setting-up-an-rds-instance)
- [Bash scripting for common database actions](#bash-scripts)
- [Install Postgres Driver in Backend Application](#install-driver-for-psql)
- [Connect Gitpod to RDS Instance](#connecting-to-rds)
- [Create Congito Trigger to insert user into database](#creating-lambda-function)
- [Create new activities with a database insert](#home-and-activity-post-endpoint-update)


## [Homework Challenges](#homework-challenges-1)

- [Update schema path](#update-schema-path)
- [Solution: Passing user_handle from Frontend to /api/activities](#solution-passing-user_handle-from-frontend-to-apiactivities)
- [Understanding Current Data Flow](#understanding-current-data-flow)
- [Setting env vars & script execution in local machine](#setting-env-vars--script-execution-in-local-machine)

---

## Required Homework

### Setting up an RDS Instance

To learn about RDS configuration, use the console. However, to create an RDS instance, we will use a CLI command.

We will set the public access for RDS, prioritizing cost management over security. To increase security, change the port number from 5432 if the access is public. Refer to [https://docs.aws.amazon.com/cli/latest/reference/rds/#](https://docs.aws.amazon.com/cli/latest/reference/rds/#) for more information.

- To start an RDS instance, run this CLI command:
    - Set a `master-user-password` and `master-username` that are 8-30 characters long.
    - Ensure the availability zone (AZ) is correct.

```bash
aws rds create-db-instance \
  --db-instance-identifier cruddur-db-instance \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version  14.6 \
  --master-username cruddurroot \
  --master-user-password <password>\
  --allocated-storage 20 \
  --availability-zone us-east-1a \
  --backup-retention-period 0 \
  --port 5432 \
  --no-multi-az \
  --db-name cruddur \
  --storage-type gp2 \
  --publicly-accessible \
  --storage-encrypted \
  --enable-performance-insights \
  --performance-insights-retention-period 7 \
  --no-deletion-protection
```

When building a DB, you generally need to be explicit about the character set and timezone.  The RDS instance creation process takes some time to complete.

![create-rds-cli](media/week4/1-create-rds-cli.png)

When you have an EC2 instance, you can start and stop it, and while it is stopped, it doesn't consume credits. Note that RDS runs on EC2, but it can only be stopped temporarily for seven days. After that, it will restart. So stop the RDS instance temporarily and make sure to set a notification for when it restarts in seven days.

### Trying PSQL locally

- Run `docker compose up`.
- Try connecting to PSQL with the password `password`.

```bash
psql -U postgres --host localhost
```

- Here are some common PSQL commands:

```latex
\x on -- expanded display when looking at data
\q -- Quit PSQL
\l -- List all databases
\c database_name -- Connect to a specific database
\dt -- List all tables in the current database
\d table_name -- Describe a specific table
\du -- List all users and their roles
\dn -- List all schemas in the current database
CREATE DATABASE database_name; -- Create a new database
DROP DATABASE database_name; -- Delete a database
CREATE TABLE table_name (column1 datatype1, column2 datatype2, ...); -- Create a new table
DROP TABLE table_name; -- Delete a table
SELECT column1, column2, ... FROM table_name WHERE condition; -- Select data from a table
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...); -- Insert data into a table
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition; -- Update data in a table
DELETE FROM table_name WHERE condition; -- Delete data from a table
```

### Create Database

```sql
CREATE database cruddur;
```

```bash
List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges   
-----------+----------+----------+------------+------------+-----------------------
 cruddur   | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
```

- Most web frameworks have a `schema.sql` file to define the database tables when creating a database. However, in Flask, this file needs to be manually created.
- In the backend Flask application, create a `db/schema.sql` file.
- We will be using an extension called `uuid-ossp` to have Postgres generate UUIDs. This will generate a long, random string to be used as an ID instead of a number. Make sure that this extension is available for RDS.
- Please add the following line to `schema.sql`.

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

- To load the `schema.sql`file, quit `psql` if it is already running, and then from the backend folder, run the following command:

```bash
psql cruddur < db/schema.sql -h localhost -U postgres
```

- After running this command, you should see a message similar to the following:

```bash
❯ psql cruddur < db/schema.sql -h localhost -U postgres
Password for user postgres: 
CREATE EXTENSION
```

- You need to export the psql connection URL to the environment. You can do this by running either of the following commands:

```bash
export CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
```

```bash
gp env CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
```

- To test the connection URL, run the following command:

```bash
psql $CONNECTION_URL
```

- Set the connection URL for the production database (RDS) by running the following command:

```bash
export PROD_CONNECTION_URL="postgresql://cruddurroot:<password>@<DB_endpoint>:5432/cruddur"
```

```bash
gp env PROD_CONNECTION_URL="postgresql://cruddurroot:<password>@<DB_endpoint>:5432/cruddur"
```

### Bash Scripts

- In the backend, create a new folder called `bin` to put bash scripts.
- Inside that folder, create the files `db-create`, `db-drop`, and `db-schema-load` (with no extension):

```bash
./bin
├── db-create
├── db-drop
└── db-schema-load
```

- To indicate that these files should be executed with bash, add the bash path to the top of each file with `#!` :

```bash
#! /usr/bin/bash
```

- Finally, make all the bash files executable by running the following command:

```bash
chmod u+x bin/<filename>
```

```bash
-rwxr--r-- 1 annlee annlee   16 Mar 14 19:22 db-create
-rwxr--r-- 1 annlee annlee   66 Mar 14 19:23 db-drop
-rwxr--r-- 1 annlee annlee   16 Mar 14 19:07 db-schema-load
```

### `sed`

> The SED command in UNIX, which stands for stream editor, can perform various functions on a file such as searching, finding and replacing, insertion or deletion.
> 
- To remove `/cruddur` from the CONNECTION_URL when dropping the db, we need to use `sed`. We can add the following code to `db-drop`:

```bash
echo "db-drop"

NO_DB_CONNECTION_URL=$(sed 's/\/cruddur//g' <<<"$CONNECTION_URL")
psql $NO_DB_CONNECTION_URL -c "drop database cruddur;"
```

- We can execute bash scripts by running `./bin/<filename>`.
- To add this functionality to `db-create`, we can add the following code:

```bash
echo "db-create"

NO_DB_CONNECTION_URL=$(sed 's/\/cruddur//g' <<<"$CONNECTION_URL")

psql $NO_DB_CONNECTION_URL -c "create database cruddur;"
```

```bash
❯ ./bin/db-create
db-create
CREATE DATABASE
```

To add this functionality to `db-schema-load`, we can add the following code:

```bash
#! /usr/bin/bash

schema_path="$(dirname $(dirname $(realpath $0)))/db/schema.sql"

# echo $schema_path

echo "db-schema-load"

if [ "$1" = "prod" ]; then
    echo "running in production"
    CON_URL=$PROD_CONNECTION_URL
else
    echo "running in development"
    CON_URL=$CONNECTION_URL
fi

psql $CON_URL cruddur < $schema_path
```

We can use the `prod` argument with the shell command to choose between production and development.

### Adding color to Bash Scripts

> [https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux](https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux)

- To add color to Bash scripts, we can add the following code at the beginning of `db-schema-load`

```bash
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-schema-load"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"
```

- This will print "db-schema-load" in cyan color. We can add this heading coloring to all script files.

![color-bash-script](media/week4/2-color-bash-script.png)

### Update `schema.sql`

> [https://www.postgresql.org/docs/current/sql-createtable.html](https://www.postgresql.org/docs/current/sql-createtable.html)


```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.users;

DROP TABLE IF EXISTS public.activities;

CREATE TABLE
    public.users (
        uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        display_name text NOT NULL,
        handle text NOT NULL,
        email text NOT NULL,
        cognito_user_id text NOT NULL,
        created_at TIMESTAMP default current_timestamp NOT NULL
    );

CREATE TABLE
    public.activities (
        uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_uuid UUID NOT NULL,
        message text NOT NULL,
        replies_count integer DEFAULT 0,
        reposts_count integer DEFAULT 0,
        likes_count integer DEFAULT 0,
        reply_to_activity_uuid integer,
        expires_at TIMESTAMP,
        created_at TIMESTAMP default current_timestamp NOT NULL
    );
```

- This code will drop the tables if they already exist before creating new ones.

```bash
❯ ./bin/db-schema-load
== db-schema-load
db-schema-load
running in development
NOTICE:  extension "uuid-ossp" already exists, skipping
CREATE EXTENSION
NOTICE:  table "users" does not exist, skipping
DROP TABLE
NOTICE:  table "activities" does not exist, skipping
DROP TABLE
CREATE TABLE
CREATE TABLE
```

### `db-connect`

- Create a file named `db-connect` inside `/bin` and make it executable with `chmod u+x bin/db-connect`.
- Add the following script to the file:

```bash
#! /usr/bin/bash

if [ "$1" = "prod" ]; then
    echo "running in production"
    CON_URL=$PROD_CONNECTION_URL
else
    echo "running in development"
    CON_URL=$CONNECTION_URL
fi

psql $CON_URL
```

- Execute the file to quickly connect to psql:

```bash
❯ ./bin/db-connect
psql (13.10 (Ubuntu 13.10-1.pgdg22.04+1))
Type "help" for help.

cruddur=#
```

- Run **`\dt`** to view tables:

```bash
cruddur=# \dt
           List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | activities | table | postgres
 public | users      | table | postgres
(2 rows)
```

### `db-seed`

- Create a file named `db-seed` inside `/bin` and make it executable.
- Add the following script to the file:

```bash
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-seed"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

seed_path="$(dirname $(dirname $(realpath $0)))/db/seed.sql"

# echo $seed_path

echo "db-seed"

if [ "$1" = "prod" ]; then
    echo "running in production"
    CON_URL=$PROD_CONNECTION_URL
else
    echo "running in development"
    CON_URL=$CONNECTION_URL
fi

psql $CON_URL cruddur < $seed_path
```

### `seed.sql`

- Create a file named `seed.sql` in the `db/` directory with the following contents

```sql
-- this file was manually created

INSERT INTO
    public.users (
        display_name,
        handle,
        cognito_user_id
    )
VALUES (
        'Andrew Brown',
        'andrewbrown',
        'MOCK'
    ), (
        'Andrew Bayko',
        'bayko',
        'MOCK'
    );

INSERT INTO
    public.activities (user_uuid, message, expires_at)
VALUES ( (
            SELECT uuid
            from public.users
            WHERE
                users.handle = 'andrewbrown'
            LIMIT
                1
        ), 'This was imported as seed data!', current_timestamp + interval '10 day'
    )
```

- Execute the `db-seed` bash script:

```sql
❯ ./bin/db-seed
== db-seed
db-seed
running in development
INSERT 0 2
INSERT 0 1
```

### Display DB data

```bash
cruddur=# \x auto
Expanded display is on.
cruddur=# SELECT * FROM activities;
-[ RECORD 1 ]----------+-------------------------------------
uuid                   | ccee1d7f-6a94-40a2-90c4-66f1b1b94c99
user_uuid              | 835aa96b-1d89-4391-ba02-3d5dd57ec9d2
message                | This was imported as seed data!
replies_count          | 0
reposts_count          | 0
likes_count            | 0
reply_to_activity_uuid | 
expires_at             | 2023-03-24 16:34:56.185924
created_at             | 2023-03-14 16:34:56.185924
```

### View DB connections

- Create a file named `db-sessions` inside the `/bin`directory and set its permission to executable

```bash
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-sessions"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

if [ "$1" = "prod" ]; then
    echo "running in production"
    CON_URL=$PROD_CONNECTION_URL
else
    echo "running in development"
    CON_URL=$CONNECTION_URL
fi

NO_DB_URL=$(sed 's/\/cruddur//g' <<<"$CON_URL")
psql $NO_DB_URL -c "select pid as process_id, \
       usename as user,  \
       datname as db, \
       client_addr, \
       application_name as app,\
       state \
from pg_stat_activity;"
```

```bash
process_id |   user   |    db    | client_addr | app  | state  
------------+----------+----------+-------------+------+--------
         26 |          |          |             |      | 
         28 | postgres |          |             |      | 
         45 | postgres | postgres | 172.18.0.1  | psql | active
         31 | postgres | postgres | 172.18.0.1  |      | idle
         32 | postgres | cruddur  | 172.18.0.1  |      | idle
         24 |          |          |             |      | 
         23 |          |          |             |      | 
         25 |          |          |             |      |
```

### Create & Drop DB

- Create a new file named `db-setup` in the `/bin` directory and make it executable.

```bash
#! /usr/bin/bash

set -e # stop if it fails at any point

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="db-setup"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

bin_path="$(dirname $(dirname $(realpath $0)))/bin"

source "$bin_path/db-drop"
source "$bin_path/db-create"
source "$bin_path/db-schema-load"
source "$bin_path/db-seed"
```

```bash
❯ ./backend-flask/bin/db-setup
== db-setup
== db-drop
DROP DATABASE
== db-create
CREATE DATABASE
== db-schema-load
db-schema-load
running in development
CREATE EXTENSION
NOTICE:  table "users" does not exist, skipping
DROP TABLE
NOTICE:  table "activities" does not exist, skipping
DROP TABLE
CREATE TABLE
CREATE TABLE
== db-seed
db-seed
running in development
INSERT 0 2
INSERT 0 1
```

### Install driver for PSQL

> [https://www.psycopg.org/psycopg3/docs/basic/install.html](https://www.psycopg.org/psycopg3/docs/basic/install.html)

- Add the following to `requirments.txt`

```
psycopg[binary]
psycopg[pool]
```

- Pooling → managing multiple connections - reusing connections

### Getting data from DB

- create a file `db.py` inside `/lib`

```python
from psycopg_pool import ConnectionPool
import os

def query_wrap_object(template):
    sql = f"""
  (SELECT COALESCE(row_to_json(object_row),'{{}}'::json) FROM (
  {template}
  ) object_row);
  """
    return sql

def query_wrap_array(template):
    sql = f"""
  (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
  {template}
  ) array_row);
  """
    return sql

connection_url = os.getenv("CONNECTION_URL")
pool = ConnectionPool(connection_url)
```

- Set `CONNECTION_URL` under backend-flask in docker compose

```python
CONNECTION_URL: "postgresql://postgres:password@db:5432/cruddur"
```

- Add this import statement in `home_activities.py`

```python
from lib.db import pool, query_wrap_array
```

- Replace `results` and `return results` in `home_activities.py` with this code

> [https://www.psycopg.org/psycopg3/docs/api/cursors.html](https://www.psycopg.org/psycopg3/docs/api/cursors.html)
> 

```python
sql = query_wrap_array(
            """
        SELECT
            activities.uuid,
            users.display_name,
            users.handle,
            activities.message,
            activities.replies_count,
            activities.reposts_count,
            activities.likes_count,
            activities.reply_to_activity_uuid,
            activities.expires_at,
            activities.created_at
        FROM public.activities
        LEFT JOIN public.users ON users.uuid = activities.user_uuid
        ORDER BY activities.created_at DESC
        """
        )

        print(sql)

        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                # this will return a tuple
                # the first field being the data
                json = cur.fetchone()

        return json[0]
```

- Try refreshing frontend to see new data loading

![sql-seed-data-load](media/week4/3-sql-seed-data-load.png)

### Connecting to RDS

- Open the RDS console and start the database. Wait for it to load.
- Update the inbound security group for RDS to allow your device's IP address.
- Use the following command to get the IP address, which should be set as an environment variable to access it

```bash

GITPOD_IP=$(curl -s ifconfig.me)
```

- In the inbound rules, select "PostgreSQL" as the type and set your `<IP>/32` as the source. Provide a description.
- Try to connect to the database using the endpoint. Make sure that the `PROD_CONNECTION_URL` is correct:

```bash
psql $PROD_CONNECTION_URL
```

```bash
❯ psql $PROD_CONNECTION_URL
psql (13.10 (Ubuntu 13.10-1.pgdg22.04+1), server 14.6)
WARNING: psql major version 13, server major version 14.
         Some psql features might not work.
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.
```

⚠️ With the current setup, we have to manually update the IP address every time.

- To automatically update the IP address using an AWS CLI command, we need to set the following values as environment variables in the working environment:
    - `DB_SG_RULE_ID`: security group rule ID for the specific inbound rule we set
    - `DB_SG_ID`: security group ID

```bash
export DB_SG_ID="sg-<value>"
gp env DB_SG_ID="sg-<value>"
export DB_SG_RULE_ID="sgr-<value>"
gp env DB_SG_RULE_ID="sgr-<value>"
```

- Change the IP address from the inbound group rule that we set earlier to something else.
- Run the command to update the IP address:

```bash
aws ec2 modify-security-group-rules \
    --group-id $DB_SG_ID \
    --security-group-rules "SecurityGroupRuleId=$DB_SG_RULE_ID,SecurityGroupRule={Description=GITPOD,IpProtocol=tcp,FromPort=5432,ToPort=5432,CidrIpv4=$GITPOD_IP/32}"
```

```bash
{
    "Return": true
}
```

- To automate running this script every time, create `rds-update-sg-rule`inside the `/backend/bin` folder. Make it executable, and then paste the AWS EC2 modify command inside:

```bash
#! /usr/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="rds-update-sg-rule"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

aws ec2 modify-security-group-rules \
    --group-id $DB_SG_ID \
    --security-group-rules "SecurityGroupRuleId=$DB_SG_RULE_ID,SecurityGroupRule={Description=GITPOD,IpProtocol=tcp,FromPort=5432,ToPort=5432,CidrIpv4=$GITPOD_IP/32}"
```

- Update `.gitpod.yml` postgres init like this to automatically run the sg-rule update bash script

```bash
- name: postgres
    init: |
      curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
      echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
      sudo apt update
      sudo apt install -y postgresql-client-13 libpq-dev
    command: |
      export GITPOD_IP=$(curl ifconfig.me)
      source "$THEIA_WORKSPACE_ROOT/backend-flask/bin/rds-update-sg-rule"

      exit
```

- To connect to RDS using bash script run `./backend-flask/bin/db-connect prod`

```bash
❯ ./backend-flask/bin/db-connect prod
running in production
psql (13.10 (Ubuntu 13.10-1.pgdg22.04+1), server 14.6)
WARNING: psql major version 13, server major version 14.
         Some psql features might not work.
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

cruddur=>
```

### Load schema to RDS

- In docker-compose, change the connection URL to the prod URL:

```yaml
CONNECTION_URL: "${PROD_CONNECTION_URL}"
```

- Run `db-schema-load` in prod:

```bash
❯ ./backend-flask/bin/db-schema-load prod
== db-schema-load
db-schema-load
running in production
CREATE EXTENSION
NOTICE:  table "users" does not exist, skipping
DROP TABLE
NOTICE:  table "activities" does not exist, skipping
DROP TABLE
CREATE TABLE
CREATE TABLE
```

- Note that `> /dev/null 2>&1` is used to redirect and discard script execution logs.
- `&` at the end indicates that this command should be run in background.

### Creating Lambda Function

- Open the Lambda console and create a new Lambda function with the Python 3.8 runtime.
- Create a new folder `lambdas` inside `/aws` and add the file `cruddur-post-confirmation.py` with the code provided.

```python
import json
import psycopg2
import os

def lambda_handler(event, context):
    user = event["request"]["userAttributes"]
    print("User attributes ----->", user)
    try:
        conn = psycopg2.connect(os.getenv("CONNECTION_URL"))
        cur = conn.cursor()

        parameters = [
            user["name"],
            user["email"],
            user["preferred_username"],
            user["sub"],
        ]

        sql = f"INSERT INTO public.users (display_name, email, handle, cognito_user_id) VALUES (%s, %s, %s, %s)"

        cur.execute(sql, *parameters)

        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print("Database connection closed.")

    return event
```

- If using this function in production, set up a user_pool and db proxy (not covered in these instructions).
- Copy the `cruddur-post-confirmation.py` code into the Lambda function and deploy it.
- Set the `CONNECTION_URL` environment variable in the configuration → environment variables section.
- Add a new layer from the Layers section.
- To create and add the `psycopg2`layer:
    - [https://github.com/AbhimanyuHK/aws-psycopg2](https://github.com/AbhimanyuHK/aws-psycopg2)
    - This is a custom compiled psycopg2 C library for Python. Due to AWS Lambda missing the required PostgreSQL libraries in the AMI image, we needed to compile psycopg2 with the PostgreSQL [libpq.so](http://libpq.so/) library statically linked libpq library instead of the default dynamic link.
    - Some precompiled versions of this layer are available publicly on AWS freely to add to your function by ARN reference.
        - [https://github.com/jetbridge/psycopg2-lambda-layer](https://github.com/jetbridge/psycopg2-lambda-layer)
    - Alternatively you can create your own development layer by downloading the psycopg2-binary source files from [https://pypi.org/project/psycopg2-binary/#files](https://pypi.org/project/psycopg2-binary/#files)
    - Download the package for the lambda runtime environment: [psycopg2_binary-2.9.5-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl](https://files.pythonhosted.org/packages/36/af/a9f06e2469e943364b2383b45b3209b40350c105281948df62153394b4a9/psycopg2_binary-2.9.5-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl)
    - Extract to a folder, then zip up that folder and upload as a new lambda layer to your AWS account
- Add the **ARN** from the **psycopg2** layer and verify it.

```python
arn:aws:lambda:us-east-1:898466741470:layer:psycopg2-py38:2
```

- Click the **Role name** link in the Permissions section.
- Select the **Attach Policy** option from the **Add permission** drop-down menu.
- Select **Policies** from left pane
- Click **Create Policy**, add the provided JSON, name the policy "AWSLambdaVPCAccessExecutionRole", and create the policy.

```python
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateNetworkInterface",
                "ec2:DeleteNetworkInterface",
                "ec2:DescribeNetworkInterfaces"
                ],
                "Resource": "*"
        }]
}
```

- Select **Policies** from left pane - **Add permission** select **Attach Policy.**
- Select the new policy that we made and attach it.
- New permission for ec2 will be visible under **Permission** → **Resource summary**  in lambda.
- Go to **VPC → Edit**
- Select the **Default VPC**
- Choose the **1a** subnet
- In security group, choose **default VPC security group.**
- Save the changes.
- Run `./backend-flask/bin/db-schema-load prod` to update the RDS DB.

```python
./backend-flask/bin/db-schema-load prod
```

### Cognito Lambda Trigger

- In the Cognito console, go to **user pool** → **user pool properties** → **Add Lambda trigger**.
- Set the `Trigger type` to `Sign-up`.
- Set the `Sign-up` trigger to `Post confirmation`.
- Assign Lambda function that was just created.
- Click Add Lambda Trigger.
- To test the function, sign up with a new account.
- Check Lambda Cloudwatch logs for any errors.

### Checking for data in DB

- Run `./backend-flask/bin/db-connect prod` to connect with the RDS.
- Run `SELECT * FROM users;` to check if the data is present in the `users` table.

```shell
cruddur=> SELECT * FROM users;
-[ RECORD 1 ]---+-------------------------------------
uuid            | 1be11800-d063-47f9-83aa-64d551a75c75
display_name    | annlee test
handle          | annleetest
email           | annlee**.com
cognito_user_id | 9b490**3264fa
created_at      | 2023-03-16 06:37:23.760033
```

### Home and Activity Post Endpoint Update

- Update `create_activity.py` like this

```python
from datetime import datetime, timedelta, timezone

from lib.db import db

class CreateActivity:
    def run(message, user_handle, ttl):
        model = {"errors": None, "data": None}

        now = datetime.now(timezone.utc).astimezone()

        if ttl == "30-days":
            ttl_offset = timedelta(days=30)
        elif ttl == "7-days":
            ttl_offset = timedelta(days=7)
        elif ttl == "3-days":
            ttl_offset = timedelta(days=3)
        elif ttl == "1-day":
            ttl_offset = timedelta(days=1)
        elif ttl == "12-hours":
            ttl_offset = timedelta(hours=12)
        elif ttl == "3-hours":
            ttl_offset = timedelta(hours=3)
        elif ttl == "1-hour":
            ttl_offset = timedelta(hours=1)
        else:
            model["errors"] = ["ttl_blank"]

        if user_handle == None or len(user_handle) < 1:
            model["errors"] = ["user_handle_blank"]

        if message == None or len(message) < 1:
            model["errors"] = ["message_blank"]
        elif len(message) > 280:
            model["errors"] = ["message_exceed_max_chars"]

        if model["errors"]:
            model["data"] = {"handle": user_handle, "message": message}
        else:
            expires_at = now + ttl_offset
            uuid = CreateActivity.create_activity(user_handle, message, expires_at)

            object_json = CreateActivity.query_object_activity(uuid)
            model["data"] = object_json
        return model

    def create_activity(handle, message, expires_at):
        sql = db.template("activities", "create")
        uuid = db.query_commit(
            sql, {"handle": handle, "message": message, "expires_at": expires_at}
        )
        return uuid

    def query_object_activity(uuid):
        sql = db.template("activities", "object")
        return db.query_object_json(sql, {"uuid": uuid})
```

- Create a file `db.py` inside `/lib` and add this content to it:

```python
from psycopg_pool import ConnectionPool
import os
import re
import sys
from flask import current_app as app

class Db:
    def __init__(self):
        self.pool = ConnectionPool(os.getenv("CONNECTION_URL"))

    def template(self, *args):
        pathing = list(
            (
                app.root_path,
                "db",
                "sql",
            )
            + args
        )
        pathing[-1] = pathing[-1] + ".sql"

        template_path = os.path.join(*pathing)

        green = "\033[92m"
        no_color = "\033[0m"
        print("\n")
        print(f"{green} Load SQL Template: {template_path} {no_color}")

        with open(template_path, "r") as f:
            template_content = f.read()
        return template_content

    # we want to commit data such as an insert
    # be sure to check for RETURNING in all uppercases
    def print_params(self, params):
        blue = "\033[94m"
        no_color = "\033[0m"
        print(f"{blue} SQL Params:{no_color}")
        for key, value in params.items():
            print(key, ":", value)

    def print_sql(self, title, sql):
        cyan = "\033[96m"
        no_color = "\033[0m"
        print(f"{cyan} SQL STATEMENT-[{title}]------{no_color}")
        print(sql)

    def query_commit(self, sql, params={}):
        self.print_sql("commit with returning", sql)

        pattern = r"\bRETURNING\b"
        is_returning_id = re.search(pattern, sql)

        try:
            with self.pool.connection() as conn:
                cur = conn.cursor()
                cur.execute(sql, params)
                if is_returning_id:
                    returning_id = cur.fetchone()[0]
                conn.commit()
                if is_returning_id:
                    return returning_id
        except Exception as err:
            self.print_sql_err(err)

    # when we want to return a json object
    def query_array_json(self, sql, params={}):
        self.print_sql("array", sql)

        wrapped_sql = self.query_wrap_array(sql)
        with self.pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(wrapped_sql, params)
                json = cur.fetchone()
                return json[0]

    # When we want to return an array of json objects
    def query_object_json(self, sql, params={}):
        self.print_sql("json", sql)
        self.print_params(params)
        wrapped_sql = self.query_wrap_object(sql)

        with self.pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(wrapped_sql, params)
                json = cur.fetchone()
                if json == None:
                    "{}"
                else:
                    return json[0]

    def query_wrap_object(self, template):
        sql = f"""
    (SELECT COALESCE(row_to_json(object_row),'{{}}'::json) FROM (
    {template}
    ) object_row);
    """
        return sql

    def query_wrap_array(self, template):
        sql = f"""
    (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
    {template}
    ) array_row);
    """
        return sql

    def print_sql_err(self, err):
        # get details about the exception
        err_type, err_obj, traceback = sys.exc_info()

        # get the line number when exception occured
        line_num = traceback.tb_lineno

        # print the connect() error
        print("\npsycopg ERROR:", err, "on line number:", line_num)
        print("psycopg traceback:", traceback, "-- type:", err_type)

        # print the pgcode and pgerror exceptions
        print("pgerror:", err.pgerror)
        print("pgcode:", err.pgcode, "\n")

db = Db()
```

- Inside the `/db` folder creater another folder and name it `sql`
- Inside it create another folder `activities`
- Inside this folder create these 3 sql files
- `create.sql`

```sql
INSERT INTO public.activities (
  user_uuid,
  message,
  expires_at
)
VALUES (
  (SELECT uuid 
    FROM public.users 
    WHERE users.handle = %(handle)s
    LIMIT 1
  ),
  %(message)s,
  %(expires_at)s
) RETURNING uuid;
```

- `home.sql`

```sql
SELECT
  activities.uuid,
  users.display_name,
  users.handle,
  activities.message,
  activities.replies_count,
  activities.reposts_count,
  activities.likes_count,
  activities.reply_to_activity_uuid,
  activities.expires_at,
  activities.created_at
FROM public.activities
LEFT JOIN public.users ON users.uuid = activities.user_uuid
ORDER BY activities.created_at DESC
```

- `object.sql`

```sql
SELECT
  activities.uuid,
  users.display_name,
  users.handle,
  activities.message,
  activities.created_at,
  activities.expires_at
FROM public.activities
INNER JOIN public.users ON users.uuid = activities.user_uuid 
WHERE 
  activities.uuid = %(uuid)s
```

- Update `home_activities.py` to this.

```python
from lib.db import db

class HomeActivities:
    def run(cognito_user_id=None):
        sql = db.template("activities", "home")
        results = db.query_array_json(sql)
        return results
```

- Update `api/activities` route user_handle name to your auth username

```python
user_handle = <your-username>
```

- Try posting a new crud.

![first-crud](media/week4/4-first-crud.png)

---

## Securing Your Amazon RDS Postgres Database

- RDS is a Relational DB (SQL)
- Amazon RDS offers different DB engines
    - Aurora
    - MySQL
    - MariaDB
    - PostgreSQL
    - Orcale
    - ….

### Amazon RDS - Security Best Practices - AWS

- Use VPCs: Use Amazon Virtual Private Cloud (VPC) to create a private network for your RDS instance. This helps prevent unauthorized access to your instance from the public internet.
- Compliance standard is what your business requires
- RDS Instances should only be in the AWS region that you are legally allowed to be holding user data in.
- Amazon Organizations SCP - to manage RDS deletion, RDS creation, region lock, RDS Encryption enforced etc
- AWS CloudTrail is enabled & monitored to trigger alerts on malicious RDS behaviour by an identity in AWS.
- Amazon Guardduty is enabled in the account and region of RDS
- RDS Instance to use appropriate Authentication -Use IAM authentication, kerberos etc (not the default)
- Database User Lifecycle Management - Create, Modify, Delete Users
- AWS User Access Lifecycle Management - Change of Roles/ Revoke Roles etc
- Security Group to be restricted only to known IPs
- Not have RDS be internet accessible
- Encryption in Transit for comms between App & RDS
- Secret Management: Master User passwords can be used with AWS
- Secrets Manager to automatically rotate the secrets for Amazon RDS.

---

## Homework Challenges

### Update schema path

- I updated the schema path to make it possible to execute the bash scripts from anywhere

```bash
schema_path="$(dirname $(dirname $(realpath $0)))/db/schema.sql"
```

### Solution: Passing user_handle from Frontend to /api/activities

- Update the `ActivityForm` component in `pages/HomeFeedPage.js` to pass the `user_handle` prop as follows:

```jsx
<ActivityForm
  user_handle={user}
  popped={popped}
  setPopped={setPopped}
  setActivities={setActivities}
/>
```

- In the `components/ActivityForm.js` component, update the fetch request body  to include the `user_handle` and headers to include `Authorization`:

```jsx
headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_handle: props.user_handle.handle,
    message: message,
    ttl: ttl
  }),
```

- In `app.py`, under the `/api/activities` route, assign the `user_handle` variable as follows:

```python
user_handle = request.json["user_handle"]
```

These changes will ensure that the `user_handle` prop is passed correctly and included in the fetch request, and that the server can retrieve it from the request payload. Also the post will only be submitted if the user is authenticated correctly.

### Understanding Current Data Flow

The frontend component  `ActivityFrom.js` sends post details, including the message and time-to-live (TTL), to the backend through the `/api/activities` route. The backend then passes these post details to the `create_activity.py` code.

In `create_activity.py`, the code updates the `ttl_offset` based on the given TTL. The user handle and message are then stored inside `model` dict after checking for errors. If any error is found, it is also stored in this dictionary.

The error key value is checked to determine if there were any errors. If there are, the data is not sent to the database. If there are no errors, the SQL template for creating a new activity is selected using the `db.template` function.

The `ttl_offset` + `current time` is used to calculate the `expires_at` for the post. This template query is then filled with data and committed. The `query_commit` function first checks if there is any return statement in the SQL or not. If there is a return, the return value is collected after the SQL commit. In this case, the return value is the UUID for the post.

Using this UUID, the data is retrieved from the RDS and stored as JSON. The data portion from this JSON is stored under the model dictionary's `data` key and returned.

If the model has no errors, the data portion is sent back as a response. If there are any errors, a 422 response is given with an error message. The frontend is then updated with the new post using this data.

### Setting env vars & script execution in local machine

Since I was working on my machine, I added all these persistent environment variables and execution commands to `.zshrc`:

```bash
export CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
export PROD_CONNECTION_URL="postgresql://cruddurroot:<password>@<RDS_ENDPOINT>:5432/cruddur"
export GITPOD_IP="$(curl -s ifconfig.me)"
export DB_SG_ID="sg-<VALUE>"
export DB_SG_RULE_ID="sgr-<VALUE>"
source "<path to bash script" > /dev/null 2>&1 &
```

- Note that `> /dev/null 2>&1` is used to redirect and discard script execution logs.
- `&` at the end indicates that this command should be run in background.
