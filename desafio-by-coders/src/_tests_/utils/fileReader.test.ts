import { formatCnabDate, mapCnabByStore, processCNAB } from "../../utils";
import data from '../testBed/cnabMock'

describe("File Reader Unit Tests", () => {
  test("Should process CNAB successfully", async () => {
    const file = new Blob([data.plainFileString], {
      type: "text/plain",
    });
    const processedFile = await processCNAB(file);
    expect(processedFile).toStrictEqual(data.parsedFileString);
  });

  test("Should process CNAB and fail, throwing reject with filename as argument", async () => {
    const processedFile = await processCNAB(
      new File([""], "fake-filename")
    ).catch((e) => e);
    expect(processedFile).toEqual("fake-filename");
  });

  test("Should process CNAB successfuly even with a invalid line", async () => {
    const file = new Blob([data.plainFileWithInvalidStore], {
      type: "text/plain",
    });
    const processedFile = await processCNAB(file);
    expect(processedFile).toStrictEqual(data.parsedFileStringWithInvalidStore);
  });

  test("Should map cnab list by Store", async () => {
    const processedFile = await mapCnabByStore(
      data.parsedFileWithMultipleStore
    );
    expect(processedFile).toStrictEqual(data.mappedCnabListByStore);
  });

  test("Should format date and timestamp from cnab to a valid date format", async () => {
    const processedFile = await formatCnabDate(
      data.parsedFileString[0].date,
      data.parsedFileString[0].timestamp
    );
    expect(processedFile).toEqual("01/03/2019 15:34:53");
  });
});
