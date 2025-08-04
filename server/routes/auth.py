
#sign up
@app.route('/signup', methods=['POST'])
def SignUp():
    first_name = request.form.get('first_name')
    second_name = request.form.get('second_name')
    email = request.form.get('email')
    password = request.form.get('password')
    if not all([first_name, second_name, email, password]):
        return jsonify({"message": "All fields are required"}), 400
    
    new_user = User(first_name=first_name, second_name=second_name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Success": "User added successfully!"}), 201

#login
@app.route('/login', methods=['POST'])
def Login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):  
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token})
    else:
        return jsonify({"message": "Invalid email or password"}), 401

#google_login
@app.route('/google_login', methods=['POST'])
def google_login():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"msg": "Email is required"}), 400

    # Check if user exists in the database
    user = User.query.filter_by(email=email).first()


    # Generate token
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

# Logout
BLACKLIST = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Successfully logged out"}), 200