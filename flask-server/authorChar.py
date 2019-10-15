############################################
# caracterización de autores
############################################

from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import json
from urllib.parse import unquote


from authorAux import Caracterizacion

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

class consultaApi(Resource):
    def get(self,nom):
        
        autor=unquote(nom)
        autores=Caracterizacion.listar(autor=autor)
        
        return json.dumps(autores)

api.add_resource(consultaApi, '/authorsCharacterisation/<string:nom>')

if __name__ == '__main__':
    app.run(debug=True)