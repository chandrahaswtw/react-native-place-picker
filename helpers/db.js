import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("places.db");

export const init = () => {
    const prom = new Promise((res,rej)=>{
        db.transaction((tx)=>{
            tx.executeSql("CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURI TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)",
             [], 
             (_, e)=>{res(e)}, 
             (_, err)=>{rej(err)})
        })
    })

    return prom;
}

export const storePlaces = (title, imageURI, address, lat, lang) => {
    const prom = new Promise((res,rej)=>{
        db.transaction((tx)=>{
            tx.executeSql("INSERT INTO places ( title, imageURI, address, lat, lng)   values (?,?,?,?,?)",
             [title, imageURI, address, lat, lang], 
             (_, e)=>{res(e)}, 
             (_, err)=>{rej(err)})
        })
    })

    return prom;
}

export const extractPlaces = () => {
    const prom = new Promise((res,rej)=>{
        db.transaction((tx)=>{
            tx.executeSql("SELECT * FROM places",
             [], 
             (_, e)=>{res(e)}, 
             (_, err)=>{rej(err)})
        })
    })

    return prom;
}