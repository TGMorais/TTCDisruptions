from flask_restful import reqparse, abort, Api, Resource



class SubwayLines(Resource):
    def __init__(self, gtfs):
        self.gtfs = gtfs

    def get(self, id=None):
        return self.gtfs.getLines()


class Stations(Resource):
    def __init__(self, gtfs):
        self.gtfs = gtfs

    def get(self, lineid):
        return self.gtfs.getStopByLine(lineid)
