def failedOperation() -> None :
    print( """ 
           +--------------------------+
           |    !! Setup Failed !!    |
           +--------------------------+
    """ )
    exit(1)

try :

    from os import system

    # installing all required libraries
    if system("pip install -r requirements.txt") != 0 : failedOperation()

    print("\n |>> Libraries installed succesfully <<|")

    db_user     = input("\n ==> Please enter your MySQL username (DEFAULT='root') :- ").strip()
    db_password = input(" ==> Please enter password :- ")

    # saving the information
    with open("Voting_System\\base\\variables\\info.data", 'w') as info_file :
        info_file.write(db_user)
        info_file.write('\n')
        info_file.write(db_password)

    import pymysql
    from Voting_System.base.variables.db_variables import *
    from hashlib import sha256

    print("\n |>> Setting up the database <<|")

    try :
        conn = pymysql.connect(
            host= OVS_HOST,
            user= OVS_USER,
            password= OVS_PASSWORD
        )

        cursor = conn.cursor()

         # Create database if not exists
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {OVS_DATABASE}")
        conn.commit()
        cursor.close()
        conn.close()

        print("\n |>> Database created!! <<|")

        # Connect to the VotingSystem database
        conn = pymysql.connect(
                host=OVS_HOST,
                user=OVS_USER,
                password=OVS_PASSWORD,
                database=OVS_DATABASE
        )
        cursor = conn.cursor()

        ADMIN_TABLE_CREATION_QUERY = f"""
                CREATE TABLE IF NOT EXISTS {OVS_TABLE_ADMIN} (
                    {OVS_COLUMN_ID} INT UNSIGNED PRIMARY KEY,
                    {OVS_COLUMN_NAME} VARCHAR(255),
                    {OVS_COLUMN_PLACE} VARCHAR(255),
                    {OVS_COLUMN_PASSWORD} TEXT
                );
        """

        CANDIDATE_TABLE_CREATION_QUERY = f"""
            CREATE TABLE IF NOT EXISTS {OVS_TABLE_CANDIDATE} (
                {OVS_COLUMN_AADHAR} BIGINT UNSIGNED PRIMARY KEY,
                {OVS_COLUMN_FIRST_NAME} VARCHAR(255),
                {OVS_COLUMN_LAST_NAME} VARCHAR(255),
                {OVS_COLUMN_PLACE} VARCHAR(255),
                {OVS_COLUMN_PASSWORD} TEXT,
                {OVS_COLUMN_ID} INT UNSIGNED UNIQUE AUTO_INCREMENT,
                {OVS_COLUMN_VOTE_COUNT} INT UNSIGNED DEFAULT 0
            ) AUTO_INCREMENT = { OVS_ID_START_FROM };
        """

        VOTER_TABLE_CREATION_QUERY = f"""
            CREATE TABLE IF NOT EXISTS {OVS_TABLE_VOTER} (
                {OVS_COLUMN_AADHAR} BIGINT UNSIGNED PRIMARY KEY,
                {OVS_COLUMN_FIRST_NAME} VARCHAR(255),
                {OVS_COLUMN_LAST_NAME} VARCHAR(255),
                {OVS_COLUMN_PLACE} VARCHAR(255),
                {OVS_COLUMN_PASSWORD} TEXT,
                {OVS_COLUMN_ID} INT UNSIGNED UNIQUE AUTO_INCREMENT,
                {OVS_COLUMN_VOTE_GIVEN} BOOLEAN DEFAULT FALSE
            ) AUTO_INCREMENT = { OVS_ID_START_FROM };
        """

        RESULT_TABLE_CREATION_QUERY = f"""
            CREATE TABLE IF NOT EXISTS {OVS_TABLE_RESULT} (
                {OVS_COLUMN_PLACE} VARCHAR(255) PRIMARY KEY,
                {OVS_COLUMN_NAME} VARCHAR(255),
                {OVS_COLUMN_ID} INT UNSIGNED,
                {OVS_COLUMN_VOTE_COUNT} INT UNSIGNED
            );
        """

        # Create AdminTable
        cursor.execute( ADMIN_TABLE_CREATION_QUERY )
        # Create CandidateTable
        cursor.execute( CANDIDATE_TABLE_CREATION_QUERY )
        # Create VoterTable
        cursor.execute( VOTER_TABLE_CREATION_QUERY )
        # Create ResultTable
        cursor.execute( RESULT_TABLE_CREATION_QUERY )

        cursor.execute(f"insert into {OVS_TABLE_ADMIN} values(1000, 'root', 'pantnagar', '{ sha256('root'.encode()).hexdigest() }')")

        conn.commit()
        cursor.close()
        conn.close()

        print("\n |>> Database setup Done! <<|")

    except pymysql.Error as excep :
        print("\n =| MySQL Exception: ", excep)
        failedOperation()

except Exception as excep :
    print("\n =| Exception caught: ", excep)
    failedOperation()

print( """
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        |     Congratulations!!     |
        +===========================+
       <||   OVS Setup Completed   ||>
        +===========================+
""")


