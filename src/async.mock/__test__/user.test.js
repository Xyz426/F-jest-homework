import axios from "axios";
import { register } from "../user";
import { verifyUsername } from "../verify";

jest.mock("../verify");
jest.mock("axios");

describe("register", () => {
  test("should post user when validated", () => {
    // TODO 19: add test here
    axios.post = jest.fn().mockResolvedValue({ data: "good" });
    return expect(register("", "")).resolves.toBe("good");
  });

  test("should reject with Error when username is invalid", () => {
    // TODO 20: add test here
    verifyUsername.mockReturnValue(false);
    const result = register("", "");
    return expect(result).rejects.toThrow("wrong username or password");
  });
});
