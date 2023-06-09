import { getDatabase, ref, set, get, child } from "firebase/database";

export const writeData = (path, information) => {
  const db = getDatabase();
  set(ref(db, path), information);
};
export const readData = (path, call_back, is_data_not_found = () => {}) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        call_back(snapshot.val());
      } else {
        is_data_not_found(path);
      }
    })
    .catch((error) => {
      console.error(path, error);
    });
};
