
// MARKDOWN
export const markdownStartString = ({ name, operationName }) => `
<details>

<summary>${operationName}</summary>

${operationName}
---
 **Example**

 \`\`\`js
 const  { data, error } = await ${name}.${operationName}({
`;

export const markdownCodeBlockEnd = () => `
})
\`\`\``;

export const appendModalLink = modal => ` [${modal}](###${modal}-modal) `;

export const operationMarkdownEnd = () => `
</details>
`;

export const responseMarkdown = ({ resCode, json }) =>
  `\n> ${resCode}\n\`\`\`json\n${JSON.stringify(json, null, 2)}\n\`\`\`\n`;
