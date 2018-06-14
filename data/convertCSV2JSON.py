import csv
import sys
import json

fieldNames = ("Year","TSU","EQ","Name","Country","Latitude","Longitude","Elevation","Type","Status","TOTAL_DEATHS","VEI")
fieldNamesCountryCodes = {"Country", "Code"}

# https://jaranto.blogspot.nl/2012/12/transform-csv-file-to-json-file-with.html
def convert(filename):
     csv_filename = filename[0]
     f=open(csv_filename, 'r')
     csv_reader = csv.DictReader(f, fieldNames)
     json_filename = "volcanoesByCountry.json"
     jsonf = open(json_filename,'w')
     data = {}
     for row in csv_reader:
         country = row["Country"]
         name = row["Name"]
         type = row["Type"]

         if country not in data:
            data[country] = {}
         if name not in data[country]:
            data[country][name] = type

     with open(json_filename, 'w') as outfile:
         json.dump(data, outfile)
     f.close()
     jsonf.close()

def convertCountryCodes(filename):
    csv_filename = filename[0]
    f=open(csv_filename, 'r')
    csv_reader = csv.DictReader(f, fieldNamesCountryCodes)
    json_filename = "countryCodes.json"
    jsonf = open(json_filename,'w')
    data = {}
    for row in csv_reader:
        country = row["Country"]
        code = row["Code"]

        if code not in data:
           data[code] = country

    with open(json_filename, 'w') as outfile:
        json.dump(data, outfile)
    f.close()
    jsonf.close()

if __name__=="__main__":
    if len(sys.argv) is 2:
        convertCountryCodes(sys.argv[1:])
    else:
        print("Please give valid input: convertCSV2JSON.py filename")
