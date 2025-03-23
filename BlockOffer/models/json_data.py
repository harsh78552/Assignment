from pymongo import MongoClient


class JsonDatabase:
	def __init__(self):
		self.client = MongoClient('mongodb://localhost:27017/')
		self.db = self.client['JsonData']
		self.collection = self.db['data']

	def insert_data(self, data):
		self.collection.insert_many(data)
		return "message: data inserted successfully..."

	def get_all_records(self):
		get_all_post = self.collection.find()
		if get_all_post:
			data_list = []
			for data in get_all_post:
				data_dict = {"end_year": data.get("end_year"),
				             'intensity': data.get('intensity'),
				             'sector': data.get('sector'),
				             'topic': data.get('topic'),
				             'insight': data.get('insight'),
				             'url': data.get('url'),
				             'region': data.get('region'),
				             'start_year': data.get('start_year'),
				             'impact': data.get('impact'),
				             'added': data.get('added'),
				             'published': data.get('published'),
				             'country': data.get('country'),
				             'relevance': data.get('relevance'),
				             'pestle': data.get('pestle'),
				             'source': data.get('source'),
				             'title': data.get('title'),
				             'likelihood': data.get('likelihood')
				             }
				data_list.append(data_dict)
			return data_list
		else:
			return {'message': 'no any content...'}

	def get_filter_data_end_year(self, end_year=None):
		if end_year:
			query = {"end_year": {"$regex": f"{end_year}", "$options": "i"}}
		else:
			query = {"$or": [{"end_year": {"$exists": False}}, {"end_year": ""}]}
		data_list = list(self.collection.find(query, {
			"_id": 0,
			"end_year": 1, "intensity": 1, "sector": 1, "topic": 1,
			"insight": 1, "url": 1, "region": 1, "start_year": 1,
			"impact": 1, "added": 1, "published": 1, "country": 1,
			"relevance": 1, "pestle": 1, "source": 1, "title": 1, "likelihood": 1
		}))

		return data_list

	def get_filter_data_topic(self, topic=None):
		if topic:
			query = {"topic": {"$regex": f"{topic}", "$options": "i"}}
		else:
			query = {"$or": [{"topic": {"$exists": False}}, {"topic": ""}]}
		data_list = list(self.collection.find(query, {
			"_id": 0,
			"end_year": 1, "intensity": 1, "sector": 1, "topic": 1,
			"insight": 1, "url": 1, "region": 1, "start_year": 1,
			"impact": 1, "added": 1, "published": 1, "country": 1,
			"relevance": 1, "pestle": 1, "source": 1, "title": 1, "likelihood": 1
		}))
		return data_list

	def get_filter_data_sector(self, sector=None):
		if sector:
			query = {"sector": {"$regex": f"{sector}", "$options": "i"}}
		else:
			query = {"$or": [{"sector": {"$exists": False}}, {"sector": ""}]}
		data_list = list(self.collection.find(query, {
			"_id": 0,
			"end_year": 1, "intensity": 1, "sector": 1, "topic": 1,
			"insight": 1, "url": 1, "region": 1, "start_year": 1,
			"impact": 1, "added": 1, "published": 1, "country": 1,
			"relevance": 1, "pestle": 1, "source": 1, "title": 1, "likelihood": 1
		}))
		return data_list

	def get_filter_data_region(self, region=None):
		if region:
			query = {"region": {"$regex": f"{region}", "$options": "i"}}
		else:
			query = {"$or": [{"region": {"$exists": False}}, {"region": ""}]}
		data_list = list(self.collection.find(query, {
			"_id": 0,
			"end_year": 1, "intensity": 1, "sector": 1, "topic": 1,
			"insight": 1, "url": 1, "region": 1, "start_year": 1,
			"impact": 1, "added": 1, "published": 1, "country": 1,
			"relevance": 1, "pestle": 1, "source": 1, "title": 1, "likelihood": 1
		}))

		return data_list

	def get_filter_data_pestle(self, pestle=None):
		if pestle:
			query = {"pestle": {"$regex": f"{pestle}", "$options": "i"}}
		else:
			query = {"$or": [{"pestle": {"$exists": False}}, {"pestle": ""}]}
		data_list = list(self.collection.find(query, {
			"_id": 0,
			"end_year": 1, "intensity": 1, "sector": 1, "topic": 1,
			"insight": 1, "url": 1, "region": 1, "start_year": 1,
			"impact": 1, "added": 1, "published": 1, "country": 1,
			"relevance": 1, "pestle": 1, "source": 1, "title": 1, "likelihood": 1
		}))
		return data_list

	def get_filter_data_source(self, source=None):
		if source:
			query = {'source': {"$regex": f"{source}", "$options": "i"}}
		else:
			query = {"$or": [{"source": {"$exists": False}}, {"source": ""}]}
		data_list = list(self.collection.find(query, {
			"_id": 0,
			"end_year": 1, "intensity": 1, "sector": 1, "topic": 1,
			"insight": 1, "url": 1, "region": 1, "start_year": 1,
			"impact": 1, "added": 1, "published": 1, "country": 1,
			"relevance": 1, "pestle": 1, "source": 1, "title": 1, "likelihood": 1
		}))
		return data_list

	def get_filter_data_country(self, country=None):
		if country:
			query = {"country": {"$regex": f"{country}", "$options": "i"}}
		else:
			query = {"$or": [{"country": {"$exists": False}}, {"country": ""}]}
		data_list = list(self.collection.find(query, {
			"_id": 0,
			"end_year": 1, "intensity": 1, "sector": 1, "topic": 1,
			"insight": 1, "url": 1, "region": 1, "start_year": 1,
			"impact": 1, "added": 1, "published": 1, "country": 1,
			"relevance": 1, "pestle": 1, "source": 1, "title": 1, "likelihood": 1
		}))
		return data_list
