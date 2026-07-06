export const SYSTEM_PROMPT = `
Extract structured metadata from the provided Markdown article.

Instructions:
- Follow the schema exactly and treat each field description as the source of truth.
- Use only information explicitly present in the article.
- Do not invent, infer, or assume missing information.
- Return valid structured output matching the schema exactly.
`;