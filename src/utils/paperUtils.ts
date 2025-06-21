
import { PaperData } from "@/types/paper";

export const getWordCount = (text: string): number => {
  if (!text || typeof text !== 'string') return 0;
  // Remove HTML tags for accurate word count
  const plainText = text.replace(/<[^>]*>/g, '');
  const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
};

export const getWordCountProgress = (text: string, maxWords: number | null): number => {
  if (!maxWords) return 0;
  const wordCount = getWordCount(text);
  return Math.min((wordCount / maxWords) * 100, 100);
};

export const generatePaperHTML = (paperData: PaperData): string => {
  const subtitlesHTML = paperData.subtitles?.map(subtitle => 
    `<div class="subtitle" style="font-size: ${subtitle.fontSize}pt; font-family: '${subtitle.fontFamily}', serif;">${subtitle.text}</div>`
  ).join('') || '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${paperData.title}</title>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 2;
            margin: 1in;
            color: #000;
            max-width: 8.5in;
          }
          .title {
            font-size: ${paperData.titleStyle?.fontSize || 18}pt;
            font-family: '${paperData.titleStyle?.fontFamily || 'Times New Roman'}', serif;
            font-weight: bold;
            text-align: center;
            margin-bottom: 12pt;
            text-transform: uppercase;
          }
          .subtitle {
            text-align: center;
            margin-bottom: 6pt;
            line-height: 1.5;
          }
          .section-title {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 24pt;
            margin-bottom: 12pt;
            text-transform: uppercase;
          }
          .two-column {
            display: flex;
            gap: 24pt;
            margin-bottom: 24pt;
          }
          .keywords-section {
            flex: 1;
          }
          .abstract-section {
            flex: 1;
          }
          .keywords {
            font-style: italic;
            margin-bottom: 12pt;
          }
          .content {
            text-align: justify;
            text-indent: 0.5in;
            margin-bottom: 12pt;
          }
          .abstract {
            text-align: justify;
            margin-bottom: 12pt;
          }
          .references {
            margin-top: 24pt;
          }
          p {
            margin-bottom: 12pt;
          }
        </style>
      </head>
      <body>
        <div class="title">${paperData.title}</div>
        ${subtitlesHTML}
        
        <div style="margin-bottom: 24pt;"></div>
        
        <div class="two-column">
          ${paperData.keywords && paperData.keywords.length > 0 ? `
            <div class="keywords-section">
              <div class="section-title">Keywords</div>
              <div class="keywords">${paperData.keywords.join(', ')}</div>
            </div>
          ` : '<div class="keywords-section"></div>'}
          
          ${paperData.abstract ? `
            <div class="abstract-section">
              <div class="section-title">Abstract</div>
              <div class="abstract">${paperData.abstract}</div>
            </div>
          ` : '<div class="abstract-section"></div>'}
        </div>
        
        ${paperData.introduction ? `
          <div class="section-title">Introduction</div>
          <div class="content">${paperData.introduction}</div>
        ` : ''}
        
        ${paperData.content ? `
          <div class="section-title">Main Content</div>
          <div class="content">${paperData.content}</div>
        ` : ''}
        
        ${paperData.conclusion ? `
          <div class="section-title">Conclusion</div>
          <div class="content">${paperData.conclusion}</div>
        ` : ''}
        
        ${paperData.references ? `
          <div class="section-title">References</div>
          <div class="references">${paperData.references}</div>
        ` : ''}
      </body>
    </html>
  `;
};
