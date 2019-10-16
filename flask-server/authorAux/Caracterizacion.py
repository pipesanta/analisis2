# -- coding: utf-8 --

import pandas as pd
import csv
import numpy as np
import json


path = 'C:\\Users\\alejo\\Documents\\UdeA\\Análisis II\\analisis2\\flask-server\\authorAux\\university_of_antioquia.json'


# Load the first sheet of the JSON file into a data frame
data = pd.read_json(path)

# Diccionario de paises
URL = "C:\\Users\\alejo\\Documents\\UdeA\\Análisis II\\analisis2\\flask-server\\authorAux\\paises.csv"
paises = pd.read_csv(URL)
paises = paises.set_index('Code').T.to_dict('list')
paises['XXX'] = 'No_Disponible'


class Articulo():

    def __init__(self, nombre, añoPublicacion, numeroCitas, id):
        self.__nombre = str(nombre)
        self.__añoPublicacion = int(añoPublicacion)
        self.__numeroCitas = int(numeroCitas)
        self.__id = str(id)

    def get_nombre(self):
        return self.__nombre

    def set_nombre(self, x):
        self.__nombre = x

    def get_añoPublicacion(self):
        return self.__añoPublicacion

    def set_añoPublicacion(self, x):
        self.__añoPublicacion = x

    def get_numeroCitas(self):
        return self.__numeroCitas

    def set_numeroCitas(self, x):
        self.__numeroCitas = x

    def get_id(self):
        return self.__id

    def set_id(self, x):
        self.__id = x

    def articuloToDiccionario(self):
        artDiccionario = {'Nombre': self.__nombre, 'AnioPublicacion': self.__añoPublicacion,
                          'NumeroCitas': self.__numeroCitas, 'ID': self.__id}
        return artDiccionario


class Autor():

    def __init__(self, nombre, articulos, area, institucion,nacionalidad):
        self.__nombre = str(nombre)
        self.__articulos = articulos
        self.__area = str(area)
        self.__institucion = str(institucion)
        self.__nacionalidad=str(nacionalidad)

    def get_nombre(self):
        return str(self.__nombre)

    def set_nombre(self, x):
        self.__nombre = x

    def get_articulos(self):
        return self.__articulos

    def set_articulos(self, x):
        self.__articulos = x

    def get_area(self):
        return str(self.__area)

    def set_area(self, x):
        self.__area = x

    def get_institucion(self):
        return str(self.__institucion)

    def set_institucion(self, x):
        self.__institucion = x

    def autorToDiccionario(self):
        autorDiccionario = {'Nombre': str(self.__nombre), 'numArticulos': int(len(self.__articulos)), 'nacionalidad':str(self.__nacionalidad),'Articulos': self.__articulos, 'Area': str(
            self.__area), 'Institucion': str(self.__institucion)}
        return autorDiccionario


def consultar(nombre):
    coincidencias = []
    for index, value in zip(data.index, data['authors']):

        for autor in value:
            aux = str(autor['first_name'])+" "+str(autor['last_name'])
            pais = 'XXX'
            universidad = ""
            if (nombre.lower() in aux.lower()):
                for uni in autor['affiliations']:
                    universidad = uni['name']
                    try:
                        grid = uni['grid']
                        for a in grid['addresses']:
                            pais = a['country_code']
                            break
                        break
                    except:
                        continue
                    break
                retorno = [int(index), aux, universidad,
                           paises[pais][0], data.loc[int(index), 'title'],
                           data.loc[int(index), 'year_published'], data.loc[int(
                               index), 'referenced_by_count'],
                           data.loc[int(index), 'record_lens_id']]
                coincidencias.append(retorno)
                break
    return coincidencias


def listar(autor):

    resultado = consultar(nombre=autor)
    megaArregloAutores = []
    if (len(resultado) == 0):
        print("Autor no encontrado")
    else:
        print("Coincidencias halladas:")
        nombres = []
        for campo in resultado:
            if(campo[1] not in nombres):
                nombres.append(campo[1])
                listaArticulos = listarArticulos(resultado, campo[1])
                autor = Autor(nombre=campo[1], articulos=listaArticulos,
                              area="No disponible", institucion=campo[2], nacionalidad=campo[3])
                diccionario = autor.autorToDiccionario()
                megaArregloAutores.append(diccionario)

        return megaArregloAutores


def listarArticulos(arreglo, nombre):
    articulosDiccionarios = []

    for art in arreglo:
        if (art[1] == nombre):
            articulo = Articulo(art[4], art[5], art[6], art[7])

            diccionario = articulo.articuloToDiccionario()
            articulosDiccionarios.append(diccionario)
    return articulosDiccionarios
