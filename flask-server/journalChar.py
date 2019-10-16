############################################
# caracterización de autores
############################################

from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import json
from urllib.parse import unquote


from ControllerJournalCharacterization import ControllerJournalCharacterization

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

api = Api(app)

class QueryJournalsApi(Resource):
    def get(self, search_value):
        
        search_value=unquote(search_value)
        s_values = search_value.split('>')
        s_value = s_values[0]
        s_type = s_values[1]

        controller = ControllerJournalCharacterization('https://github.com/stevenstiven2000/activity-categorization-implementation/blob/master/udea.json?raw=true')
        journals = controller.update_journals(s_value, s_type)
        
        return (journals)

api.add_resource(QueryJournalsApi, '/authorsCharacterisation/<string:search_value>')

if __name__ == '__main__':
    app.run(debug=True)