// src/services/ChartService.js
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase";

class ChartService {
    async getPdfs() {
        const listRef = ref(storage, import.meta.env.VITE_REACT_APP_STORAGE_BUCKET);
        const res = await listAll(listRef);

        const pdfsList = await Promise.all(res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
                name: itemRef.name,
                url,
            };
        }));

        return pdfsList;
    }

    async uploadPdf(file) {
        const storageRef = ref(storage, `${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(db, 'charts'), {
            name: file.name,
            url: downloadURL,
        });

        return { id: docRef.id, name: file.name, url: downloadURL };
    }
}

export default new ChartService();
