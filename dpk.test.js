const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  let encryptedValue = "my encrypted value";
  let cryptoImplementation;

  beforeEach(() => {
    cryptoImplementation = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValueOnce(encryptedValue),
    };
    jest
      .spyOn(crypto, "createHash")
      .mockImplementationOnce(() => cryptoImplementation);

    jest.spyOn(cryptoImplementation, "update");
    jest.spyOn(cryptoImplementation, "digest");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
    expect(crypto.createHash).not.toHaveBeenCalled();
  });

  it("Returns the literal encrypted when given input is a string.", () => {
    const inputString = "custom-partition";
    const trivialKey = deterministicPartitionKey(inputString);
    expect(trivialKey).toBe(encryptedValue);

    expect(crypto.createHash).toHaveBeenCalledTimes(1);
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
    expect(cryptoImplementation.update).toHaveBeenCalledWith(
      JSON.stringify(inputString)
    );
    expect(cryptoImplementation.digest).toHaveBeenCalledWith("hex");
  });

  it("Returns the value from the property partitionKey when given input is an object with that property set as string.", () => {
    const inputString = "custom-partition";
    const trivialKey = deterministicPartitionKey({
      partitionKey: inputString,
    });
    expect(trivialKey).toBe(inputString);

    expect(crypto.createHash).not.toHaveBeenCalled();
  });

  it("Returns the value from the property partitionKey when given input is an object with that property set as object.", () => {
    const inputObject = {
      partitionKey: { internalPartition: "custom-partition" },
    };
    const trivialKey = deterministicPartitionKey(inputObject);
    expect(trivialKey).toBe(JSON.stringify(inputObject.partitionKey));

    expect(crypto.createHash).not.toHaveBeenCalled();
  });

  it("Returns the literal encrypted when given input is a string greater than 256.", () => {
    const inputString =
      "pmshjwbrthdaqzhvuqqtcxnorlhzdhwrfzzeiljjkociflyskgvxmkgmvxtvgrgziqotoxmvuvrfhbbesjiqxcsytsfxbwfbpagefuvmguwfoklgmuusvanypugdecqwtfhizdumcdcfljrhlzlevkdqzsyleagpporpyagjbyygmzwjjgwtmqdzxwwufcltvgapsncufnhtjmqbdipcuhkvejpibjthidvcjowjkfyqsjbrnbwlaulqlddlwocxlsbzyzdaghwtdqjdkrgrnzywwmzkbjaqiubaezneoxreewmnylcnuaxzkvcdxyzgtrdyjqbtyaipclbiavzitvxzysnxsipbxgykprmdhkrngjpxrqtcjcievmtyicffbxkupdqregjlqdutmmrifyrlzhqtlmbgqybfholyfivkhrkrbqaoycsirqaierhqopkqhdjhenheutrtmnpjbpnltohsvsrqvvertdomyquosaiqizxoyyofcfmzeygw";
    const trivialKey = deterministicPartitionKey(inputString);
    expect(trivialKey).toBe(encryptedValue);

    expect(crypto.createHash).toHaveBeenCalledTimes(1);
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
    expect(cryptoImplementation.update).toHaveBeenCalledWith(
      JSON.stringify(inputString)
    );
    expect(cryptoImplementation.digest).toHaveBeenCalledWith("hex");
  });
});
