import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasGoogleEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    hasGoogleKey: !!process.env.GOOGLE_PRIVATE_KEY,
    hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    googleEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'NOT SET',
    sheetId: process.env.GOOGLE_SHEET_ID ?
      `${process.env.GOOGLE_SHEET_ID.substring(0, 20)}...` :
      'NOT SET (empty string)',
    privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
  };

  console.log('🔍 Configuration Check:');
  console.log(JSON.stringify(config, null, 2));

  return NextResponse.json({
    message: 'Configuration status',
    ...config,
    ready: config.hasGoogleEmail && config.hasGoogleKey && config.hasSheetId,
  });
}
