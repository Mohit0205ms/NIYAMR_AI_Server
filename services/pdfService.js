const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const aiService = require('./aiService');

exports.extractText = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = new PDFParse({data: dataBuffer});
  const textResult = await data.getText();
  return textResult?.text?.trim();
};

exports.evaluatePdf = async (file, rules) => {
  const filePath = file.path;
  let extractedText;
  
  try {
    extractedText = await this.extractText(filePath);
    const results = [];
    
    for (const rule of rules) {
      if (!rule?.trim()) continue;
      const evaluation = await aiService.evaluateRule(extractedText, rule.trim());
      results.push(evaluation);
    }
    
    return results;
  } finally {

    try { fs.unlinkSync(filePath); } catch (e) { console.error('Cleanup error:', e); }
  }
};
