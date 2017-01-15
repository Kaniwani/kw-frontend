const makeSchema = (subject) => ({
  no: `${subject}s`,
  one: subject,
  many: `${subject}s`,
});

const makeGetText = (schema) => (descriptor) => `${schema[descriptor]}`;

function pluralize(subject = '', amount = 1, schema) {
  const thisSchema = schema || makeSchema(subject);
  const count = Math.abs(parseInt(amount, 10));
  const getText = makeGetText(thisSchema);

  switch (true) {
    case (count === 0):
      return getText('no');
    case (count === 1):
      return getText('one');
    case (count > 1):
      return getText('many');
    default:
      return subject;
  }
}

export default pluralize;
