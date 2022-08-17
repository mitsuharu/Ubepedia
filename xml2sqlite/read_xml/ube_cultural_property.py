import os
import sqlite3
from . import xml
from . import hash

ROOT_DIR: str = os.path.dirname(os.path.abspath(__file__))
XML_DIR: str = "xml_files"


def insertDB(db: sqlite3.Connection):

    file_name: str = "ube_cultural_property.xml"
    file_path: str = os.path.join(ROOT_DIR, XML_DIR, file_name)

    print(f'ube_cultural_property#read, {file_path}')

    root = xml.parse_xml(file_path)
    if root is None:
        return

    # フィールド作成用SQL文
    create_sql = """
        CREATE TABLE cultural_property (
            id integer,
            name text,
            latitude real,
            longitude real,
            description text,
            category text,
            sub_category text,
            designated_date text,
            administrator text,
            place text,
            production_age text,
            depiction text,
            hash text
        )
    """
    db.execute(create_sql)

    records = []

    for child in root.iter('ube_cultural_property'):
        records.append((child.get("id"),
                        xml.find_text(child, "label"),
                        xml.find_float(child, "latitude"),
                        xml.find_float(child, "longlatitude"),
                        xml.find_text(child, "description"),
                        xml.find_text(child, "category"),
                        xml.find_text(child, "sub_category"),
                        xml.find_text(child, "designated_date"),
                        xml.find_text(child, "administrator"),
                        xml.find_text(child, "place"),
                        xml.find_text(child, "production_age"),
                        xml.find_text(child, "depiction"),
                        hash.convert_to_hash(child.get("id") + xml.find_text(child, "label"))
                        ))

    sql = """
        INSERT INTO cultural_property
         (id, name, latitude, longitude, description,
         category, sub_category, designated_date,
         administrator, place, production_age, depiction, hash)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    """
    db.executemany(sql, records)

    db.commit()
