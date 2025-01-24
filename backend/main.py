from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm origin'lere izin verir, prod'da bunu daraltmak gerekebilir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gelen veriyi doğrulamak için Pydantic modeli
class Person(BaseModel):
    name: str
    age: int

# Excel dosyasının yolu
file_path = "data.xlsx"

# Excel dosyasına veri kaydetme fonksiyonu
def save_to_excel(name: str, age: int):
    if os.path.exists(file_path):
        df = pd.read_excel(file_path)
    else:
        df = pd.DataFrame(columns=["Name", "Age"])

    new_data = pd.DataFrame({"Name": [name], "Age": [age]})
    df = pd.concat([df, new_data], ignore_index=True)
    df.to_excel(file_path, index=False)

@app.post("/save-to-excel")
async def save_person(person: Person):
    save_to_excel(person.name, person.age)
    return {"message": "Başarıyla kaydedildi"}
