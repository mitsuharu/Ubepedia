import os
import sqlite3
from read_xml import *

db_file = "ube.db"


def main():
    print("main")

    if os.path.exists(db_file):
        os.remove(db_file)

    db: sqlite3.Connection = sqlite3.connect(db_file)

    ube_civic_facility.insertDB(db)
    ube_cultural_property.insertDB(db)

    db.close()


if __name__ == '__main__':
    main()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
