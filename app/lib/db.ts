import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface MyDB extends DBSchema {
  contacts: {
    key: string
    value: {
      id: string
      name: string
      phone: string
      timestamp: number
    }
  }
  recordings: {
    key: string
    value: {
      id: string
      blob: Blob
      type: string
      timestamp: number
      name: string
    }
  }
}

let dbPromise: Promise<IDBPDatabase<MyDB>>

export const initDB = () => {
  dbPromise = openDB<MyDB>('secureHerDB', 1, {
    upgrade(db) {
      db.createObjectStore('contacts', { keyPath: 'id' })
      db.createObjectStore('recordings', { keyPath: 'id' })
    },
  })
  return dbPromise
}

export const getDB = () => {
  if (!dbPromise) {
    return initDB()
  }
  return dbPromise
}

