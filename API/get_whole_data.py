from flask import request, jsonify
from json_data import JsonDatabase
from flask_smorest import Blueprint
from flask.views import MethodView

blp = Blueprint("get whole data", __name__, description="get whole data from database....")


@blp.route('/get-whole-data')
class GetWholeData(MethodView):
	def get(self):
		db = JsonDatabase()
		return db.get_all_records()
