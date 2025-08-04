import random
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
from datetime import timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://spacefy_15p3_user:kc1y2ciKnJgOEuTuP4VWPasQp23Q9KwU@dpg-d1i1lv8dl3ps73b2kr00-a.oregon-postgres.render.com/spacefy_15p3"
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh" + str(random.randint(1, 1000000000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV" + str(random.randint(1, 1000000000000))

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route("/test", methods=['POST'])
def health_check():
    return jsonify({"message":"The endpoints are working well!"})



if __name__ = "__main__":
    app.run(debug=True)