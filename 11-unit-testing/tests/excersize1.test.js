const { fizzBuzz } = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    expect(() => {
      fizzBuzz(null);
    }).toThrow();
    expect(() => {
      fizzBuzz("a");
    }).toThrow();
  });
  it("should return FizzBuzz if input is devisible by 3 and 5", () => {
    const result = fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if input is devisible by 3", () => {
    const result = fizzBuzz(9);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if input is devisible by 5", () => {
    const result = fizzBuzz(20);
    expect(result).toBe("Buzz");
  });

  it("should return input if it is not devisible by 3 and 5", () => {
    const result = fizzBuzz(1);
    expect(result).toBe(1);
  });
});
