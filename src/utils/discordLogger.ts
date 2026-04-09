export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number; // integer representation of hex color
  fields?: DiscordEmbedField[];
  timestamp?: string;
}

export interface DiscordPayload {
  content?: string;
  embeds?: DiscordEmbed[];
}

export async function sendDiscordLog(payload: DiscordPayload): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('Discord Webhook URL not found. Logging disabled.');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to send Discord log:', response.statusText);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Network error sending Discord log:', error);
    return false;
  }
}
