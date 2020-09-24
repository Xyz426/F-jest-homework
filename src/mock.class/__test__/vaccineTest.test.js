import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";
import Covid19Vaccine from "../covid19Vaccine";

// jest.mock("../recipient", () => {
//   return jest.fn().mockImplementation(() => ({
//     hasAntibodies: false,
//     acceptInjection: jest.fn(),
//   }));
// });

// TODO feedback: 我们应该定义一个需要mock的方法的变量，这样后面再test()里面就都可以使用这个变量了
const mockAcceptInjection = jest.fn();
const mockGetHasAntibodies = jest.fn(() => false);

jest.mock("../recipient", () => {
  return jest.fn().mockImplementation(() => {
    return {
      acceptInjection: mockAcceptInjection,
      // TODO 我们应该去mock这个class的function,而不是去mock这个class的field,所以我们应该去mock getHasAntibodies()这个方法
      getHasAntibodies: mockGetHasAntibodies,
    };
  });
});

beforeEach(() => {
  // clear mock here
  Recipient.mockClear();
});

describe("inject", () => {
  test("should recipient accept injection with vaccine", () => {
    // TODO 14: add test here
    const vaccineTest = new VaccineTest();
    vaccineTest.inject();
    // expect(vaccineTest.recipient.acceptInjection).toHaveBeenCalledWith(
    //   expect.any(Covid19Vaccine)
    // );

    expect(mockAcceptInjection).toHaveBeenCalledWith(
      expect.any(Covid19Vaccine)
    );
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    // TODO 15: add test here
    const vaccineTest = new VaccineTest();
    // vaccineTest.recipient.getHasAntibodies = jest.fn().mockReturnValue(true);
    // TODO feedback: 这里我们就可以使用之前定义好的变量了
    mockGetHasAntibodies.mockImplementation(() => true);
    expect(vaccineTest.test()).toBe("Vaccine Test Success");
  });

  test("should get Failed if recipient has no antibodies", () => {
    // TODO 16: add test here
    const vaccineTest = new VaccineTest();
    // vaccineTest.recipient.getHasAntibodies = jest.fn().mockReturnValue(false);
    // TODO feedback: 这里我们就可以使用之前定义好的变量了
    mockGetHasAntibodies.mockImplementation(() => false);
    expect(vaccineTest.test()).toBe("Vaccine Test Failed");
  });
});
