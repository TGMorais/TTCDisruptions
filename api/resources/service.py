from flask_restful import reqparse, abort, Api, Resource


class Service(Resource):
    def __init__(self, db):
        self.datalayer = db

    # def get(self, lala=None):
    #     return self.datalayer.getAll()

    def get(self, id=None):
        if id is not None:
            return self.datalayer.get(id)
        else:
            return self.datalayer.getAll()

class ServiceLine(Resource):
    def __init__(self, db):
        self.datalayer = db

    def get(self, name):
        return self.datalayer.getBy("linename", name)

class ServiceStop(Resource):
    def __init__(self, db):
        self.datalayer = db

    def get(self, stopname):
        return self.datalayer.getBy("stopName", stopname)
