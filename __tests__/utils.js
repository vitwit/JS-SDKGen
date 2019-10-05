import { toCamelCase, toTitleCase } from "../src/utils";

describe("utils", () => {
  test("it sould  return valid js variable,given any kind of word", () => {
    expect(toCamelCase("YashRathore")).toBe("yashRathore");

    expect(toCamelCase("yash-Rathore")).toBe("yashRathore");

    expect(toCamelCase("Yash-rathore")).toBe("yashRathore");

    expect(toCamelCase("Yash@Rathore")).toBe("yashRathore");

    expect(toCamelCase("Yash Rathore")).toBe("yashRathore");
  })

  test('it should return valid js variable,first letter capital for class name convention', () => {
    expect(toTitleCase("yash-Rathore")).toBe("YashRathore");

    expect(toTitleCase("yash-rathore")).toBe("YashRathore");

    expect(toTitleCase("yash rathore")).toBe("YashRathore");

    expect(toTitleCase("yash@rathore")).toBe("YashRathore");

    expect(toTitleCase("yash/rathore")).toBe("YashRathore");
  })
});
