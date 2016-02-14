from flask_restful import reqparse, abort, Api, Resource


#parsers
parser = reqparse.RequestParser()
parser.add_argument('description', required=True)
parser.add_argument('start', required=True)
parser.add_argument('end', required=True)
parser.add_argument('linename', required=True)

def checkDisruption( found ):
    print "checkDisruption", found
    if not found:
     abort(404, message="Entry not founda".format(id))

#send a unified response format
def apiResponse(data, success, message):
    return {
        "success": success,
        "data": data,
        "message": message
    }

class Disruptions(Resource):

    def __init__(self, gtfs, db):
        self.datalayer = db
        self.gtfs = gtfs

    def get(self, id=None):
        if id is not None:
            checkDisruption( self.datalayer.has(id) )
            return self.datalayer.get(id)
        else:
            return self.datalayer.getAll()

    #todo complete
    def put(self, id=None):
        checkDisruption( self.datalayer.has(id) )
        args = parser.parse_args
        #todo refactor args to be more generic and DRY, as to easly change/add  fields
        success = self.datalayer.set(id, args["description"], args["start"], arg["end"], args["linename"])
        return apiResponse(id, success, "item updated" )

    def post(self):
        args = parser.parse_args()
        rowid = self.datalayer.insert( args["description"], args["start"], args["end"], args["linename"] )
        #todo return new record instead
        return apiResponse({ "id": rowid }, rowid > 0, "item inserted")

    def delete(self, id=None):
        checkDisruption( self.datalayer.has(id) )
        return apiResponse( id, self.datalayer.delete( id ), "item deleted" )
