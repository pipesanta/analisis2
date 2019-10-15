# -*- coding: utf-8 -*-
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

import json
import consulta

# Author collaborations
import authorCollaboration



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


# samples
api.add_resource(HelloWorld, '/')
api.add_resource(Multi, '/multi/<int:num>')

# Daniela - Guti
api.add_resource(consultaInstitution, '/institution/<string:nom>')
api.add_resource(consultaInfo, '/institution/information/<string:nom>')

# Authors Collaborations

api.add_resource(AuthorCollaborationsFindAuthor, '/author-collaboration/<string:nom>')



if __name__=='__main__':
    app.run(host='0.0.0.0',port=7172, debug=True)