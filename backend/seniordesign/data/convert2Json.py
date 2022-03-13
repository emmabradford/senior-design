import csv
import json

#soucre for code: https://www.geeksforgeeks.org/convert-csv-to-json-using-python/

def convert2json(csvFile, jsonFile):
    data = {}
    with open(csvFile, encoding='utf-8') as csv_file_handler:
        reader = csv.DictReader(csv_file_handler)

        for rows in reader:
            key = rows['title']
            data[key] = rows

    with open(jsonFile, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

c = './rawBooks.csv'
j = './rawBooks.json'

convert2json(c,j);   