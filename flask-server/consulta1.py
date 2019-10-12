# -*- coding: utf-8 -*-
import pandas as pd
import csv
import numpy as np
import matplotlib.pyplot as plt



path = "/home/danielamg/Desktop/university_of_antioquia.json"

# Load the first sheet of the JSON file into a data frame
data = pd.read_json(path)

URL = "https://raw.githubusercontent.com/cosmolejo/dataRepo/master/paises.csv?token=ADUMIDG62JONVZ7NUFO3HG25NBDXU"

#Diccionario de paises
paises = pd.read_csv (URL)
paises=paises.set_index('Code').T.to_dict('list')
paises['XXX']='No_Disponible'


def consultar(nombre):
  coincidencias=[]
  for index,value in zip(data.index,data['authors']):
    

    for autor in value:
        
      aux =u' '.join((autor['first_name'],autor['last_name'])).encode('utf-8').strip()
            
      if (nombre.lower() in aux.decode().lower()):
        retorno = [str(index),aux]
        coincidencias.append(retorno)
        break
  return coincidencias