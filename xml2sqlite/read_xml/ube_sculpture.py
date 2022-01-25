import os
import sqlite3
from . import xml

ROOT_DIR: str = os.path.dirname(os.path.abspath(__file__))
XML_DIR: str = "xml_files"


def insertDB(db: sqlite3.Connection):

    file_name: str = "ube_sculpture.xml"
    file_path: str = os.path.join(ROOT_DIR, XML_DIR, file_name)

    print(f'ube_cultural_property#read, {file_path}')

    root = xml.parse_xml(file_path)
    if root is None:
        return

    # フィールド作成用SQL文
    create_sql = """
        CREATE TABLE sculpture (
            id integer,
            name text,
            ruby text,
            latitude real,
            longitude real,
            author text,
            author_ruby text,
            year text,
            place text,
            material text,
            size text,
            weight text,
            exhibit text,
            owner text,
            acquisition_method text,
            homepage text,
            depiction text
        )
    """
    db.execute(create_sql)

    records = []

    for child in root.iter('ube_sculpture'):
        records.append((child.get("id"),
                        xml.find_text(child, "label"),
                        xml.find_text(child, "ruby"),
                        xml.find_float(child, "latitude"),
                        xml.find_float(child, "longlatitude"),
                        xml.find_text(child, "author"),
                        xml.find_text(child, "authorRuby"),
                        xml.find_text(child, "year"),
                        xml.find_text(child, "place"),
                        xml.find_text(child, "material"),
                        xml.find_text(child, "size"),
                        xml.find_text(child, "weight"),
                        xml.find_text(child, "exhibit"),
                        xml.find_text(child, "owner"),
                        xml.find_text(child, "acquisition_method"),
                        xml.find_text(child, "homepage"),
                        xml.find_text(child, "depiction")
                        ))

    sql = """
        INSERT INTO sculpture
         (id,
            name,
            ruby,
            latitude,
            longitude,
            author,
            author_ruby,
            year,
            place,
            material,
            size,
            weight,
            exhibit,
            owner,
            acquisition_method,
            homepage,
            depiction)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """
    db.executemany(sql, records)

    db.commit()
