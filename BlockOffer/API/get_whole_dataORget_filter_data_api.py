from flask import request
from BlockOffer.models.json_data import JsonDatabase
from flask_smorest import Blueprint
from flask.views import MethodView

blp = Blueprint("Get Whole\\Filter Data", __name__, description="Get whole\\filter data from database...")


@blp.route('/whole-or-filter-data')
class WholeOrFilterData(MethodView):
	def __init__(self):
		self.db = JsonDatabase()

	def get(self):
		json_data = request.args.to_dict()
		if not json_data:
			records = self.db.get_all_records()
			if records:
				return records, 200
			return {"message": "No records available"}, 404
		else:
			if next(iter(json_data)) == 'country':
				return self.db.get_filter_data_country(json_data['country'])
			elif next(iter(json_data)) == 'topic':
				return self.db.get_filter_data_topic(json_data['topic'])
			elif next(iter(json_data)) == 'sector':
				return self.db.get_filter_data_sector(json_data['sector'])
			elif next(iter(json_data)) == 'region':
				return self.db.get_filter_data_region(json_data['region'])
			elif next(iter(json_data)) == 'pestle':
				return self.db.get_filter_data_pestle(json_data['pestle'])
			elif next(iter(json_data)) == 'end_year':
				return self.db.get_filter_data_end_year(json_data['end_year'])
			elif next(iter(json_data)) == 'source':
				return self.db.get_filter_data_source(json_data['source'])
			else:
				return {'error': 'invalid filter key...'}, 404
