const mock = {
  plainFileString:
    "3201903010000014200096206760174753****3153153453JOHN DOE123   BAR DO JOÃO       ",
  plainFileWithInvalidStore: `3201903010000014200096206760174753****3153153453JOHN DOE123   BAR DO JOÃO       
      5201903010000013200556418150633123****7687145607MARIA JOSEFINALOJA DO Ó - M`,
  parsedFileString: [
    {
      type: 3,
      date: "20190301",
      value: 142,
      ownerDocument: "09620676017",
      bankCard: "4753****3153",
      timestamp: "153453",
      storeName: "JOHN DOE123",
      ownerName: "BAR DO JOÃO",
    },
  ],
  parsedFileStringWithInvalidStore: [
    {
      type: 3,
      date: "20190301",
      value: 142,
      ownerDocument: "09620676017",
      bankCard: "4753****3153",
      timestamp: "153453",
      storeName: "JOHN DOE123",
      ownerName: "BAR DO JOÃO",
    },
    "Invalid CNAB line at index 1",
  ],
  parsedFileWithMultipleStore: [
    {
      type: 3,
      date: "20190301",
      value: 142,
      ownerDocument: "09620676017",
      bankCard: "4753****3153",
      timestamp: "153453",
      storeName: "JOHN DOE123",
      ownerName: "BAR DO JOÃO",
    },
    {
      type: 3,
      date: "20190301",
      value: 142,
      ownerDocument: "09620676017",
      bankCard: "4753****3153",
      timestamp: "153453",
      storeName: "JOHN DOE123",
      ownerName: "BAR DO JOÃO",
    },
  ],
  mappedCnabListByStore: [
    {
      ownerDocument: "09620676017",
      storeName: "JOHN DOE123",
      ownerName: "BAR DO JOÃO",
      currentBalance: -284,
      transactions: [
        {
          value: 142,
          type: 3,
          date: "20190301",
          bankCard: "4753****3153",
          timestamp: "153453",
        },
        {
          value: 142,
          type: 3,
          date: "20190301",
          bankCard: "4753****3153",
          timestamp: "153453",
        },
      ],
    },
  ],
};

export default mock;
