import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

// Path to your service account key file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KEYFILEPATH = path.join(__dirname, 'family-tree-466216-5fa6a6f7e7e5.json');
const SPREADSHEET_ID = '1_4ehjHFEK8IQEVo0JnyCYgEmbzNRl-Ez9aUpncANlRM';
const SHEET_NAME = 'family-tree';

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Update a node (row) in the sheet
app.post('/api/update-node', async (req, res) => {
  try {
    const { rowIndex, nodeData } = req.body;
    // Ensure tags is an array of strings
    if (typeof nodeData.tags === 'string') {
      nodeData.tags = nodeData.tags.split(',').map(tag => tag.trim());
    }
    if (!Array.isArray(nodeData.tags)) {
      nodeData.tags = [];
    }
    // Stringify for Google Sheets
    nodeData.tags = JSON.stringify(nodeData.tags);
    console.log('[API] Update Node request:', { rowIndex, nodeData });
    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowIndex}:Y${rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: { values: [Object.values(nodeData)] },
    });
    console.log('[API] Node updated successfully:', { rowIndex });
    res.json({ success: true });
  } catch (error) {
    console.error('[API] Update Node error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a new node (row) to the sheet
app.post('/api/add-node', async (req, res) => {
  try {
    const { nodeData } = req.body;
    // Ensure tags is an array of strings
    if (typeof nodeData.tags === 'string') {
      nodeData.tags = nodeData.tags.split(',').map(tag => tag.trim());
    }
    if (!Array.isArray(nodeData.tags)) {
      nodeData.tags = [];
    }
    // Stringify for Google Sheets
    nodeData.tags = JSON.stringify(nodeData.tags);
    console.log('[API] Add Node request:', { nodeData });
    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [Object.values(nodeData)] },
    });
    console.log('[API] Node added successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('[API] Add Node error:', error);
    res.status(500).json({ error: error.message });
  }
});

const getSheetIdByName = async (sheetName) => {
  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
  const response = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  });

  const sheet = response.data.sheets.find(s => s.properties.title === sheetName);
  return sheet ? sheet.properties.sheetId : null;
};


// Delete a node (row) from the sheet
app.post('/api/delete-node', async (req, res) => {
  try {
    const { rowIndex } = req.body;
        const sheetId = await getSheetIdByName(SHEET_NAME);

    if (sheetId === null) {
      throw new Error(`Sheet with name "${SHEET_NAME}" not found.`);
    }
    console.log("[API] DELETE from Google Sheets:", {
      sheetId,
      startIndex: rowIndex - 1,
      endIndex: rowIndex
    });

    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId, // Usually 0 for the first sheet, you may need to adjust
                dimension: 'ROWS',
                startIndex: rowIndex - 1, // 0-based index
                endIndex: rowIndex,
              },
            },
          },
        ],
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.error('[API] Delete Node error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Family Tree API server running on port 3001');
});
