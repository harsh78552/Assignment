from flask import Flask
from flask_smorest import Api
from BlockOffer.API.Post_data_api import blp as PostDataBlueprint
from BlockOffer.API.get_whole_dataORget_filter_data_api import blp as GetFilterDataBluePrint

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['API_TITLE'] = 'blog web_page api'
app.config['API_VERSION'] = 'v1'
app.config['OPENAPI_VERSION'] = "3.0.3"
app.config['OPENAPI_URL_PREFIX'] = "/"
app.config['OPENAPI_SWAGGER_UI_PATH'] = "/swagger-ui"
app.config['OPENAPI_SWAGGER_UI_URL'] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config['JWT_SECRET_KEY'] = "gutwulh34cfn2u734809(*^^^*&*(E*#)*_#)&"


api = Api(app)
api.register_blueprint(PostDataBlueprint)
api.register_blueprint(GetFilterDataBluePrint)

if __name__ == '__main__':
	app.run(debug=True)
