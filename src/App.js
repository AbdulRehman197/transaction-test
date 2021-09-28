import { openDB } from "idb";
import "./App.css";

function App() {
  let db = null;
  async function initializeDB(name, version) {
    const db = await openDB(name, version, {
      upgrade(db) {
        db.createObjectStore("keyval");
      },
    });
    return db;
  }
  async function openDb() {
    db = await initializeDB("test", 1);
    console.log("open db");
  }
  async function tab1Click() {
    const tx = db.transaction("keyval", "readwrite");
    console.log("tab1 start saving: ", new Date().toLocaleString());
    for (let index = 0; index <= 100000; index++) {
      await tx.store.put(index, index);
      console.log("tab1");
    }
    console.log("tab1 End saving: ", new Date().toLocaleString());
    db.close();
  }
  async function tab2Click() {
    const tx = db.transaction("keyval", "readwrite");
    console.log("tab2 start saving: ", new Date().toLocaleString());
    for (let index = 1000000; index <= 2000000; index++) {
      await tx.store.put(index, index);
      console.log("tab1");
    }
    console.log("tab2 End saving: ", new Date().toLocaleString());
    db.close();
  }
  return (
    <div className="App">
      <button onClick={openDb}>Open DB</button>
      <br />
      <button onClick={tab1Click}>tab1</button>
      <button onClick={tab2Click}>tab2</button>
    </div>
  );
}

export default App;
