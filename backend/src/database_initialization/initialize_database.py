import os
import dotenv
import psycopg2
from psycopg2.extensions import (
    connection as Connection,
    cursor as Cursor,
)

# Load environment variables
dotenv.load_dotenv()

# Context managers for easy database connection management
class OpenConnection(object):
    def __init__(self, uri: str) -> None:
        self.__uri: str = uri

    def __enter__(self) -> Connection:
        self.__connection: Connection = psycopg2.connect(self.__uri)
        return self.__connection

    def __exit__(self, exc_type, exc_value, traceback) -> None:
        self.__connection.close()


class OpenCursor(object):
    def __init__(self, connection: Connection) -> None:
        self.__connection: Connection = connection

    def __enter__(self) -> Cursor:
        self.__cursor: Cursor = self.__connection.cursor()
        return self.__cursor

    def __exit__(self, exc_type, exc_value, traceback) -> None:
        self.__cursor.close()

# Database URI
database_uri: str = (
    "postgresql://"
    f"{os.getenv('POSTGRE_USER')}"
    ":"
    f"{os.getenv('POSTGRE_PASSWORD')}"
    "@localhost/"
    f"{os.getenv('POSTGRE_DB')}"
)

# Read the SQL query from a file
with open("src/database_initialization/initialize_query.sql", "r") as file:
    initialize_query: str = file.read()

# Initialize the database
with OpenConnection(database_uri) as connection:
    with OpenCursor(connection) as cursor:
        cursor.execute(initialize_query)
        connection.commit()
