const fs = require('fs');
const path = require('path');

// Función para guardar los datos en un archivo JSON
async function saveDataToJson(data) {
    try {
        const dataFolderPath = path.join(__dirname, '..', 'data');
        if (!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath);
        }
        const filePath = path.join(dataFolderPath, 'data.json');
        let existingData = [];
        if (fs.existsSync(filePath)) {
            existingData = JSON.parse(fs.readFileSync(filePath));
        }
        existingData.push(data);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        console.log('Data saved to JSON file successfully');
    } catch (error) {
        console.error('Error saving data to JSON file:', error);
        throw new Error('Error saving data to JSON file');
    }
}

async function receiveData(req, res, next) {
    try {
        const data = req.body;
        console.log('Data received:', data);
        
        // Guarda los datos recibidos en un archivo JSON
        await saveDataToJson(data);

        res.status(200).json({
            message: 'Data received and saved successfully',
            receivedData: data
        });
    } catch (error) {
        console.error('Error receiving data:', error);
        res.status(500).json({
            message: 'Error receiving data'
        });
    }
}

// Función para cargar los datos desde el archivo JSON
async function loadDataFromJson() {
    const filePath = path.join(__dirname, '..', 'data', 'data.json');
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));  // Crea un archivo vacío si no existe
    }
    return JSON.parse(fs.readFileSync(filePath));
}

async function sendDataintoJson(req, res) {
    const jsonData = await loadDataFromJson();
    res.json(jsonData);
    console.log("data enviada", jsonData);
};

module.exports = {
    receiveData,
    sendDataintoJson
};
