// default, can pass other schemas to pluralize as needed
const makeSchema = (subject) => ({
  single: subject,
  plural: `${subject}s`,
});

const makeGetText = (schema) => (descriptor) => `${schema[descriptor]}`;

export function pluralize(subject = '', amount = 1, schema) {
  const thisSchema = schema || makeSchema(subject);
  const getText = makeGetText(thisSchema);
  const count = Math.abs(parseInt(amount, 10));
  const singular = count === 1;

  return getText(singular ? 'single' : 'plural');
}

export default pluralize;
