import sqlite3
import uuid


#todo sanitize inputs (sql inj, etc)
_tablename = "disruptions"
_createCmd = 'CREATE TABLE IF NOT EXISTS {tn} (id INTEGER PRIMARY KEY, description TEXT, LineName TEXT, start TEXT, end TEXT)'.format(tn=_tablename)


_insertTpl = "INSERT INTO %s  (description, start, end, LineName) values(?,?,?,?)"  % (_tablename)
_deleteTpl = "DELETE FROM %s where id=?"  % (_tablename)
_updateTpl = "UPDATE %s SET description=?, start=?, end=?, linename=? WHERE id=?"  % (_tablename)

_getTpl = "SELECT * from %s"  % (_tablename)
_findTpl = "SELECT * from  %s where id=?"  % (_tablename)
_querytpl = "SELECT * from %s where {field} like ?" % (_tablename)
_hasTpl = "SELECT count(id) from %s where id=?" % (_tablename)

#row formatter for prettier return
def dict_factory(cursor, row):
    d = {}
    for idx,col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

#dry helper
def runQuery(conn, sql, values=None, row_count=False, row_factory = dict_factory, row_id = False):
    print "\r\n -- runQuery:", sql, values

    conn.row_factory = row_factory
    with conn:
        c = conn.cursor()
        if values is not None:
            c.execute(sql, values)
        else:
            c.execute(sql)
        conn.commit()
        all = c.fetchall()

    #todo refactor this asap (return c or pass a obj dic?)
    if row_id is True:
        return c.lastrowid
    if row_count is True:
        return c.rowcount
    else:
        return all

class DB(object):

    def __init__(self, path):
        #TODO, pass conn into DB from each resource instead of allowing same connection to be shared across threads
        self.conn = sqlite3.connect(path,  check_same_thread=False)
        runQuery(self.conn, _createCmd)

    def has(self, id):
        if id is None:
            return False
        else:
            return runQuery(self.conn, _hasTpl, (id,), False, None)[0][0]

    def getAll(self):
        return runQuery(self.conn, _getTpl)

    def get(self,id):
        return runQuery(self.conn, _findTpl, (id,))[0]

    def getBy(self, field, value):
        sql = _querytpl.format(field=field)
        return runQuery(self.conn, sql, ("%"+value+"%",))

    def set(self, id, descr, start, end, linename):
        sql =  _updateTpl.format(id=id, descr=descr, start=start, end=end, linename=linename)
        res = runQuery(self.conn, _updateTpl, (descr, start, end, linename, id), True)
        return res > 0

    def insert(self, descr, start, end, linename):
        return runQuery(self.conn, _insertTpl, (descr, start, end, linename), False, None, True)

    def delete(self, id):
        return runQuery(self.conn, _deleteTpl, (id,), True) > 0
