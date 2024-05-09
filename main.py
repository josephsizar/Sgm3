from flask import Flask,render_template,request,redirect,url_for,jsonify,Response
from flask_cors import CORS
import os
from io import TextIOWrapper
import csv
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__,template_folder="templates")
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///sample.db"



app.static_folder= "static"
db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/secretary")
def secretary():
    
    x = bool(inspector())
    users=[]
    if x:
        users = User.query.all()
    return render_template("index.html",users=users,is_migrated=x)
 

@app.route("/users_all")
def users_all():
    users = User.query.all()
    return render_template("index.html",is_migrated=is_instance_exist,users=users)

@app.route("/user/delete")
def deleteUser():
    id = request.args.get("id")
    print(id)
    user = User.query.get(int(id))
    if not user:
        data ={
                "message":"bad"
                }
        return jsonify(data)

    db.session.delete(user)
    db.session.commit()

    data ={
            "message":"ok"
            }
    return jsonify(data)

@app.route("/users_csv")
def users_csv():
    users = User.query.all()
    csv_data = "Grade,Prenom,Nom,Mle\n"
    for user in users:
        csv_data += f"{user.grade},{user.prenom},{user.nom},{user.matricule}\n"

    headers ={
            "Content-Disposition":"attachment; filename=users.csv",
            "Content-Type":"text/csv"
            }

    return Response(
            csv_data,
            status=200,
            headers=headers
            )




@app.route("/envmission")
def envomission():
    
    ids = request.args.get("ids")
    ids_num = []
    if "-" in ids:
        ids_num = [int(idi) for idi in ids.split('-')]
        users = User.query.filter(User.id.in_(ids_num)).all()
        return render_template("envmission.html",users=users)

    else:
        id = int(ids)
        users =[]
        user = User.query.get(id)
        users.append(user)
        return render_template("envmission.html",users=users)





@app.route("/users",methods=["POST"])
def create_user():
    grade = request.form['grade']
    prenom = request.form['prenom']
    nom = request.form['nom']
    matricule = request.form['matricule']

    if nom and prenom and nom and matricule :
        print('Grade : ',grade)
        print('Prenom : ',prenom)
        print("Nom : ",nom)
        print("Matricule : ",matricule)

    user = User(grade=grade,prenom=prenom,nom=nom,matricule=matricule)

    db.session.add(user)
    db.session.commit()


    return redirect(url_for("users_all"))

@app.route('/addcsvusers',methods=["POST"])
def addcsvusers():
    if "csv_users" not in request.files:
        return "no file uploaded",400
    csv_users = request.files["csv_users"]

    if csv_users.filename == "":
        return "No File Selected",400

    if csv_users:
        users = csv.reader(TextIOWrapper(csv_users))
        next(users)
        for u in users:
            db.session.add(User(grade=u[0],prenom=u[1],nom=u[2],matricule=u[3]))

        db.session.commit()
        return "<h1> File Uploaded Successfull and Data Inserted into database",200

@app.route("/migrate")
def migrater():
    db.create_all()

    return render_template("index.html",migrate=True)

@app.route("/gazelle")
def gazelle():

    return render_template("gazelle.html")

@app.route("/time_calc")
def time_calc():
    return render_template("gazelle/calc.html")

@app.route("/gazgestion")
def gazgestion():
    return render_template("gazelle/times.html")

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    grade = db.Column(db.String(80),nullable=False)
    prenom = db.Column(db.String(80),nullable=False)
    nom = db.Column(db.String(80),nullable=False)
    matricule = db.Column(db.String(80),nullable=False)
    vehiclem = db.Column(db.String(80),nullable=True,default="")
    vehiclet = db.Column(db.String(80),nullable=True,default="")
    vehicleg = db.Column(db.String(80),nullable=True,default="")

    def __str__(self):
        return "<User %r>" %self.name

class Helico(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    celluleh = db.Column(db.String(80),nullable=False)
    motorh = db.Column(db.String(80),nullable=False)
    ref = db.Column(db.String(80),nullable=False)
    months = db.relationship('MonthRecord',backref="month_record",lazy=True) 

class MonthRecord(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    month = db.Column(db.Integer,nullable=False)
    celluleh =db.Column(db.String(80),nullable=False)
    motorh = db.Column(db.String(80),nullable=False)
    totalcarb = db.Column(db.Integer,nullable=False)
    helico_id = db.Column(db.Integer,db.ForeignKey('helico.id'),nullable=False)
    days = db.relationship('DayRecord',backref='day_record',lazy=True)


class DayRecord(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    duration = db.Column(db.String(80),nullable=False)   
    day = db.Column(db.Integer,nullable=False)
    carb = db.Column(db.Integer,nullable=True)
    ref  = db.Column(db.String(80),nullable=False)
    position = db.Column(db.String(80),nullable=False)
    month_id = db.Column(db.Integer,db.ForeignKey('month_record.id'),nullable=True)

class YearRecord(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    motorh =db.Column(db.String(80),nullable=False)
    celluleh = db.Column(db.String(80),nullable=False)
    year = db.Column(db.Integer,nullable=False)
    helico = db.Column(db.Integer,nullable=False)


def is_instance_exist():
    instance_folder = "instance"

    return os.path.exists(instance_folder)

def check_tables_exists():
    metadata = db.metadata
    return metadata.tables

def inspector():
    return db.inspect(db.engine).get_table_names()


if __name__ == "__main__":
    app.run(debug=True)
