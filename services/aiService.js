// const fetch = require('node-fetch');
const config = require('../config/config');

exports.evaluateRule = async (pdfText, rule) => {
  const prompt = `You are a rule-checking assistant.
            PDF text:
            """${pdfText}"""
            check this rule:
            "${rule}"
            You must output ONLY a valid JSON object.
            Do not include code fences.
            Do not include backticks.
            Do not include comments.
            Only return valid JSON.
            Respond ONLY in JSON:
            {
              "rule": "...",
              "status": "pass/fail",
              "evidence": "...",
              "reasoning": "...",
              "confidence": 0-100
            }
            `;
  try {
    console.log('config.geminiApiKey: ', config.geminiApiKey);

    const body = {
      model: 'gemini-2.5-flash',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };
    const response = await fetch(
      `${config.geminiUrl}?key=${config.geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.geminiApiKey}`,
        },
        body: JSON.stringify(body),
      },
    );
    console.log('gemini response: ', response);
    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

    const answer = await response.json();
    console.log('answer: ', answer?.choices?.[0]?.message);
    const evidence = await JSON.parse(answer?.choices?.[0]?.message?.content);
    console.log('evidence: ', evidence);
    return evidence;
  } catch (error) {
    console.error('AI service error:', error);
    return {
      rule,
      status: 'fail',
      evidence: 'API call failed',
      reasoning: `Failed to evaluate: ${error.message}`,
      confidence: 0,
    };
  }
};
