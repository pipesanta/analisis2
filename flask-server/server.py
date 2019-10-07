# -*- coding: utf-8 -*-
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

import json
import consulta



class HelloWorld(Resource):
    def get(self):
        return {'about':'Hello World'}
    
    def post(self):
        some_json = request.get_json()
        return {'you sent': some_json},201

class Multi(Resource):
    def get(self, num):
        return {'result': num*10}

class consultaApi(Resource):
    def get(self,nom):
        
       
        autores=consulta.consultar(nombre=nom)
        print(autores)        
        return json.dumps(autores)

api.add_resource(consultaApi, '/<string:nom>')

api.add_resource(HelloWorld, '/')
api.add_resource(Multi, '/multi/<int:num>')


if __name__=='__main__':
    app.run(host='127.0.0.1',port=7172, debug=True)