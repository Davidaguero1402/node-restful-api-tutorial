const fs = require('fs');
const path = require('path');
const { isAsyncFunction } = require('util/types');

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

        // Puedes realizar cualquier procesamiento necesario aquí

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

const jsonData = require('../data/data.json');

async function sendDataintoJson(req,res) {
  res.json(jsonData);
};

module.exports = {
    receiveData, sendDataintoJson
};
