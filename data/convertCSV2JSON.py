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

def convertToEruptionByYear():
    f=open('testdata.csv', 'r')
    csv_reader = csv.DictReader(f, fieldNames)
    next(csv_reader) #skip the first line of the csv file

    countryCodesFile = open('countryCodes.json').read()
    countryCodes = json.loads(countryCodesFile)

    #dict that will hold the new json data
    erruptionsByYear = {}

    # go through each row in the file and get the relevant data
    for row in csv_reader:
        year = row['Year']
        country = row['Country']

        if year not in erruptionsByYear:
            erruptionsByYear[year] = []
        if country not in erruptionsByYear[year]:
            erruptionsByYear[year].append(countryCodes.get(country))

    with open('erruptionsByYear.json', 'w') as outfile:
        json.dump(erruptionsByYear, outfile)
    f.close()


def convertCountryCodes(filename):
    csv_filename = filename[0]
    f=open(csv_filename, 'r')
    csv_reader = csv.DictReader(f, fieldNamesCountryCodes)
    json_filename = "countryCodes.json"
    jsonf = open(json_filename,'w')
    dataset = {}
    for row in csv_reader:
        country = row["Country"]
        code = row["Code"]

        if country not in dataset:
           dataset[country] = code

    with open(json_filename, 'w') as outfile:
        json.dump(dataset, outfile)
        f.close()
        jsonf.close()

def countriesToCodes(filename):
    countryCodesFile = open(filename[0]).read()
    countryCodes = json.loads(countryCodesFile)

    with open('volcanoesByCountry.json', 'r+') as f:
         countriesAndTheirVolcanoesData = json.load(f)
         updatedCountriesAndTheirVolcanoes = {}

         #create new dicionary with country code instead of countries
         for key, value in countriesAndTheirVolcanoesData.items():
             temp = countriesAndTheirVolcanoesData.get(key)
             newKeyValue = countryCodes.get(key)
             updatedCountriesAndTheirVolcanoes[newKeyValue] = value
             
         #update json
         f.seek(0)
         f.truncate()
         json.dump(updatedCountriesAndTheirVolcanoes, f)

if __name__=="__main__":
    if len(sys.argv) is 1:
        #countriesToCodes(sys.argv[1:])
        #convertCountryCodes(sys.argv[1:])
        convertToEruptionByYear()
    else:
        print("Please give valid input: convertCSV2JSON.py filename")
