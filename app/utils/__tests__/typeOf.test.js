import typeOf from "../typeOf";

describe("typeOf", () => {
  it("should properly return types", () => {
    expect(typeOf(0)).toBe("number");
    expect(typeOf(NaN)).toBe("nan");
    expect(typeOf({})).toBe("object");
    expect(typeOf([])).toBe("array");
    expect(typeOf("")).toBe("string");
    expect(typeOf("str")).toBe("string");
    expect(typeOf(new Map())).toBe("map");
    expect(typeOf(new Set())).toBe("set");
    expect(typeOf(/re/gi)).toBe("regexp");
    expect(typeOf(new Date())).toBe("date");
    expect(typeOf(() => {})).toBe("function");
    expect(typeOf(() => {})).toBe("function");
    expect(typeOf(true)).toBe("boolean");
    expect(typeOf(false)).toBe("boolean");
    expect(typeOf(null)).toBe("null");
    expect(typeOf(undefined)).toBe("undefined");
    expect(typeOf()).toBe("undefined");
  });
});
