
class connect {

//get data
    async get(key, collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(key)
        console.log(result)
        if (!result[0]) {
            var error = {
                error: "error : key not found key : ",
                key: key,
                collectionName: collectionName
            }
            return error
        }
        return result
    }


    //updateuser
    async update(conditions, update, collectionName, options) {
        const Collection = require('../models/' + collectionName)
        var result = await Collection.find(conditions)
        // Collection.update(conditions, update);
        if (!result[0]) {
            var error = {
                error: "error : key not found key : ",
                update: conditions,
                collectionName: collectionName
            }
            return error
        }
        else {
            var resultupdate = Collection.findOneAndUpdate(conditions, update, { upsert: true, new: true })
            return resultupdate
        }
    }

    
    //checkexist data(ture/flase)
    async checkexist(key,collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(key)
        console.log(result)
        if(result[0]){ return true } //เจอ
        else { return false }  // ไม่เจอ    
    }

    //delete data 
    async delete(key,collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(key)
        if (!result[0]) {
            var error = {
                error: "error : key not found key : ",
                key: key,
                collectionName: collectionName
            }
            return error
        } else {
            var result = await Collection.remove(key)
            console.log(result)
            return result
        }
    }
    

}
module.exports = connect