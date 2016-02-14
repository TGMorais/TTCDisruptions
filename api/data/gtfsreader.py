import pygtfs


#accoring to gtfs db
# main_line_ids = [44054, 44117, 44129, 44171 ]


#dummystations for now
stations = {
    44054: [ { "id": 1, "name": "Station 1 - Stop A" },  { "id": 12, "name": "Station 1 - Stop B" }, { "id": 13, "name": "Station 1 - Stop C" },  { "id": 14, "name": "Station 1 - Stop D" } ],
    44117: [ { "id": 2, "name": "Station 2 - Stop A" },  { "id": 22, "name": "Station 2 - Stop B" }, { "id": 23, "name": "Station 2 - Stop C" },  { "id": 24, "name": "Station 2 - Stop D" } ],
    44129: [ { "id": 3, "name": "Station 3 - Stop A" },  { "id": 32, "name": "Station 3 - Stop B" }, { "id": 33, "name": "Station 3 - Stop C" },  { "id": 34, "name": "Station 3 - Stop D" } ],
    44171: [ { "id": 4, "name": "Station 4 - Stop A" },  { "id": 42, "name": "Station 4 - Stop B" }, { "id": 43, "name": "Station 4 - Stop C" },  { "id": 44, "name": "Station 4 - Stop D" } ],
}
class gtfsReader():
    def __init__(self, path):
        self._sched = pygtfs.Schedule(path)
        print "gtfs inited"

    def getLines(self):
        mainLines = {}
        for r in self._sched.routes:
            if r.route_type is 1:
                mainLines[r.id] = r.route_long_name
        return mainLines

    def getStopByLine(self, id):
        stops = {}
        #todo figure out relation between stops and station/line id in gtfs data...
        #... x(
        # line = self._sched.routes_by_id(id)
        if stations.has_key(id):
            return stations[id]
        else:
            return []
