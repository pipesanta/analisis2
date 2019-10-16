# -*- coding: utf-8 -*-
import pandas as pd
import dataReference
import authorInstitution
import institutionInstitution

data = dataReference.getDataRef() #pd.read_json(path) #Mapeo en un objeto DataFrame el contenido del archivo


authors = []
institutions = []
fields_of_study = []
authors_existence = []
institutions_existence = []


size = data.shape[0]

for i in range(0, size):
    _article = data.loc[i, "title"]
    
    _authors = []
    for j in data.loc[i, "authors"]:
        _new_author = j["first_name"]
        if _new_author is None:
            _new_author = ""
        _new_author += " " + j["last_name"]
        _authors += [_new_author]
        
    _institutions = []
    for j in data.loc[i, "authors"]:
        for k in j["affiliations"]:
            if k["name"] not in _institutions:
                _institutions += [k["name"]]
                
    _fields_of_study = [i["name"] for i in data.loc[i, "fields_of_study"]]
    year = data.loc[i,"date_published"].split("T")[0].split("-")[0]

    for insti in _institutions:
        if insti not in institutions_existence:
            institutions_existence += [insti]
            institutions += [institutionInstitution.Institution(insti, _authors, _fields_of_study, [_article], year, [year])]
        else:
            pos = institutions_existence.index(insti)
            for f in institutions:
              if f.institution == insti:
                f.alternative_trayectory += [year]
                f.update_trayectory(year)

            for author in _authors:
                if author not in institutions[pos].author:
                    institutions[pos].author += [author]

            for field in _fields_of_study:
                if field not in institutions[pos].fields:
                    institutions[pos].fields += [field]

            if _article not in institutions[pos].articles: # Pendiente quitar, los articulos no se repiten
                institutions[pos].articles += [_article]

    for c in _authors:
        if c not in authors_existence:
            authors_existence += [c]
            authors += [authorInstitution.Author(c, _institutions, _fields_of_study, _article)]
        else:
            pos = authors_existence.index(c)

            authors[pos].articles += [_article]

            for field in _fields_of_study:
                if field not in authors[pos].fields:
                    authors[pos].fields += [field]
                if field in authors[pos].alternative_fields.keys():
                    authors[pos].alternative_fields[field] += 1
                else:
                    authors[pos].alternative_fields[field] = 1

           

            for institution in _institutions:
                if institution not in authors[pos].institutions:
                    authors[pos].institutions += [institution]

            if _article not in authors[pos].articles: # Pendiente quitar, los articulos no se repiten.
                authors[pos].articles += _article

    for field in _fields_of_study:
        if (not field == "") and (field not in fields_of_study):
            fields_of_study += [field]

def institution_search(search):
    #search = ""
    found_institutions = []
    if search == "":
        return { "institution": "Busqueda Invalida"}
    for institution in institutions:
        if institution.institution.lower().__contains__(search):
            found_institutions += [institution.institution]

    return {"institution" :  found_institutions}


def institution_info(search):
    for institution in institutions:
        if institution.institution.lower() == (search.lower()):
            insti = institution
            return({"name": insti.institution,
                "authors": insti.author,
                "topics": insti.fields,
                "articles": insti.articles,
                "Trayectory": insti.trayectory})
    else:
        return{"Nombre": "No existe"}


def fields_search(search):
    found_fields = []
    if search == "":
        return({"field" : 'Vacio '})
    search = search.lower()

    for field in fields_of_study:
        if field.lower().__contains__(search):
            found_fields += [field]

    return {"field" : found_fields}


def fields_info(option):
    if option == "":
        return({"institutions": ""})    

    found_institutions = []
    for institution in institutions:
        if option in institution.fields:
            found_institutions += [institution.institution]
    return {"institution" : found_institutions}

def trayectory(insti):
    import operator
    for institution in institutions:
        if institution.institution.lower() == (insti.lower()):
            resultado = sorted(institution.trayectory.items(), key=operator.itemgetter(0))
            resultado = {i[0] : i[1] for i in resultado}
            return(resultado)
    else:
        return{"Nombre": "No existe"}

def alternative_trayectory(insti):
    for institution in institutions:
        if institution.institution.lower() == (insti.lower()):
            return institution.alternative_trayectory

def author_field_search(author):
    author = author.lower()
    for aut in authors:
        if aut.author.lower().__contains__(author):
            return aut.alternative_fields
          


