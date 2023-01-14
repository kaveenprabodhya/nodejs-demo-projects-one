const db = require("../db");
const mail = require("../mail");
const {
  absolute,
  greet,
  getCurrencies,
  getProduct,
  registerUser,
  applyDiscount,
  notifyCustomer,
} = require("../lib");

/* test("absolute - if number is positive, should return positive", () => {
    const result = absolute(10);
    expect(result).toBe(10);
  }); */

// grouping tests
/* describe("absolute", () => {
  it("if number is positive, should return a positive", () => {
    const result = absolute(10);
    expect(result).toBe(10);
  });

  it("if number is negative, should return a positive", () => {
    const result = absolute(-10);
    expect(result).toBe(10);
  });

  it("should return zero if number is zero", () => {
    const result = absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = greet("Kaveen");
    // expect(result).toBe("Welcome Kaveen");
    // expect(result).toMatch(/Kaveen/);
    expect(result).toContain("Welcome Kaveen!");
  });
}); */

/* describe("getCurrencies", () => {
  it("should return the supported currencies", () => {
    const result = getCurrencies("Kaveen");

    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    expect(result[0]).toBe("USD");
    expect(result.length).toBe(3);

    expect(result).toContain("USD");

    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
}); */

/* describe("getProduct", () => {
  it("should return the product with given id", () => {
    const result = getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });

    expect(result).toMatchObject({ id: 1, price: 10 });

    expect(result).toHaveProperty("id", "1");
  });
}); */

/* describe("registeruser", () => {
  it("should throw if user is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        registerUser(null);
      }).toThrow();
    });
  });

  it("should return a object if a valid username is passed", () => {
    const result = registerUser("kaveen");
    expect(result).toMatchObject({ username: "kaveen" });
    expect(result.id).toBeGreaterThan(0);
  });
}); */

/* describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("reading Fake data...");
      return { customerId: 1, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
}); */

/* describe("notifyCustomer", () => {
  it("should send and email to the customer", () => {
    db.getCustomerSync = function (customerId) {
      console.log("sending Fake mail...");
      return { email: "a" };
    };

    let mailSent = false;
    mail.send = function (email, message) {
      mailSent = true;
    };

    notifyCustomer({ customerId: 1 });
    expect(mailSent).toBe(true);
  });
}); */

describe("notifyCustomer", () => {
  it("should send and email to the customer", () => {
    /* const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolveValue(1);
    mockFunction.mockRejectedValue(new Error("error"));
    // const result = mockFunction();
    const result = await mockFunction(); */

    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    notifyCustomer({ customerId: 1 });

    // expect(mail.send).toHaveBeenCalled();
    expect(mail.send).toHaveBeenCalledWith(
      "a",
      "Your order was placed successfully."
    );

    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
