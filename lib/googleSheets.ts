import { google } from "googleapis";

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName?: string;
}

/**
 * Get authenticated Google Sheets client
 */
export function getGoogleSheetsClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error(
      "Google Sheets credentials not configured in environment variables"
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Read data from a Google Sheet
 */
export async function readSheetData(config: GoogleSheetsConfig) {
  try {
    console.log("📖 Reading Google Sheet...");
    console.log(
      "   Spreadsheet ID:",
      config.spreadsheetId?.substring(0, 15) + "..."
    );
    console.log("   Sheet Name:", config.sheetName || "First sheet (default)");

    const sheets = getGoogleSheetsClient();

    // If no sheet name provided, read from the first sheet
    // Otherwise, specify the sheet name
    const range = config.sheetName ? `${config.sheetName}!A:Z` : "A:Z";

    console.log("   Range:", range);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range,
    });

    const values = response.data.values || [];
    console.log(
      "✅ Successfully read",
      values.length,
      "rows from Google Sheet"
    );

    return values;
  } catch (error) {
    console.error("❌ Error reading Google Sheet:");
    if (typeof error === "object" && error !== null) {
      const code = (error as { code?: number | string }).code;
      const message = (error as { message?: string }).message;
      console.error("   Error code:", code);
      console.error("   Error message:", message);
      if (code === 404) {
        console.error(
          "   💡 Hint: The spreadsheet ID might be incorrect or the sheet is not shared with the service account"
        );
      } else if (code === 403) {
        console.error(
          "   💡 Hint: Make sure the sheet is shared with:",
          process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
        );
      }
    } else {
      console.error("   Error:", String(error));
    }
    throw error;
  }
}

/**
 * Convert sheet data to objects with headers as keys
 */
export function sheetDataToObjects<T = Record<string, string>>(
  data: string[][]
): T[] {
  if (data.length === 0) return [];

  const headers = data[0];
  const rows = data.slice(1);

  return rows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });
    return obj as T;
  }) as T[];
}
