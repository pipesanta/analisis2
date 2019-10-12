# -*- coding: utf-8 -*-
import pandas as pd
import dataReference

data = dataReference.getDataRef() #pd.read_json(path) #Mapeo en un objeto DataFrame el contenido del archivo


class Author:

    def __init__(self, author, institutions, fields, article):
        self.author = author
        self.institutions = institutions
        self.fields = fields
        self.articles = [article]



class Institution:

    def __init__(self, institution, author, fields, article):
        self.institution = institution
        self.author = author
        self.fields = fields
        self.articles = article

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

    for insti in _institutions:
        if insti not in institutions_existence:
            institutions_existence += [insti]
            institutions += [Institution(insti, _authors, _fields_of_study, [_article])]
        else:
            pos = institutions_existence.index(insti)

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
            authors += [Author(c, _institutions, _fields_of_study, _article)]
        else:
            pos = authors_existence.index(c)

            authors[pos].articles += [_article]

            for field in _fields_of_study:
                if field not in authors[pos].fields:
                    authors[pos].fields += [field]

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

    """if not found_institutions:
        return {"institution" :"No se ha encontrado ninguna institución"}"""

    return {"institution" :  found_institutions}


def institution_info(search):
    for institution in institutions:
        if institution.institution.lower() == (search.lower()):
            insti = institution
            return({"Nombre: ": insti.institution,
                "Autores: ": insti.author,
                "Temas: ": insti.fields,
                "Articulos: ": insti.articles})
    else:
        return{"Nombre": "No existe"}


"""def field_search():
    search = ""
    found_fields = []
    while search == "":
        search = input('Introduzca Tema a buscar: ')
    search = search.lower()
    for field in fields_of_study:
        if field.lower().__contains__(search):
            found_fields += [field]

    while not found_fields:
        search = input('No se ha encontrado ningún tema \n \
         si desea salir ingrese 0 \n \
         Introduzca tema a Buscar: ')
        if search == "0":
            sys.exit()
        for field in fields_of_study:
            if field.lower().__contains__(search):
                found_fields += [field]

    for pos in range(len(found_fields)):
        print(pos, "- ", found_fields[pos])

    option = ""
    while option == "":
        print()
        option = input("Ingrese el número de un Tema para buscar Instituciones relevantes: ")
        try:
            option = int(option)
            if int(option) < 0 or int(option) >= len(found_fields):
                option = ""
                print("Opción Invalida")
        except:
            print("Opción Invalida")
            option = ""

    option = found_fields[option]
    found_institutions = []
    for institution in institutions:
        if option in institution.fields:
            found_institutions += [institution]

    print()
    print("Instituciones con relación al Tema: ")
    for institution in found_institutions:
        print(institution.institution)
    if len(found_institutions) == 0:
        print("No hay instituciones relacionadas con el tema ")"""




