# -*- coding: utf-8 -*-

import dataReference

data =  dataReference.getDataRef()

articlesLength = len(data)
# print("EL total de articulos son : " + str(len(data)))

class Article:
  def __init__(self, isnns, title, year, publicationType, language, author, colaborators, fieldsOfStudy):
    self.isnns = isnns
    self.title = title
    self.year = year
    self.publicationType = publicationType
    self.language = language
    self.author = author
    self.colaborators = colaborators
    self.fieldsOfStudy = fieldsOfStudy
    
  def printInfo(self):
    print("-----------------------------------------------")
    print("Autor principal: ")
    self.author.printInfo()
    print("")
    print("Colaboró con: ")
    for colaborator in self.colaborators:
      colaborator.printInfo()
    print("")
    print("Trabajaron en: ")
    print("("+self.isnns + ") "+ self.title + " "+ "("+self.publicationType+")")
    print("Del año: "+ str(self.year) + "  Idioma: "+str(self.language))

  def parseToJson(self):
    collaboratorAsJson = []
    for author in self.colaborators:
      collaboratorAsJson.append(author.parseToJson())
    return {
      "isnns": self.isnns or "",
      "title": self.title or "",
      "year": str(self.year or 0),
      "publicationType": self.publicationType or "",
      "language": self.language or "",
      "author": self.author.parseToJson(),
      "collaborators": collaboratorAsJson,
      "fieldsOfStudy": self.fieldsOfStudy
    }


class Author:
  def __init__(self, name, surname, country):
    
    self.name = name
    self.surname = surname
    self.country = country
    
  def printInfo(self):
    countryText=''
    if self.country != None:
      countryText= " Pais: " +self.country 
    
    print(self.name +" "+ self.surname +  countryText)
  
  def parseToJson(self):
    return {
      "name": self.name or "",
      "surname": self.surname or "",
      "country": self.country or ""
    }
    
def buildArticle(index):  
  isnns = data["record_lens_id"][index] or ""
  publicationType = data["publication_type"][index] or ""
  title = data["title"][index] or ""
  year = data["year_published"][index] or 0
  language = data["languages"][index] or []
  
  
  mainAuthorRef = data["authors"][index][0]
  colaboratorsRef = data["authors"][index][1:]
  
  mainAuthorName = mainAuthorRef["first_name"] or ""
  mainAuthorSurname = mainAuthorRef["last_name"] or ""

  try:
    mainAuthorCountry = mainAuthorRef["affiliations"][0]["grid"]["addresses"][0]["country_code"]
  except:
    mainAuthorCountry="Desconocido"
  
  mainAuthor = Author( mainAuthorName, mainAuthorSurname, mainAuthorCountry)
  colaborators = []
  for colaborator in colaboratorsRef:
    colaboratorName= colaborator["first_name"] or ""
    colaboratorSurname= colaborator["last_name"] or ""
    authorColaborator=Author(colaboratorName, colaboratorSurname, None)
    colaborators.append(authorColaborator)
  
  fieldsOfStudy = []
  for item in data["fields_of_study"][index]:
    fieldsOfStudy.append(item["name"])
  
  article = Article(isnns, title, year, publicationType, language, mainAuthor, colaborators, fieldsOfStudy )
  return article
  
  
  
def findAuthorsByName(text):
  results = []
  jsonResult = []
  for index in range(0, articlesLength):
    authorsArray = data["authors"][index]
    
    mainAuthor = authorsArray[0]
    colaborators = authorsArray[1:]
    
    name = mainAuthor["first_name"] or ""
    surname = mainAuthor["last_name"] or ""
    
    isMainAuthor = ( text.lower() in (name + " " + surname).lower() )
    isColaborator = False
    
    for colaborator in colaborators:
      colaboratorName = colaborator["first_name"] or ""
      colaboratorSurname = colaborator["last_name"] or ""
      if( text.lower() in (colaboratorName + " " + colaboratorSurname).lower() ):
        isColaborator = True
        break
        
    
    if not (isMainAuthor or isColaborator ):
      continue
      
    article = buildArticle(index)
    results.append(article)
    
  for result in results:
    # result.printInfo()
    jsonResult.append(result.parseToJson())

  # print(jsonResult)
  return jsonResult

    
  # print("El autor: " + text + " se encuentra en " + str(len(results)) +" resultados" )
    


# authorName = input("¿Qué autor deseas buscar? \n")
# findAuthorsByName(authorName)
  