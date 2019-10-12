# -*- coding: utf-8 -*-
import pandas as pd
import dataReference
#path="https://github.com/pipesanta/analis2/blob/master/university_of_antioquia.json?raw=true" ##JSON GRANDE del repositorio de otro grupo.
path="https://github.com/stevenstiven2000/activity-categorization-implementation/blob/master/udea.json?raw=true" ##JSON del repositorio de Stiven
data = pd.read_json(path) #Mapeo en un objeto DataFrame el contenido del archivo


def getDataRef():
  return data