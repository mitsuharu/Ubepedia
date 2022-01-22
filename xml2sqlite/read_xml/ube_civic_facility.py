import os
import sqlite3
from . import xml

ROOT_DIR: str = os.path.dirname(os.path.abspath(__file__))
XML_DIR: str = "xml_files"


def insertDB(db: sqlite3.Connection):

    file_name: str = "ube_civic_facility.xml"
    file_path: str = os.path.join(ROOT_DIR, XML_DIR, file_name)

    print(f'ube_civic_facility#read, {file_path}')

    root = xml.parse_xml(file_path)
    if root is None:
        return

    # フィールド作成用SQL文
    create_sql = """
        CREATE TABLE civic_facility (
            id integer,
            name text,
            category text,
            latitude real,
            longlatitude real,
            postal_code text,
            address text,
            phone text,
            fax text,
            email text,
            start_time text,
            end_time text,
            time_notes text,
            week_closure_day text,
            closure_day text,
            closure_day_notes text,
            parking text,
            parking_fee text,
            disabled_toilet text,
            reservation text,
            homepage text,
            depiction text,
            description text
        )
    """
    db.execute(create_sql)

    records = []

    for child in root.iter('ube_civic_facility'):
        records.append((child.get("id"),
                        xml.find_text(child, "label"),
                        xml.find_text(child, "category"),
                        xml.find_float(child, "latitude"),
                        xml.find_float(child, "longlatitude"),
                        xml.find_text(child, "postalCode"),
                        xml.find_text(child, "address"),
                        xml.find_text(child, "phone"),
                        xml.find_text(child, "fax"),
                        xml.find_text(child, "email"),
                        xml.find_text(child, "startTime"),
                        xml.find_text(child, "endTime"),
                        xml.find_text(child, "timeNotes"),
                        xml.find_text(child, "weekClosureday"),
                        xml.find_text(child, "closureday"),
                        xml.find_text(child, "closuredayNotes"),
                        xml.find_text(child, "parking"),
                        xml.find_text(child, "parkingFee"),
                        xml.find_text(child, "disabledToilet"),
                        xml.find_text(child, "reservation"),
                        xml.find_text(child, "homepage"),
                        xml.find_text(child, "depiction"),
                        xml.find_text(child, "depiction")
                        ))

    sql = """
        INSERT INTO civic_facility
         (id, name, category, latitude, longlatitude, postal_code, address,
         phone, fax, email, start_time, end_time, time_notes, week_closure_day,
         closure_day, closure_day_notes, parking, parking_fee, disabled_toilet,
         reservation, homepage, depiction, description) 
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """
    db.executemany(sql, records)

    db.commit()
