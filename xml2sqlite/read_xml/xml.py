import xml.etree.ElementTree as ET
from typing import Optional


def parse_xml(file_path: str) -> Optional[ET.ElementTree]:
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        return root
    except Exception as e:
        print(f'read_xml, {e}')
        return None


def find_text(element: ET.Element, key: str):
    try:
        return element.find(key).text
    except Exception as e:
        # print('findText element: {}, key: {}, error: {}'.format(element, key, e))
        return None


def find_float(element: ET.Element, key: str):
    try:
        return float(element.find(key).text)
    except Exception as e:
        # print('findFloat element: {}, key: {}, error: {}'.format(element, key, e))
        return None
