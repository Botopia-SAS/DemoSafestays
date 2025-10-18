import { NextResponse } from "next/server";
import { readSheetData, sheetDataToObjects } from "@/lib/googleSheets";

export interface PropertyFromSheet {
  code: string;
  available: string;
  location: string;
  date: string;
  month: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  utilities: string;
  area: number;
  street: string;
  brochure: string;
  video: string;
  whatsappMessage: string;
}

export async function GET() {
  try {
    console.log("🔍 Starting Google Sheets fetch...");

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    console.log(
      "📋 Sheet ID:",
      spreadsheetId ? `${spreadsheetId.substring(0, 10)}...` : "NOT SET"
    );

    if (!spreadsheetId || spreadsheetId === "") {
      console.error("❌ Google Sheet ID not configured in .env file");
      return NextResponse.json(
        {
          error:
            "Google Sheet ID not configured. Please add GOOGLE_SHEET_ID to your .env file",
        },
        { status: 500 }
      );
    }

    console.log("📡 Attempting to read from Google Sheets...");

    // Read data from Google Sheets - use "Hoja 1" as the sheet name
    const rawData = await readSheetData({
      spreadsheetId,
      sheetName: "Hoja 1",
    });

    console.log("✅ Data received from Google Sheets");
    console.log("📊 Total rows:", rawData.length);

    if (!rawData || rawData.length === 0) {
      console.warn("⚠️  No data found in sheet");
      return NextResponse.json({ properties: [], count: 0 });
    }

    // Log first few rows for debugging
    console.log("📝 First row (headers):", rawData[0]);
    if (rawData.length > 1) {
      console.log("📝 Second row (sample data):", rawData[1]);
    }

    // Filter rows where column B (index 1) is "Yes" or "yes"
    // Column B is the second column (index 1) which indicates availability
    // Skip the header row (index 0)
    const filteredRows = rawData.filter((row, index) => {
      if (index === 0) return false; // Skip header
      const availableColumn = row[1]; // Column B (segunda columna - índice 1)
      const isAvailable =
        availableColumn &&
        availableColumn.toString().trim().toLowerCase() === "yes";
      if (isAvailable) {
        console.log(
          `✓ Row ${index + 1} is available:`,
          row[0],
          "-",
          availableColumn
        );
      } else if (row[0]) {
        console.log(
          `✗ Row ${index + 1} skipped (not available):`,
          row[0],
          "-",
          `"${availableColumn}"`
        );
      }
      return isAvailable;
    });

    console.log(
      `🔎 Filtered ${filteredRows.length} available properties from ${
        rawData.length - 1
      } total rows`
    );

    // Get headers from first row
    const headers = rawData[0];
    console.log("📋 Column headers:", headers);

    // Convert to objects
    const properties = filteredRows.map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    console.log("✅ Successfully processed properties:", properties.length);

    return NextResponse.json({
      properties,
      count: properties.length,
      debug: {
        totalRows: rawData.length,
        headers: headers,
        filteredCount: filteredRows.length,
      },
    });
  } catch (error) {
    console.error("Error fetching properties from Google Sheets:");
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      return NextResponse.json(
        {
          error: "Failed to fetch properties",
          details: error.message,
          errorType: error.name,
          hint: "Check server console for detailed error logs",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to fetch properties",
          details: String(error),
          errorType: "Unknown",
          hint: "Check server console for detailed error logs",
        },
        { status: 500 }
      );
    }
  }
}
