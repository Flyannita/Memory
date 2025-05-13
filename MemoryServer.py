from flask import *
from flask_cors import CORS
from random import *

app = Flask(__name__)
CORS(app)
names = ["Dana.webp", "JDH_TG.webp", "JhonLoshka.png", "laya.webp", "LoMegdyWorld.png", "Oketra.webp", "Raya.webp",
         "Sheron.webp", "Dylan.webp", "Egrassel.webp", "Richard.webp", "Smotryashi.webp", "Sayrissa.webp", "Saha.webp", "Brayana.webp", "RayaPraim.png"]
CardsForLevels = [2, 3, 8, 15]
dictionaryPlayers = dict()


@app.route("/getImg", methods=["GET"])
def getImg():
    NumOFLevels = request.args.get("NumLevel")
    NumOFLevels = int(NumOFLevels)
    NumOFCards = CardsForLevels[NumOFLevels]
    shuffle(names)
    cards = names[0:NumOFCards] + names[0:NumOFCards]
    shuffle(cards)
    return jsonify({"cards": cards})


@app.route("/SavePoints", methods=["POST"])
def SavePoints():
    Data = request.get_json()
    # reguest - запрос с сайта
    User = Data.get("NewName")
    LastUser = Data.get("LastName")
    Point = Data.get("Point")
    Level = Data.get("Level")
    Level = int(Level)
    Point = int(Point)
    if User!=LastUser and LastUser in dictionaryPlayers :
        dictionaryPlayers[User] = dictionaryPlayers[LastUser]
        dictionaryPlayers.pop(LastUser)
    if User in dictionaryPlayers:
        DataUser = dictionaryPlayers[User]
        if Point>DataUser[Level]:
            dictionaryPlayers[User][Level] = Point
            return jsonify({"message": "successful save"})
        else:
            print(Point, User)
            return jsonify({"message": "not save"})
    else:
        print(Point, User)
        dictionaryPlayers[User] = [0, 0, 0, 0]
        dictionaryPlayers[User][Level] = Point
        return jsonify({"message": "successful save"})


@app.route("/GetUserData", methods=["GET"])
def GetUserData():
    User = request.args.get("Name")
    if User not in dictionaryPlayers:
        print(User, "mememe")
        return jsonify({"data": None})
    else:
        print(User)
        return jsonify({"data": dictionaryPlayers[User]})


@app.route("/Liders", methods=["GET"])
def Liders():
    listik = list()
    for i in dictionaryPlayers.keys():
        Points = dictionaryPlayers[i]
        Points = sum(Points)
        listik.append([Points,i])
    listik.sort(reverse=True)
    listik = listik[0:10]
    return jsonify({"liders": listik})



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)