from flask import request
from json_data import JsonDatabase
from flask_smorest import Blueprint
from flask.views import MethodView

blp = Blueprint("Json Data", __name__, description="Send json-data in database...")


@blp.route("/push-json-data-mongodb")
class PushJsonData(MethodView):
	def __init__(self):
		self.json_data = JsonDatabase()

	def put(self):
		data = request.get_json()
		if not data:
			return {'message': "no data provided.."}, 400
		if not isinstance(data, list):
			return {"message": "Invalid data format, list expected.."}, 400
		try:
			self.json_data.insert_data(data)
			return {"message": "data added successfully.."}, 200
		except TypeError as error:
			return {"error": f"{str(error)}"}, 500
		except Exception as error:
			return {"error": f"{str(error)}"}, 500
