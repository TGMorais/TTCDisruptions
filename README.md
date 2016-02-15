### TTCDisruptions

##### Two parts:

<hr/>

### */api* - (Python)
<br/>
stack:

- Python 2.7
- sqlitedb (persistance)
- Flask + [Flask Restful](http://flask-restful-cn.readthedocs.org/en/0.3.4/)

commands:
- `sudo pip install  --ignore-installed -r requirements.txt`
- `python api/app.py`

*note*: if pip install throws package install errors, please try to install those packages individually trough `(sudo?) pip install xxx`

 <hr/>

### */client* - (JS):

(api must be running)
<br/>
stack:
- Webpack + Babel (ES6&7)
- ReactJS with [Mobservables](https://mweststrate.github.io/mobservable/)

commands:

- `sudo npm install`
- `npm run start` (dev)
- `npm run dist` (prod static build (in */dist*))
