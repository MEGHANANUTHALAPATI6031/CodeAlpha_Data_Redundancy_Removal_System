from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Start with NO previous records
records = []


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/add", methods=["POST"])
def add_data():

    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    new_data = data.get("data", "").strip()

    # Check empty fields
    if not name or not email or not new_data:
        return jsonify({
            "success": False,
            "message": "Please fill in all fields."
        })

    # Check for duplicate email or data
    for record in records:

        if record["email"].lower() == email.lower():
            return jsonify({
                "success": False,
                "message": "Duplicate email detected! Record was not added."
            })

        if record["data"].lower() == new_data.lower():
            return jsonify({
                "success": False,
                "message": "Duplicate data detected! Record was not added."
            })

    # Create new record
    new_record = {
        "id": len(records) + 1,
        "name": name,
        "email": email,
        "data": new_data
    }

    records.insert(0, new_record)

    return jsonify({
        "success": True,
        "message": "Unique data verified and stored successfully!",
        "record": new_record
    })


if __name__ == "__main__":
    app.run(debug=True)