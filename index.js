const { deterministicPartitionKey } = require("./dpk");

console.log(deterministicPartitionKey());
console.log(deterministicPartitionKey("custom-partition"));
console.log(deterministicPartitionKey({ partitionKey: "custom-partition" }));
console.log(
  deterministicPartitionKey({
    partitionKey: { internalPartition: "custom-partition" },
  })
);
console.log(
  deterministicPartitionKey(
    "pmshjwbrthdaqzhvuqqtcxnorlhzdhwrfzzeiljjkociflyskgvxmkgmvxtvgrgziqotoxmvuvrfhbbesjiqxcsytsfxbwfbpagefuvmguwfoklgmuusvanypugdecqwtfhizdumcdcfljrhlzlevkdqzsyleagpporpyagjbyygmzwjjgwtmqdzxwwufcltvgapsncufnhtjmqbdipcuhkvejpibjthidvcjowjkfyqsjbrnbwlaulqlddlwocxlsbzyzdaghwtdqjdkrgrnzywwmzkbjaqiubaezneoxreewmnylcnuaxzkvcdxyzgtrdyjqbtyaipclbiavzitvxzysnxsipbxgykprmdhkrngjpxrqtcjcievmtyicffbxkupdqregjlqdutmmrifyrlzhqtlmbgqybfholyfivkhrkrbqaoycsirqaierhqopkqhdjhenheutrtmnpjbpnltohsvsrqvvertdomyquosaiqizxoyyofcfmzeygw"
  )
);
