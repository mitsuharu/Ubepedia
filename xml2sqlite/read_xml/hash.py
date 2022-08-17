import hashlib


def convert_to_hash(text: str) -> str:
    return hashlib.sha256(text.encode('utf-8')).hexdigest()
