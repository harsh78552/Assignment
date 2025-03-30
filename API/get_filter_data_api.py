from flask import request, jsonify
from json_data import JsonDatabase
from flask_smorest import Blueprint
from flask.views import MethodView

blp = Blueprint("Get Whole\\Filter Data", __name__, description="Get whole\\filter data from database...")

@blp.route('/filter-data')
class WholeOrFilterData(MethodView):
    def __init__(self):
        self.db = JsonDatabase()

    def get(self):
        json_data = request.args.to_dict()
        print(json_data)

        # Return all records if no filters are provided
        if not json_data:
            records = self.db.get_all_records()
            return (records, 200) if records else ({"message": "No records available"}, 404)

        # Define mapping of query params to database functions
        filter_methods = {
            "country": self.db.get_filter_data_country,
            "topic": self.db.get_filter_data_topic,
            "sector": self.db.get_filter_data_sector,
            "region": self.db.get_filter_data_region,
            "pestle": self.db.get_filter_data_pestle,
            "end_year": self.db.get_filter_data_end_year,
            "source": self.db.get_filter_data_source,
        }

        # Process all filters dynamically
        filtered_results = []
        for key, value in json_data.items():
            if key in filter_methods:
                filtered_results.append(filter_methods[key](value))
            else:
                return jsonify({'error': f'Invalid filter key: {key}'}), 400  # 400 Bad Request

        # If multiple filters, return the intersection of results
        if len(filtered_results) > 1:
            final_result = list(set.intersection(*map(set, filtered_results)))
        else:
            final_result = filtered_results[0]

        return final_result, 200 if final_result else 404
