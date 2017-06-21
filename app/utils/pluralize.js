const makeSchema = subject => ({
  single: subject,
  plural: `${subject}s`,
});

const makeGetText = schema => descriptor => `${schema[descriptor]}`;

export function pluralize(subject = '', amount = 1, schema) {
  const thisSchema = schema || makeSchema(subject);
  const count = Math.abs(parseInt(amount, 10));
  const getText = makeGetText(thisSchema);

  if (count === 1) return getText('single');
  return getText('plural');
}

export default pluralize;
