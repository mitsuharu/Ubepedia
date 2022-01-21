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
        CREATE TABLE CivicFacility (
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
            image text,
            description text
        )
    """
    db.execute(create_sql)

    records = []

    for child in root.iter('ube_civic_facility'):
        child_id: int = child.get("id")
        name: str = xml.findText(child, "label")
        category: str = xml.findText(child, "category")
        latitude = xml.findFloat(child, "latitude")
        longlatitude = xml.findFloat(child, "longlatitude")
        postal_code: str = xml.findText(child, "postalCode")
        address: str = xml.findText(child, "address")
        phone: str = xml.findText(child, "phone")
        fax: str = xml.findText(child, "fax")
        email: str = xml.findText(child, "email")
        start_time: str = xml.findText(child, "startTime")
        end_time: str = xml.findText(child, "endTime")
        time_notes: str = xml.findText(child, "timeNotes")
        week_closure_day: str = xml.findText(child, "weekClosureday")
        closure_day: str = xml.findText(child, "closureday")
        closure_day_notes: str = xml.findText(child, "closuredayNotes")
        parking: str = xml.findText(child, "parking")
        parking_fee: str = xml.findText(child, "parkingFee")
        disabled_toilet: str = xml.findText(child, "disabledToilet")
        reservation: str = xml.findText(child, "reservation")
        homepage: str = xml.findText(child, "homepage")
        image: str = xml.findText(child, "depiction")
        description: str = xml.findText(child, "depiction")

        records.append((child_id,
                        name,
                        category,
                        latitude,
                        longlatitude,
                        postal_code,
                        address,
                        phone,
                        fax,
                        email,
                        start_time,
                        end_time,
                        time_notes,
                        week_closure_day,
                        closure_day,
                        closure_day_notes,
                        parking,
                        parking_fee,
                        disabled_toilet,
                        reservation,
                        homepage,
                        image,
                        description
                        ))

    sql = """
        INSERT INTO CivicFacility
         (id, name, category, latitude, longlatitude, postal_code, address,
         phone, fax, email, start_time, end_time, time_notes, week_closure_day,
         closure_day, closure_day_notes, parking, parking_fee, disabled_toilet,
         reservation, homepage, image, description) 
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """
    db.executemany(sql, records)

    db.commit()
