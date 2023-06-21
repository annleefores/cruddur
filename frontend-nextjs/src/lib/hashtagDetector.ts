export function detectHashtags(text: string): string[] {
    const hashtagRegex = /#[\w-]+/g;
    const hashtags = text.match(hashtagRegex);
    return hashtags || [];
  }