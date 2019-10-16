# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from urllib.parse import unquote

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

import json
import consulta

# Author collaborations
import authorCollaboration

# Journal Characterization
from ControllerJournalCharacterization import ControllerJournalCharacterization


class HelloWorld(Resource):
    def get(self):
        return {'about':'Hello World'}
    
    def post(self):
        some_json = request.get_json()
        return {'you sent': some_json},201

class Multi(Resource):
    def get(self, num):
        return {'result': num*10}

class consultaInstitution(Resource):
    def get(self, nom):
        autores = consulta.institution_search(nom)
        return (autores)

class consultaInfo(Resource):
    def get(self,nom):
        
       
        autores=consulta.institution_info(nom)
        return (autores)

class AuthorCollaborationsFindAuthor(Resource):
    def get(self, nom):
        autores=authorCollaboration.findAuthorsByName(nom)
        return (autores)

class consultaFields(Resource):
    def get(self, nom):
        fields = consulta.fields_search(nom)
        return (fields)

class consultaInfoFields(Resource):
    def get(self,nom):
       
        info = consulta.fields_info(nom)
        return (info)

# Daniela
class consultaTrayectory(Resource):
    def get(self,nom):
       
        info = consulta.trayectory(nom)
        return (info)

class consultaAlternativeTrayectory(Resource):
    def get(self,nom):
       
        info = consulta.alternative_trayectory(nom)
        return (info)

class QueryJournalsApi(Resource):
    def get(self, search_value):
        
        search_value = unquote(search_value)
        s_values = search_value.split('>')
        s_value = s_values[0]
        s_type = s_values[1]

        controller = ControllerJournalCharacterization('https://github.com/stevenstiven2000/activity-categorization-implementation/blob/master/udea.json?raw=true')
        journals = controller.update_journals(s_value, s_type)
        # print(journals)
        return (journals)


# test
api.add_resource(HelloWorld, '/')
api.add_resource(Multi, '/multi/<int:num>')

# Daniela - Guti
api.add_resource(consultaInstitution, '/institution/<string:nom>')
api.add_resource(consultaInfo, '/institution/information/<string:nom>')
api.add_resource(consultaFields, '/fields/<string:nom>')
api.add_resource(consultaInfoFields, '/fields/information/<string:nom>')
api.add_resource(consultaTrayectory , '/institution/trayectory/<string:nom>')
api.add_resource(consultaAlternativeTrayectory , '/institution/alternativetrayectory/<string:nom>')






# Authors Collaborations

api.add_resource(AuthorCollaborationsFindAuthor, '/author-collaboration/<string:nom>')
# api.add_resource(AuthorCollaborationsFindAuthor, '/author-collaboration/fields/<string:nom>')

# Journals Characterization

api.add_resource(QueryJournalsApi, '/journalCharacterisation/<string:search_value>')


if __name__=='__main__':
    app.run(host='0.0.0.0',port=7172, debug=True)
