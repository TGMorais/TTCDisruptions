import os

from flask import Flask
from flask_restful import Api

from resources.disruptions import Disruptions
from resources.service import Service, ServiceLine, ServiceStop
from resources.gtfs import SubwayLines, Stations

from data.db import DB
from data.gtfsreader import gtfsReader


package_dir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(package_dir, 'db/api-db.db')
gtfs_path =  os.path.join(package_dir, 'db/gtfs-db')

app = Flask(__name__)
api = Api(app)
#api.decorators=[cors.crossdomain(origin='*')]


db = DB(db_path)
gtfs = gtfsReader(gtfs_path)


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

#expose gtfs data to clients
api.add_resource(Stations, "/stations/<int:lineid>", resource_class_args=[gtfs])
api.add_resource(SubwayLines, "/subway-lines", "/subway-lines/<int:id>", resource_class_args=[gtfs])

#CRUD api on disruptions ( behind a login ? )
api.add_resource(Disruptions,'/disruptions', '/disruptions/<string:id>', resource_class_args=[gtfs, db])

#client api to view current disruptions, service state ( public facing ? )
api.add_resource(Service,'/service', '/service/<string:id>', resource_class_args=[db])
api.add_resource(ServiceLine,'/service/line/<string:name>', resource_class_args=[db])
api.add_resource(ServiceStop,'/service/stop/<string:name>', resource_class_args=[db])


if __name__ == '__main__':
    app.run(debug=True)
