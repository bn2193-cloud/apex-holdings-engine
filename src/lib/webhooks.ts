export async function dispatchLead(webhookUrl: string, payload: any) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return { success: true };
  } catch (error) {
    console.error('Lead dispatch failed:', error);
    return { success: false, error };
  }
}
